import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { getBoard } from '@/lib/fan/store';
import quiz from '@/lib/fan/quiz.json';
import relations from '@/lib/fan/relations.json';
let font:Promise<Buffer>|undefined;
export async function GET(req:NextRequest){let name='야구 안 본다던 놈이',line='내일 선발은 알고 있다.',label='5문항으로 들키는 내 야구팬 실체',type='G';const id=req.nextUrl.searchParams.get('map'),t=quiz.types.find(x=>x.id===req.nextUrl.searchParams.get('type'));
 const friendId=req.nextUrl.searchParams.get('friend');
 if(id&&friendId){
  try{
   const b=await getBoard(id),f=b.friends.find(x=>x.id===friendId);if(!f)return new Response('참여자를 찾지 못했어요.',{status:404});
   const left=quiz.types.find(x=>x.id===b.owner.type)!,right=quiz.types.find(x=>x.id===f.type)!;
   const pair=left.id===right.id?(left.id==='G'?['동반 탈덕 실패','둘 다 안 본다면서 서로 중계 중.']:['야구 얘기 무한리필','같은 얘기인데 둘 다 안 질림.']):(relations as Record<string,string[]>)[[left.id,right.id].sort().join('')];
   const fontData=await (font??=readFile(join(process.cwd(),'public/fan/korean.woff')));
   async function art(t:typeof left){const oldIndex:Record<string,number>={A:0,C:1,G:2},old=t.id in oldIndex;const image=await readFile(join(process.cwd(),'public/fan',old?'og-board.png':'og-'+t.id+'.png'));return <div style={{display:'flex',width:340,height:old?289:250,position:'relative',overflow:'hidden'}}><img alt="" src={'data:image/png;base64,'+image.toString('base64')} width={old?1020:340} height={old?680:510} style={{position:'absolute',width:old?1020:340,height:old?680:510,left:old?-oldIndex[t.id]*340:0,top:old?-180:-93}}/></div>}
   const teams:Record<string,string>={SSG:'SSG 랜더스',LG:'LG 트윈스',DOOSAN:'두산 베어스',KIWOOM:'키움 히어로즈',KT:'KT 위즈',HANWHA:'한화 이글스',KIA:'KIA 타이거즈',SAMSUNG:'삼성 라이온즈',LOTTE:'롯데 자이언츠',NC:'NC 다이노스',NONE:'응원팀 고르는 중'};
   const download=req.nextUrl.searchParams.get('download')==='1';
   return new ImageResponse(<div style={{display:'flex',flexDirection:'column',alignItems:'center',width:'100%',height:'100%',background:'#faf7ee',padding:48,fontFamily:'FanKorean',color:'#19281f'}}><div style={{fontSize:26,color:'#23563c'}}>직관메이트 · 우리 둘의 야구 조합</div><div style={{display:'flex',alignItems:'center',gap:28,marginTop:30}}><div style={{display:'flex',width:440,flexDirection:'column',alignItems:'center'}}>{await art(left)}<div style={{fontSize:34,marginTop:12,textAlign:'center',wordBreak:'break-all'}}>{b.owner.name}</div><div style={{fontSize:23,color:'#697064',marginTop:8}}>{teams[b.owner.team]||b.owner.team}</div><div style={{fontSize:24,marginTop:6}}>{left.name}</div></div><div style={{fontSize:44,color:'#23563c'}}>×</div><div style={{display:'flex',width:440,flexDirection:'column',alignItems:'center'}}>{await art(right)}<div style={{fontSize:34,marginTop:12,textAlign:'center',wordBreak:'break-all'}}>{f.name}</div><div style={{fontSize:23,color:'#697064',marginTop:8}}>{teams[f.team]||f.team}</div><div style={{fontSize:24,marginTop:6}}>{right.name}</div></div></div><div style={{fontSize:62,marginTop:40,textAlign:'center'}}>{pair[0]}</div><div style={{fontSize:32,marginTop:18,textAlign:'center'}}>{pair[1]}</div><div style={{fontSize:23,marginTop:'auto',color:'#697064'}}>5문항으로 내 유형 찾기 · jikgwan-mate.vercel.app</div></div>,{width:1200,height:900,fonts:[{name:'FanKorean',data:fontData,weight:700,style:'normal'}],headers:{'Cache-Control':'no-store',...(download?{'Content-Disposition':'attachment; filename="jikgwan-mate-relation.png"'}:{})}});
  }catch{return new Response('관계 카드를 불러오지 못했어요.',{status:503})}
 }
 if(id&&/^[\w-]{16}$/.test(id)){try{const b=await getBoard(id);name=b.owner.name+'의 야구판';line='너 들어오면 우리 조합 나옴 ㅋㅋ';label='5문항 풀고 합류 · 내 결과로 내 지도도 만들기';type=b.owner.type;}catch{}}
 else if(t){name=t.name;line=t.tag;label=t.line;type=t.id;}
 const old:Record<string,number>={A:0,C:1,G:2};const isOld=type in old;const src=isOld?'/fan/og-board.png':'/fan/og-'+type+'.png';const image=await readFile(join(process.cwd(),'public',src));const data='data:image/png;base64,'+image.toString('base64');const fonts=await (font??=readFile(join(process.cwd(),'public/fan/korean.woff')));
 if(t&&(req.nextUrl.searchParams.get('card')==='1'||req.nextUrl.searchParams.get('download')==='1')){
  return new ImageResponse(<div style={{width:'100%',height:'100%',display:'flex',flexDirection:'column',alignItems:'center',background:'#faf7ee',padding:'68px 70px',fontFamily:'FanKorean',color:'#19281f',textAlign:'center'}}>
   <div style={{fontSize:26,color:'#23563c',letterSpacing:3}}>직관메이트 · 팬심 목격 보고서</div>
   <div style={{fontSize:34,marginTop:32}}>내 야구팬 실체 들킴</div>
   <div style={{fontSize:70,lineHeight:1.25,marginTop:22}}>{t.name}</div>
   <div style={{display:'flex',width:600,height:isOld?510:442,position:'relative',overflow:'hidden',marginTop:34,marginBottom:28}}><img alt="" src={data} width={isOld?1800:600} height={isOld?1200:900} style={{position:'absolute',width:isOld?1800:600,height:isOld?1200:900,left:isOld?-old[type]*600:0,top:isOld?-317:-163}}/></div>
   <div style={{fontSize:48,lineHeight:1.4}}>{`“${t.tag}”`}</div>
   <div style={{fontSize:30,lineHeight:1.6,marginTop:22}}>{t.line}</div>
   <div style={{display:'flex',flexDirection:'column',alignItems:'center',marginTop:'auto',borderTop:'2px solid #d9dece',paddingTop:28,width:'100%',gap:12}}><div style={{fontSize:30,color:'#23563c'}}>너는 어떤 야구팬인데? 5문항으로 확인해봐.</div><div style={{fontSize:25,color:'#697064'}}>jikgwan-mate.vercel.app</div></div>
  </div>,{width:1080,height:1350,fonts:[{name:'FanKorean',data:fonts,weight:700,style:'normal'}],headers:{'Cache-Control':'public, max-age=300',...(req.nextUrl.searchParams.get('download')==='1'?{'Content-Disposition':`attachment; filename="jikgwan-mate-${t.id}.png"`}:{})}});
 }
 return new ImageResponse(<div style={{width:'100%',height:'100%',display:'flex',background:'#faf7ee',padding:'50px',fontFamily:'FanKorean',color:'#19281f',alignItems:'center',gap:'30px'}}><div style={{display:'flex',flexDirection:'column',width:660}}><div style={{fontSize:24,color:'#23563c',marginBottom:24}}>직관메이트 · 내 야구팬 실체 들킴</div><div style={{fontSize:58,lineHeight:1.3,wordBreak:'break-all'}}>{name}</div><div style={{fontSize:32,lineHeight:1.5,marginTop:24}}>{line}</div><div style={{fontSize:22,color:'#697064',marginTop:32}}>{label}</div></div><div style={{display:'flex',width:360,height:isOld?306:265,position:'relative',overflow:'hidden'}}>{/* Original illustration stays unchanged; frame excludes all embedded text. */}<img alt="" src={data} width={isOld?1080:360} height={isOld?720:540} style={{position:'absolute',width:isOld?1080:360,height:isOld?720:540,left:isOld?-old[type]*360:0,top:isOld?-190:-98}}/></div></div>,{width:1200,height:630,fonts:[{name:'FanKorean',data:fonts,weight:700,style:'normal'}],headers:{'Cache-Control':'public, max-age=300'}});
}
