import { Redis } from '@upstash/redis';
import { createHash, randomBytes } from 'node:crypto';
import quiz from './quiz.json';

export const TTL = 180 * 86400;
export const TEAM_CODES = ['SSG','LG','DOOSAN','KIWOOM','KT','HANWHA','KIA','SAMSUNG','LOTTE','NC','NONE'];
export type Profile = { id:string; name:string; team:string; type:string; joinedAt:number; memberHash:string };
export type Board = { id:string; owner:Profile; recoveryHash:string; friends:Profile[]; createdAt:number; updatedAt:number; expiresAt:number; version:string };
export class FanError extends Error { constructor(public status:number,message:string){super(message)} }
export const digest=(value:string)=>createHash('sha256').update(value).digest('hex');
export const token=()=>randomBytes(32).toString('base64url');
let client:Redis|undefined;
export function redis(){
 const url=process.env.JIKGWAN_KV_REST_API_URL??process.env.KV_REST_API_URL??process.env.UPSTASH_REDIS_REST_URL;
 const auth=process.env.JIKGWAN_KV_REST_API_TOKEN??process.env.KV_REST_API_TOKEN??process.env.UPSTASH_REDIS_REST_TOKEN;
 if(!url||!auth)throw new FanError(503,'지도 저장소 연결을 준비 중이에요. 잠시 후 다시 시도해주세요.');
 return client??=new Redis({url,token:auth});
}
const ns=()=>`fan:v1:${process.env.VERCEL_ENV==='production'?'production':'preview'}`;
export const boardKey=(id:string)=>`${ns()}:board:${id}`;
export function validId(id:string){if(!/^[a-zA-Z0-9_-]{16}$/.test(id))throw new FanError(404,'지도를 찾을 수 없어요.');return id}
export function resultType(answers:unknown):string {
 if(!Array.isArray(answers)||answers.length!==5||answers.some(x=>!Number.isInteger(x)||x<0||x>3))throw new FanError(400,'질문 5개에 모두 답해주세요.');
 const hits=quiz.types.map((_,i)=>quiz.questions.map((q,j)=>Number(q.pairs[answers[j]].includes(i))));
 const order=quiz.types.map((_,i)=>i).sort((a,b)=>{const delta=hits[b].reduce((x,y)=>x+y,0)-hits[a].reduce((x,y)=>x+y,0);if(delta)return delta;for(const q of quiz.tiePriority){if(hits[b][q]!==hits[a][q])return hits[b][q]-hits[a][q]}return 0});
 return quiz.types[order[0]].id;
}
export function validateProfile(body:Record<string,unknown>,type:string,memberHash:string):Profile{
 const name=typeof body.name==='string'?body.name.trim():'';
 if(!name||name.length>12||/[\u0000-\u001f\u007f<>]/.test(name))throw new FanError(400,'별명은 특수 태그 없이 1~12자로 입력해주세요.');
 if(typeof body.team!=='string'||!TEAM_CODES.includes(body.team))throw new FanError(400,'응원팀을 선택해주세요.');
 if(body.consent!==true)throw new FanError(400,'별명·응원팀·유형 공개 안내를 확인해주세요.');
 return {id:randomBytes(12).toString('base64url'),name,team:body.team,type,joinedAt:Date.now(),memberHash};
}
export async function getBoard(id:string){const b=await redis().get<Board>(boardKey(validId(id)));if(!b||b.expiresAt<=Date.now())throw new FanError(404,'지도가 없거나 보관 기간이 끝났어요.');if(!Array.isArray(b.friends))b.friends=[];return b}
export function publicBoard(b:Board,memberHash:string){const clean=(p:Profile)=>({id:p.id,name:p.name,team:p.team,type:p.type,joinedAt:p.joinedAt});return {id:b.id,owner:clean(b.owner),friends:b.friends.map(clean),createdAt:b.createdAt,updatedAt:b.updatedAt,expiresAt:b.expiresAt,isOwner:b.owner.memberHash===memberHash,myFriendId:b.friends.find(f=>f.memberHash===memberHash)?.id??null,version:b.version}}
export async function limit(subject:string,kind:string,max:number){const key=`${ns()}:rate:${kind}:${digest(subject)}:${Math.floor(Date.now()/60000)}`;const n=await redis().incr(key);if(n===1)await redis().expire(key,120);if(n>max)throw new FanError(429,'요청이 많아요. 1분 뒤 다시 시도해주세요.');}
export async function createBoard(profile:Profile){const recovery=token(),now=Date.now();const b:Board={id:randomBytes(12).toString('base64url'),owner:profile,recoveryHash:digest(recovery),friends:[],createdAt:now,updatedAt:now,expiresAt:now+TTL*1000,version:quiz.version};await redis().set(boardKey(b.id),b,{ex:TTL,nx:true});return {board:b,recovery}}
// Single Redis command serializes joins, capacity, ownership and expiry updates.
export const MUTATE = `
local raw=redis.call('GET',KEYS[1]); if not raw then return {err='FAN_NOT_FOUND'} end
local b=cjson.decode(raw); local op=ARGV[1];local who=ARGV[2];local now=tonumber(ARGV[3]);local ttl=tonumber(ARGV[4]);
if b.expiresAt<=now then return {err='FAN_NOT_FOUND'} end
if op=='join' then
 if b.owner.memberHash==who then return {err='FAN_OWNER'} end
 for _,f in ipairs(b.friends) do if f.memberHash==who then return cjson.encode(b) end end
 if #b.friends>=100 then return {err='FAN_FULL'} end
 table.insert(b.friends,cjson.decode(ARGV[5]));b.updatedAt=now;b.expiresAt=now+ttl*1000;
elseif op=='touch' then
 if b.owner.memberHash~=who then return {err='FAN_FORBIDDEN'} end
 b.updatedAt=now;b.expiresAt=now+ttl*1000;
elseif op=='recover' then
 if b.recoveryHash~=ARGV[5] then return {err='FAN_FORBIDDEN'} end
 b.owner.memberHash=who;b.updatedAt=now;b.expiresAt=now+ttl*1000;
elseif op=='delete' then
 if b.owner.memberHash~=who then return {err='FAN_FORBIDDEN'} end
 redis.call('DEL',KEYS[1]);return 'deleted';
elseif op=='leave' then
 local found=false;local remaining={}; for _,f in ipairs(b.friends) do if f.memberHash==who then found=true else table.insert(remaining,f) end end
 if not found then return {err='FAN_FORBIDDEN'} end
 b.friends=remaining;redis.call('SET',KEYS[1],cjson.encode(b),'KEEPTTL');return cjson.encode(b);
else return {err='FAN_BAD_OP'} end
redis.call('SET',KEYS[1],cjson.encode(b),'EX',ttl);return cjson.encode(b);
`;
export async function mutate(id:string,op:string,who:string,value=''):Promise<Board|null>{
 try{const raw=await redis().eval(MUTATE,[boardKey(validId(id))],[op,who,Date.now(),TTL,value]);if(raw==='deleted')return null;const b=typeof raw==='string'?JSON.parse(raw):raw;if(!Array.isArray(b.friends))b.friends=[];return b;}
 catch(e){const m=e instanceof Error?e.message:'';if(m.includes('FAN_NOT_FOUND'))throw new FanError(404,'지도가 없거나 보관 기간이 끝났어요.');if(m.includes('FAN_FULL'))throw new FanError(409,'친구가 100명 모였어요. 새 지도를 만들어주세요.');if(m.includes('FAN_OWNER'))throw new FanError(409,'내 지도에는 친구를 초대해주세요.');if(m.includes('FAN_FORBIDDEN'))throw new FanError(403,'관리 권한이나 복구 코드를 확인해주세요.');throw e;}
}
