import { NextRequest } from 'next/server';
import { shell } from '@/lib/fan/shell';
import { getBoard } from '@/lib/fan/store';
import quiz from '@/lib/fan/quiz.json';
import invites from '@/lib/fan/invites.json';
const escape=(s:string)=>s.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]!));
export async function GET(req:NextRequest){let title='야구 안 본다던 놈이 내일 선발은 알고 있다.',description='5문항으로 들키는 내 야구팬 실체. 친구를 불러 우리 단톡 문제의 조합을 확인해봐.',image='/api/fan/og',canonical=req.nextUrl.origin+'/play';const id=req.nextUrl.searchParams.get('map'),type=req.nextUrl.searchParams.get('result');
 if(id&&/^[\w-]{16}$/.test(id)){canonical+='?map='+id;image+='?map='+id;const friend=req.nextUrl.searchParams.get('friend');if(friend&&/^[\w-]{16}$/.test(friend)){image+='&friend='+friend;canonical+='&friend='+friend;}try{const b=await getBoard(id);const t=quiz.types.find(t=>t.id===b.owner.type)!;title=b.owner.name+': '+invites[t.id as keyof typeof invites].hook;description='나는 '+t.name+'. 너는? 5문항 풀고 우리 야구 조합 확인하기.';image+='&v=invite2';}catch{}}
 else if(type){const t=quiz.types.find(t=>t.id===type);if(t){title=t.name+' · 내 야구팬 실체 들킴';description=t.line;image+='?type='+t.id;canonical+='?result='+t.id;}}
 const meta=`<meta name="description" content="${escape(description)}"><meta property="og:title" content="${escape(title)}"><meta property="og:description" content="${escape(description)}"><meta property="og:type" content="website"><meta property="og:url" content="${escape(canonical)}"><meta property="og:image" content="${escape(req.nextUrl.origin+image)}"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${escape(title)}"><meta name="twitter:image" content="${escape(req.nextUrl.origin+image)}"><link rel="canonical" href="${escape(canonical)}">`;
 return new Response(shell.replace('__META__',meta).replace('<title>직관메이트 — 내 야구팬 실체 들킴</title>',`<title>${escape(title)} · 직관메이트</title>`),{headers:{'Content-Type':'text/html; charset=utf-8','Cache-Control':'no-store','X-Content-Type-Options':'nosniff','Referrer-Policy':'strict-origin-when-cross-origin','X-Frame-Options':'DENY'}});
}
