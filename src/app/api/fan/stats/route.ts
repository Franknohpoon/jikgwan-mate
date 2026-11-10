import { NextRequest,NextResponse } from 'next/server';
import { timingSafeEqual } from 'node:crypto';
import { redis,digest,limit,type Board } from '@/lib/fan/store';
import { summarizeBoards,dayKst } from '@/lib/fan/stats';
const reply=(data:unknown,status=200)=>NextResponse.json(data,{status,headers:{'Cache-Control':'private, no-store','X-Robots-Tag':'noindex, nofollow'}});
export async function GET(req:NextRequest){
 const expected=process.env.FAN_STATS_PASSWORD_HASH;if(!expected||!/^[a-f0-9]{64}$/.test(expected))return reply({error:'관리자 설정을 확인해주세요.'},503);
 try{
  await limit(req.headers.get('x-forwarded-for')?.split(',')[0]?.trim()||'unknown','stats-auth',12);
  const credential=req.headers.get('authorization')||'';
  if(credential.length>200||!credential.startsWith('Bearer ')||!timingSafeEqual(Buffer.from(digest(credential.slice(7)),'hex'),Buffer.from(expected,'hex')))return reply({error:'관리자 비밀번호를 확인해주세요.'},401);
  const ns=`fan:v1:${process.env.VERCEL_ENV==='production'?'production':'preview'}`,cacheKey=ns+':stats:'+dayKst(Date.now());
  const cached=await redis().get(cacheKey);if(cached)return reply({...cached as object,cached:true});
  let cursor='0';const seen=new Set<string>();let pages=0;
  do{const [next,keys]=await redis().scan(cursor,{match:ns+':board:*',count:100});cursor=String(next);keys.forEach(k=>seen.add(k));pages++;if(seen.size>10000||pages>=200)return reply({error:'지도가 많아 집계 방식을 업데이트해야 해요. 운영자에게 문의해주세요.'},503);}while(cursor!=='0');
  const all:Board[]=[];const keys=[...seen];for(let i=0;i<keys.length;i+=100){const batch=await redis().mget<(Board|null)[]>(...keys.slice(i,i+100));all.push(...batch.filter((b):b is Board=>b!==null));}
  const stats=summarizeBoards(all);await redis().set(cacheKey,stats,{ex:60});return reply({...stats,cached:false});
 }catch{return reply({error:'집계를 불러오지 못했어요. 잠시 후 다시 시도해주세요.'},503)}
}
