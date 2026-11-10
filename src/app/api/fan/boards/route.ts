import { NextRequest } from 'next/server';
import {body,identity,withIdentity,failure,throttle} from '@/lib/fan/http';
import {resultType,validateProfile,createBoard,getBoard,publicBoard,FanError} from '@/lib/fan/store';
export async function POST(req:NextRequest){try{const input=await body(req);await throttle(req,'create',8);const who=identity(req);let type:string;
 if(typeof input.sourceBoardId==='string'){const source=await getBoard(input.sourceBoardId);const own=source.friends.find(f=>f.memberHash===who.hash);if(!own)throw new FanError(403,'참여 결과를 찾지 못했어요. 다시 검사해주세요.');type=own.type;}else type=resultType(input.answers);
 const profile=validateProfile(input,type,who.hash),created=await createBoard(profile);return withIdentity(req,{board:publicBoard(created.board,who.hash),recovery:created.recovery},who.raw,201);
}catch(e){return failure(e)}}
