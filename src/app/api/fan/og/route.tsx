import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { getBoard } from '@/lib/fan/store';
import quiz from '@/lib/fan/quiz.json';
let font:Promise<Buffer>|undefined;
export async function GET(req:NextRequest){let name='야구 안 본다던 놈이',line='내일 선발은 알고 있다.',label='5문항으로 들키는 내 야구팬 실체',type='G';const id=req.nextUrl.searchParams.get('map'),t=quiz.types.find(x=>x.id===req.nextUrl.searchParams.get('type'));
 if(id&&/^[\w-]{16}$/.test(id)){try{const b=await getBoard(id);name=b.owner.name+'의 야구판';line='너 들어오면 우리 조합 나옴 ㅋㅋ';label='5문항 풀고 합류 · 내 결과로 내 지도도 만들기';type=b.owner.type;}catch{}}
 else if(t){name=t.name;line=t.tag;label=t.line;type=t.id;}
 const old:Record<string,number>={A:0,C:1,G:2};const isOld=type in old;const src=isOld?'/fan/og-board.png':'/fan/og-'+type+'.png';const image=await readFile(join(process.cwd(),'public',src));const data='data:image/png;base64,'+image.toString('base64');const fonts=await (font??=readFile(join(process.cwd(),'public/fan/korean.woff')));
 return new ImageResponse(<div style={{width:'100%',height:'100%',display:'flex',background:'#faf7ee',padding:'50px',fontFamily:'FanKorean',color:'#19281f',alignItems:'center',gap:'30px'}}><div style={{display:'flex',flexDirection:'column',width:660}}><div style={{fontSize:24,color:'#23563c',marginBottom:24}}>직관메이트 · 내 야구팬 실체 들킴</div><div style={{fontSize:58,lineHeight:1.3,wordBreak:'break-all'}}>{name}</div><div style={{fontSize:32,lineHeight:1.5,marginTop:24}}>{line}</div><div style={{fontSize:22,color:'#697064',marginTop:32}}>{label}</div></div><div style={{display:'flex',width:360,height:isOld?306:265,position:'relative',overflow:'hidden'}}>{/* Original illustration stays unchanged; frame excludes all embedded text. */}<img alt="" src={data} width={isOld?1080:360} height={isOld?720:540} style={{position:'absolute',width:isOld?1080:360,height:isOld?720:540,left:isOld?-old[type]*360:0,top:isOld?-190:-98}}/></div></div>,{width:1200,height:630,fonts:[{name:'FanKorean',data:fonts,weight:700,style:'normal'}],headers:{'Cache-Control':'public, max-age=300'}});
}
