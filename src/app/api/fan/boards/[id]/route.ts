import { NextRequest } from 'next/server';
import {body,identity,withIdentity,failure,throttle} from '@/lib/fan/http';
import {getBoard,publicBoard,mutate,resultType,validateProfile,digest,FanError} from '@/lib/fan/store';
type Context={params:Promise<{id:string}>};
export async function GET(req:NextRequest,ctx:Context){try{const {id}=await ctx.params;const who=identity(req),board=await getBoard(id);return withIdentity(req,{board:publicBoard(board,who.hash)},who.raw)}catch(e){return failure(e)}}
export async function POST(req:NextRequest,ctx:Context){try{const input=await body(req),{id}=await ctx.params,who=identity(req);await throttle(req,'mutate',30);let value='';const op=input.op;
 if(op==='join')value=JSON.stringify(validateProfile(input,resultType(input.answers),who.hash));
 else if(op==='recover'){await throttle(req,'recover',5);if(typeof input.code!=='string'||!/^[\w-]{43}$/.test(input.code))throw new FanError(403,'복구 코드를 확인해주세요.');value=digest(input.code);}
 else if(op!=='touch'&&op!=='leave'&&op!=='delete')throw new FanError(400,'지원하지 않는 요청이에요.');
 const board=await mutate(id,op,who.hash,value);return withIdentity(req,{board:board?publicBoard(board,who.hash):null},who.raw);
}catch(e){return failure(e)}}
