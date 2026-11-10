"""Optional local integration check: python3 -m pip install 'fakeredis[lua]'.
Runs real Next route handlers against the actual Redis Lua in a local REST emulator.
No production credentials or data are used. Run npm run build first.
"""
import base64,concurrent.futures,http.client,json,os,re,subprocess,threading,time
from http.server import BaseHTTPRequestHandler,ThreadingHTTPServer
from pathlib import Path
import fakeredis
r=fakeredis.FakeRedis()
def normalize(x):
 if isinstance(x,bytes):return base64.b64encode(x).decode()
 if isinstance(x,list):return [normalize(v) for v in x]
 return x
class Gateway(BaseHTTPRequestHandler):
 def log_message(self,*a):pass
 def do_POST(self):
  cmd=json.loads(self.rfile.read(int(self.headers['Content-Length'])))
  def execute(c):
   try:return {'result':normalize(r.execute_command(*c))}
   except Exception as e:return {'error':str(e)}
  result=[execute(c) for c in cmd] if self.path in ['/pipeline','/multi-exec'] else execute(cmd)
  data=json.dumps(result).encode();self.send_response(200);self.send_header('Content-Type','application/json');self.send_header('Content-Length',str(len(data)));self.end_headers();self.wfile.write(data)
server=ThreadingHTTPServer(('127.0.0.1',38331),Gateway);threading.Thread(target=server.serve_forever,daemon=True).start()
env={**os.environ,'JIKGWAN_KV_REST_API_URL':'http://127.0.0.1:38331','JIKGWAN_KV_REST_API_TOKEN':'local-test-token'}
log=open('/tmp/fan-integration.log','w');proc=subprocess.Popen(['node','node_modules/next/dist/bin/next','start','--hostname','127.0.0.1','--port','33529'],env=env,stdout=log,stderr=log)
def request(method,path,body=None,cookie='',origin='http://127.0.0.1:33529'):
 c=http.client.HTTPConnection('127.0.0.1',33529,timeout=15);headers={'Origin':origin,'Content-Type':'application/json'}
 if cookie:headers['Cookie']=cookie
 c.request(method,path,json.dumps(body) if body is not None else None,headers);response=c.getresponse();raw=response.read();session=(response.getheader('set-cookie') or '').split(';')[0];return response.status,json.loads(raw),session
try:
 for i in range(40):
  try:
   c=http.client.HTTPConnection('127.0.0.1',33529,timeout=1);c.request('GET','/play');response=c.getresponse();response.read();break
  except (ConnectionError,OSError,http.client.HTTPException):time.sleep(.2)
 profile={'name':'방장','team':'SSG','consent':True,'answers':[0,0,0,0,0]}
 status,data,owner=request('POST','/api/fan/boards',profile);assert status==201,(status,data)
 board=data['board'];code=data['recovery'];key=board['id'];path='/api/fan/boards/'+key
 assert board['isOwner'] and not board['friends']
 assert 'memberHash' not in json.dumps(data) and 'recoveryHash' not in json.dumps(data)
 status,public,visitor=request('GET',path);assert status==200 and not public['board']['isOwner']
 assert request('POST',path,{'op':'touch'},visitor)[0]==403
 friend={**profile,'op':'join','name':'친구','team':'LG'}
 status,joined,friendCookie=request('POST',path,friend,visitor);assert status==200,(status,joined)
 friendId=joined['board']['myFriendId'];assert friendId and len(joined['board']['friends'])==1
 status,joined2,_=request('POST',path,friend,friendCookie);assert status==200 and len(joined2['board']['friends'])==1
 status,own2,_=request('POST','/api/fan/boards',{'name':'친구','team':'LG','consent':True,'sourceBoardId':key},friendCookie);assert status==201 and own2['board']['owner']['type']==joined['board']['friends'][0]['type']
 assert request('POST',path,{'op':'delete'},friendCookie)[0]==403
 assert request('POST',path,{'op':'touch'},owner,origin='https://foreign.test')[0]==403
 status,left,_=request('POST',path,{'op':'leave'},friendCookie);assert status==200 and not left['board']['friends']
 status,recovered,newOwner=request('POST',path,{'op':'recover','code':code});assert status==200 and recovered['board']['isOwner']
 assert request('POST',path,{'op':'delete'},owner)[0]==403
 deleted=request('POST',path,{'op':'delete'},newOwner);assert deleted[0]==200,deleted
 assert request('GET',path)[0]==404
 print('PASS: actual Next HTTP → Redis REST → Lua persistence, create/read/join/idempotence, same-result own map, public authority isolation, CSRF, leave, recovery, old-owner revocation, deletion.')
finally:proc.terminate();proc.wait(timeout=5);server.shutdown();log.close()
