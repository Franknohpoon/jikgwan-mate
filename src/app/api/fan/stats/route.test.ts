import {describe,it,expect,vi,afterEach} from 'vitest';
import {NextRequest} from 'next/server';
import {createHash} from 'node:crypto';
const fake=vi.hoisted(()=>({get:vi.fn(),scan:vi.fn(),mget:vi.fn(),set:vi.fn(),limit:vi.fn()}));
vi.mock('@/lib/fan/store',()=>({redis:()=>fake,digest:(v:string)=>createHash('sha256').update(v).digest('hex'),limit:fake.limit}));
import {GET} from './route';
afterEach(()=>{vi.unstubAllEnvs();vi.resetAllMocks()});
describe('private statistics endpoint',()=>{
 it('fails closed when password is not configured',async()=>{vi.stubEnv('FAN_STATS_PASSWORD_HASH','');expect((await GET(new NextRequest('https://example.test/api/fan/stats'))).status).toBe(503);expect(fake.scan).not.toHaveBeenCalled()});
 it('does not read aggregate data for an invalid password',async()=>{vi.stubEnv('FAN_STATS_PASSWORD_HASH',createHash('sha256').update('fixture-password').digest('hex'));const r=await GET(new NextRequest('https://example.test/api/fan/stats',{headers:{authorization:'Bearer wrong'}}));expect(r.status).toBe(401);expect(fake.get).not.toHaveBeenCalled();expect(fake.scan).not.toHaveBeenCalled()});
 it('deduplicates SCAN pages and only returns aggregate counts',async()=>{vi.stubEnv('FAN_STATS_PASSWORD_HASH',createHash('sha256').update('fixture-password').digest('hex'));fake.get.mockResolvedValue(null);fake.scan.mockResolvedValueOnce(['12',['board-a']]).mockResolvedValueOnce(['0',['board-a','board-b']]);fake.mget.mockResolvedValue([{createdAt:Date.now(),expiresAt:Date.now()+10000,friends:[],owner:{name:'private'}} ,null]);const r=await GET(new NextRequest('https://example.test/api/fan/stats',{headers:{authorization:'Bearer fixture-password'}}));const d=await r.json();expect(r.status).toBe(200);expect(d.maps).toBe(1);expect(fake.mget).toHaveBeenCalledWith('board-a','board-b');expect(JSON.stringify(d)).not.toContain('private');expect(r.headers.get('cache-control')).toContain('no-store')});
});
