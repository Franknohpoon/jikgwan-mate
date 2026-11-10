
const DATA={
  "types": [
    {
      "id": "A",
      "name": "방구석 전력분석실",
      "icon": "🧠",
      "tag": "엑셀은 아직 연장전",
      "line": "야구 한 경기 봤는데 참고자료가 8개.",
      "body": "“못한다”는 말에도 근거가 필요함. 단톡에서 느낌상이라는 말이 나오면 자료 첨부 준비 완료.",
      "quote": "잠깐만, 그건 기록을 봐야 돼.",
      "color": "#dae7ee"
    },
    {
      "id": "B",
      "name": "남의 집 장바구니",
      "icon": "🛒",
      "tag": "내 돈 아닌데 예산 초과",
      "line": "좋은 선수 보면 우리 유니폼부터 입혀봄.",
      "body": "남의 팀 선수인데 빈자리부터 체크함. 영입 발표보다 영입 후보 얘기할 때 더 바쁨.",
      "quote": "우리 팀 오면 딱인데.",
      "color": "#ffe2ba"
    },
    {
      "id": "C",
      "name": "유망주 보호자",
      "icon": "🌱",
      "tag": "우리 애는 못 내줌",
      "line": "통산 3안타인데 내 마음속 영구결번.",
      "body": "아직 보여줄 게 많다고 믿음. 트레이드 얘기 나오면 갑자기 법정대리인이 됨.",
      "quote": "얘는 기회 좀 더 줘야 돼.",
      "color": "#dfedce"
    },
    {
      "id": "D",
      "name": "프랜차이즈 지박령",
      "icon": "🧣",
      "tag": "추억은 트레이드 불가",
      "line": "성적 얘기하다 결국 “그래도 우리 애인데”.",
      "body": "기록 옆에 함께한 계절이 붙어 있음. 이름 석 자만 나오면 합리적 협상은 종료.",
      "quote": "걔가 우리 팀에서 몇 년을 뛰었는데.",
      "color": "#f0dce3"
    },
    {
      "id": "E",
      "name": "9회말 인격교체",
      "icon": "📣",
      "tag": "8회까진 좋은 사람이었음",
      "line": "이모티콘만 모아도 경기 흐름 복원 가능.",
      "body": "한 타석에 감정선이 세 번 바뀜. 내가 뛰는 것도 아닌데 승부처엔 심박수가 올라감.",
      "quote": "아니 지금 이걸????",
      "color": "#ffd6bd"
    },
    {
      "id": "G",
      "name": "탈덕 예고 상습범",
      "icon": "🫠",
      "tag": "안 본다며?",
      "line": "야구 안 본다더니 내일 선발은 알고 있음.",
      "body": "정떨어졌다고는 했지 알림을 끈다고는 안 했음. 탈덕 발표는 반복되는데 복귀 공지는 생략됨.",
      "quote": "나 진짜 안 봄. 근데 새 소식 떴냐?",
      "color": "#e4dff0"
    },
    {
      "id": "F",
      "name": "구장 출석체크러",
      "icon": "🎟️",
      "tag": "승률보다 출석률",
      "line": "경기력은 구단이, 출석은 내가 책임짐.",
      "body": "언제 한번 가자를 실제 약속으로 만드는 사람. 경기 얘기하다 이미 좌석과 동선을 보고 있음.",
      "quote": "그래서 표 언제 열림?",
      "color": "#d5e9e0"
    },
    {
      "id": "H",
      "name": "야구 다큐 주인공",
      "icon": "🎬",
      "tag": "혼자 시즌 엔딩 찍는 중",
      "line": "30초 영상 보러 갔다가 한 시즌 다시 삶.",
      "body": "점수보다 그때 느꼈던 게 먼저 떠오름. 비시즌은 야구가 없는 시간이 아니라 복습하는 시간.",
      "quote": "그 장면 전에 무슨 일이 있었냐면…",
      "color": "#f4e5bd"
    }
  ],
  "questions": [
    {
      "title": "야구 단톡방에 링크 4개가 왔다.",
      "sub": "지금 가장 먼저 눌러보고 싶은 건?",
      "chat": "이 중에 뭐부터 볼래? ㅋㅋ",
      "options": [
        "우리 팀이 데려온다는 선수의 성적표",
        "우리 팀 선수들의 근황 사진",
        "어제 아쉽게 진 경기 하이라이트",
        "야구장 먹거리와 좌석 추천 영상"
      ],
      "pairs": [
        [
          0,
          1
        ],
        [
          2,
          3
        ],
        [
          4,
          5
        ],
        [
          6,
          7
        ]
      ],
      "hint": "딱 맞는 답이 없어도, 평소 내 모습에 가장 가까운 하나를 골라줘."
    },
    {
      "title": "우리 팀 선수를 다른 팀에 보내자는 얘기가 나왔다.",
      "sub": "친구가 “다른 선수를 데려오려면 한 명은 보내야지”라고 한다. 내 반응은?",
      "chat": "누굴 보내야 한다면 너는 어떻게 생각해?",
      "options": [
        "누구를 보낼지는 선수 기록부터 보고 정하자.",
        "오래 뛴 선수는 남기고 다른 선수를 알아보자.",
        "다음 직관 때 이기는 모습 좀 보게, 잘하는 선수 데려오자.",
        "또 선수 보내? 안 본다 해놓고 결국 소식 찾아볼 듯."
      ],
      "pairs": [
        [
          0,
          2
        ],
        [
          1,
          3
        ],
        [
          4,
          6
        ],
        [
          5,
          7
        ]
      ],
      "hint": "딱 맞는 답이 없어도, 평소 내 모습에 가장 가까운 하나를 골라줘."
    },
    {
      "title": "우리 팀이 한 점 차로 지고 있다.",
      "sub": "마지막 공격, 안타 하나면 동점! 나는 어떻게 보고 있을까?",
      "chat": "제발 하나만 쳐줘…!",
      "options": [
        "어떤 공이 올지 예상하면서 한 공씩 본다.",
        "못 보겠다며 화면을 껐다가 바로 다시 켠다.",
        "자리에서 일어나 응원가를 부른다.",
        "오래 응원한 타자라 예전 활약도 떠오른다."
      ],
      "pairs": [
        [
          0,
          4
        ],
        [
          1,
          5
        ],
        [
          2,
          6
        ],
        [
          3,
          7
        ]
      ],
      "hint": "딱 맞는 답이 없어도, 평소 내 모습에 가장 가까운 하나를 골라줘."
    },
    {
      "title": "경기 없는 날, 야구 영상을 켰다.",
      "sub": "시간 가는 줄 모르고 계속 보게 되는 영상은?",
      "chat": "오늘 경기 없는데도 야구 보고 있어?",
      "options": [
        "우리 팀 레전드의 기록과 활약을 정리한 영상",
        "내년에 기대되는 신인과 영입 후보 소개",
        "몇 번을 봐도 짜릿한 끝내기 승리 영상",
        "다음에 갈 야구장의 좌석과 먹거리 후기"
      ],
      "pairs": [
        [
          0,
          3
        ],
        [
          1,
          2
        ],
        [
          4,
          7
        ],
        [
          5,
          6
        ]
      ],
      "hint": "딱 맞는 답이 없어도, 평소 내 모습에 가장 가까운 하나를 골라줘."
    },
    {
      "title": "친구가 내 야구 보는 모습을 한마디로 말한다.",
      "sub": "“너는 진짜 이럴 때 제일 너 같아.” 가장 내 얘기 같은 건?",
      "chat": "이건 인정하지? ㅋㅋ",
      "options": [
        "안 본다더니 선수 기록은 누구보다 잘 앎.",
        "질 때마다 잘하는 선수 좀 데려오라고 함.",
        "신인 첫 안타에도 감동해서 영상 저장함.",
        "오래된 유니폼 입고 또 야구장 가 있음."
      ],
      "pairs": [
        [
          0,
          5
        ],
        [
          1,
          4
        ],
        [
          2,
          7
        ],
        [
          3,
          6
        ]
      ],
      "hint": "딱 맞는 답이 없어도, 평소 내 모습에 가장 가까운 하나를 골라줘."
    }
  ],
  "version": "five-scenes-v0.3-clear",
  "tiePriority": [
    2,
    4,
    1,
    3,
    0
  ]
}
;const ART="/fan/board.webp";const CHARART={"B":"/fan/B.webp","D":"/fan/D.webp","E":"/fan/E.webp","F":"/fan/F.webp","H":"/fan/H.webp"};const app=document.getElementById('app');let answers=[],step=0,current=null,nickname='',friends=[],lastScreen='home',ownerTeam='',inviteHost=null,hostSnapshot=null,guestProfile=null,groupBy='team',boardView='map',mapSelected=-1,mapCamera=null,mapResizeObserver=null;
function esc(s){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
function go(html){if(mapResizeObserver){mapResizeObserver.disconnect();mapResizeObserver=null}app.innerHTML=(html.includes('data-character-art')?artSources():'')+html;window.scrollTo(0,0);const h=app.querySelector('h1,h2');if(h){h.tabIndex=-1;h.focus({preventScroll:true})}initMapEvents()}
function toast(s){const a=document.getElementById('announce');a.innerHTML='<div class="toast">'+esc(s)+'</div>';setTimeout(()=>a.innerHTML='',3200)}
function score(a){if(a.length!==5||a.some(x=>!Number.isInteger(x)||x<0||x>3))throw new Error('Incomplete answers');const hits=DATA.types.map((t,i)=>DATA.questions.map((q,j)=>Number(q.pairs[a[j]].includes(i))));const totals=hits.map(h=>h.reduce((a,b)=>a+b,0));const order=DATA.types.map((_,i)=>i).sort((a,b)=>{if(totals[b]!==totals[a])return totals[b]-totals[a];for(const q of DATA.tiePriority){if(hits[b][q]!==hits[a][q])return hits[b][q]-hits[a][q]}return 0});return {index:order[0],type:DATA.types[order[0]],totals,tied:totals.filter(x=>x===Math.max(...totals)).length>1}}
const WITNESSES=[
 {id:'G',tab:'탈덕 선언',icon:'🫠',headline:'야구 안 본다던 놈이',punch:'내일 선발은 알고 있다.',speech:'나 진짜 이제 안 봄.',caught:'탈덕 선언 12시간 만에 라인업 확인',note:'알림은 안 끔. 복귀 공지는 생략함.'},
 {id:'C',tab:'유망주 부모',icon:'🌱',headline:'통산 3안타 신인,',punch:'마음속 영구결번.',speech:'우리 애는 못 내줌.',caught:'트레이드 기사 뜨자마자 법정대리인 등판',note:'아직 안 터졌지, 안 터질 애가 아님.'},
 {id:'F',tab:'직관 개근',icon:'🎟️',headline:'팀은 7연패인데',punch:'본인은 직관 7연속.',speech:'그래서 표 언제 열림?',caught:'경기력은 구단이, 출석은 내가 책임짐',note:'다음 직관 날짜는 이미 잡혀 있음.'},
 {id:'A',tab:'자료 첨부',icon:'🧠',headline:'“잠깐만” 한마디에',punch:'단톡 자료실 개장.',speech:'그건 기록을 봐야 돼.',caught:'야구 한 경기 봤는데 참고자료가 8개',note:'느낌상이라는 말에 엑셀부터 켬.'}
];
function home(scene=0){inviteHost=null;guestProfile=null;lastScreen='home';const w=WITNESSES[scene]||WITNESSES[0],t=DATA.types.find(t=>t.id===w.id);go(`<section class="hero hookhero"><div class="intro"><div class="casefile">직관메이트 · 야구팬 테스트</div><h1>${esc(w.headline)}<br><mark>${esc(w.punch)}</mark></h1><p class="sub">5문항으로 내 야구팬 유형을 알아보고,<br>친구와 어떤 조합인지 확인해봐.</p><button class="primary" onclick="start()">테스트 시작</button><p class="small">5문항 · 로그인 없이 바로 결과 확인</p></div><div class="witnessstage"><div class="evidencehead"><span>야구팬 유형 0${scene+1}</span><strong class="evidencestamp">이런 친구 있지?</strong></div><div class="speech">“${esc(w.speech)}”</div><div class="witnessart">${characterArt(t)}</div><p class="caught">↳ ${esc(w.caught)}</p><div class="witnesstabs" aria-label="다른 야구팬 목격담">${WITNESSES.map((x,i)=>`<button onclick="home(${i})" aria-pressed="${scene===i}">${x.icon} ${esc(x.tab)}</button>`).join('')}</div></div></section><button class="secondary" onclick="gallery()">전체 유형 보기</button><div class="note">화면 체험용 시안이에요. 실제 초대·친구 저장은 아직 연결되지 않았어요. 결과와 친구 예시는 이 화면에서만 확인할 수 있어요.</div>`)}
function friendBait(t){const picks={A:['C','G'],B:['C','D'],C:['B','A'],D:['B','A'],E:['A','G'],F:['G','H'],G:['A','F'],H:['A','F']}[t.id];return `<aside class="friendbait"><div class="eyebrow">친구는 어떤 유형일까?</div><h3>같이 야구 보는 친구를 초대해봐.</h3><p>친구가 테스트를 마치면 내 지도에서 둘의 관계를 볼 수 있어.</p><div class="baitnames">${picks.map(id=>{const f=DATA.types.find(x=>x.id===id);return `<span>${f.icon} ${esc(f.name)}</span>`}).join('')}</div></aside>`}

function start(){answers=[];step=0;question()}
function question(){lastScreen='question';const q=DATA.questions[step];go(`<section class="center question">${inviteHost?`<div class="guestmode">${esc(inviteHost.nickname)}님의 초대 · 5문항 후 내 결과와 두 사람 관계를 확인하고 지도에 참여해요.</div>`:''}<div class="topline"><button class="back" onclick="prev()">← ${step?'이전 질문':'처음으로'}</button><span class="eyebrow">${String(step+1).padStart(2,'0')} / 05</span></div><div class="progress" aria-label="${step+1}번째 질문">${DATA.questions.map((_,i)=>`<i class="${i<=step?'done':''}"></i>`).join('')}</div><h2>${esc(q.title)}</h2><p class="sub">${esc(q.sub)}</p><div class="chat"><span class="chatface" aria-hidden="true">⚾</span><div class="bubble">${esc(q.chat)}</div></div><div class="options">${q.options.map((o,i)=>`<button class="option ${answers[step]===i?'selected':''}" onclick="choose(${i})"><span class="letter">${String.fromCharCode(65+i)}.</span><span>${esc(o)}</span></button>`).join('')}</div><p class="small">${esc(q.hint||'평소 네 모습에 가까운 걸로 골라줘.')}</p></section>`)}
function prev(){if(step){step--;question()}else if(inviteHost)inviteLanding();else home()}
function choose(i){answers[step]=i;if(step<4){step++;question()}else{current=score(answers).type;result()}}
function artSources(){return `<svg class="artsources" width="0" height="0" aria-hidden="true" focusable="false"><defs><image id="source-board" href="${ART}" width="1536" height="1024"/>${Object.entries(CHARART).map(([id,src])=>`<image id="source-${id}" href="${src}" width="1024" height="1536"/>`).join('')}</defs></svg>`}
function characterArt(t,small=false){
 const old={A:0,C:1,G:2}[t.id];let src,w,h,box;
 if(old!==undefined){src=ART;w=1536;h=1024;box=small?`${135+old*512} 795 270 229`:`${old*512+4} 270 500 435`;}
 else {src=CHARART[t.id];w=1024;h=1536;box=small?({B:'300 1135 440 401',D:'300 1150 440 386',E:'300 1185 440 351',F:'300 1180 440 356',H:'300 1170 440 366'}[t.id]):'0 280 1024 755';}
 if(!src)throw new Error('Missing character artwork: '+t.id);
 const [x,y,bw,bh]=box.split(' ').map(Number);const clip=`crop-${t.id}-${small?'avatar':'body'}`;
 return `<svg data-character-art="${t.id}" xmlns="http://www.w3.org/2000/svg" viewBox="${box}" role="img" aria-label="${esc(t.name)} 캐릭터" focusable="false" preserveAspectRatio="xMidYMid meet"><title>${esc(t.name)}</title><defs><clipPath id="${clip}" clipPathUnits="userSpaceOnUse"><rect x="${x}" y="${y}" width="${bw}" height="${bh}"/></clipPath></defs><g clip-path="url(#${clip})"><use href="#source-${old!==undefined?'board':t.id}"/></g></svg>`;
}
function portrait(t){return `<div class="portrait">${characterArt(t)}</div>`}

const TEAMS=[['SSG','SSG 랜더스','#b92740'],['LG','LG 트윈스','#ad1749'],['DOOSAN','두산 베어스','#263154'],['KIWOOM','키움 히어로즈','#8d2446'],['KT','KT 위즈','#333333'],['HANWHA','한화 이글스','#d45d18'],['KIA','KIA 타이거즈','#bd2638'],['SAMSUNG','삼성 라이온즈','#2059ad'],['LOTTE','롯데 자이언츠','#147b98'],['NC','NC 다이노스','#43607b'],['NONE','아직 응원팀 고르는 중','#778465']];
function teamInfo(code){return TEAMS.find(t=>t[0]===code)||TEAMS[10]}
function teamTag(code){const t=teamInfo(code);return `<span class="teamtag" style="--team:${t[2]}"><i class="teamdot" aria-hidden="true"></i>${esc(t[0]==='NONE'?'응원팀 탐색 중':t[0])}</span>`}
function teamSelect(value){return `<label for="team">응원팀 · 지도에 구단 색으로 표시돼요</label><select id="team"><option value="">응원팀을 골라줘</option>${TEAMS.map(t=>`<option value="${t[0]}" ${value===t[0]?'selected':''}>${esc(t[1])}</option>`).join('')}</select>`}
function inviteSteps(){return `<ol class="journey"><li><b>친구도 5문항</b><span>자기 팬 캐릭터를 찾고</span></li><li><b>내 지도에 합류</b><span>우리 둘의 관계를 확인</span></li><li><b>친구도 자기 지도</b><span>다른 친구를 또 초대</span></li></ol>`}
function editLastAnswer(){if(answers.length===5){step=4;question()}else start()}
function result(){lastScreen='result';const t=current;go(`<section class="center resultpage">${inviteHost?`<div class="guestmode">${esc(inviteHost.nickname)}님이 초대한 야구판 · 이 결과로 참여할 수 있어요.</div>`:''}<div class="topline"><button class="back" onclick="editLastAnswer()">← 마지막 답 바꾸기</button><span class="eyebrow">테스트 결과</span></div><article class="result"><div class="resulthead"><span class="ticket">나의 야구팬 유형</span><h2>${esc(t.name)}</h2></div>${portrait(t)}<div class="tag">“${esc(t.tag)}”</div><div class="resultbody"><p><b>${esc(t.line)}</b></p><p>${esc(t.body)}</p><div class="quote">자주 하는 말<br>“${esc(t.quote)}”</div></div><div class="resultfoot">재미로 보는 야구팬 유형 테스트</div></article>${inviteHost?'':friendBait(t)}<div class="actions"><button class="primary" onclick="${inviteHost&&guestProfile?'friendJoined()':'createForm()'}">${inviteHost?guestProfile?'참여 완료 · 우리 관계 다시 보기 ↗':`${esc(inviteHost.nickname)}님 지도에 참여하고 관계 보기 ↗`:'떠오른 그 친구, 내 지도에 부르기 ↗'}</button><p class="invitehint">${inviteHost?'별명·응원팀만 입력하면 참여 완료.<br>그다음엔 이 결과 그대로 내 지도도 만들 수 있어요.':'친구가 테스트를 마치고 참여하면 내 지도에 표시돼요.'}</p>${inviteHost?'':inviteSteps()}<button class="secondary" onclick="copyText('${t.id}','result')">결과 공유하기</button><div class="linkrow"><button onclick="start()">다시 하기</button>${inviteHost?'':'<button onclick="gallery()">다른 캐릭터 구경</button>'}</div></div></section>`)}
function createForm(){go(`<section class="center"><button class="back" onclick="result()">← 내 결과</button><div class="boardhead"><div class="eyebrow">${inviteHost?'지도 참여':'별명과 응원팀을 알려줘'}</div><h2>${inviteHost?`${esc(inviteHost.nickname)}님 지도에<br>내 자리 만들기.`:'친구 초대 준비'}</h2></div><div class="form"><label for="nick">친구가 알아볼 별명</label><input id="nick" maxlength="12" placeholder="예: 으쓱이" value="${esc(inviteHost?'':nickname)}" autocomplete="off">${teamSelect(inviteHost?'':ownerTeam)}<p class="small">${inviteHost?'참여하면 내 별명·응원팀·팬 유형이 친구 지도에 보여요. 결과와 관계는 참여 전에 다시 볼 수 있어요.':'지도에 내 별명·응원팀·팬 유형이 표시돼요. 친구는 설문을 풀고 별명을 입력하면 내 주변에 나타나요.'}</p><p class="small">화면 체험용 · DB 저장·실제 초대 링크는 아직 미연결이에요. 출시 보관 정책은 마지막 활동 후 180일 예정이에요.</p><br><button class="primary" onclick="createBoard()">${inviteHost?'이 결과로 참여하고 우리 관계 보기 ↗':'내 캐릭터 가운데 놓기 ↗'}</button></div></section>`)}
function createBoard(){if(inviteHost&&guestProfile){friendJoined();return}const n=document.getElementById('nick').value.trim().slice(0,12),team=document.getElementById('team').value;if(!n){toast('친구가 알아볼 별명을 입력해줘.');document.getElementById('nick').focus();return}if(!TEAMS.some(t=>t[0]===team)){toast('응원팀을 골라줘. 아직 없으면 탐색 중도 좋아.');document.getElementById('team').focus();return}if(inviteHost){guestProfile={id:current.id,name:n,team,example:true};hostSnapshot.friends.push({...guestProfile});friendJoined();return}nickname=n;ownerTeam=team;board()}
function mapLayout(count){const rings=[];let remaining=Math.max(count,8),capacity=count<=8?8:10,radius=200,size=0,points=[];while(remaining>0){const amount=Math.min(remaining,capacity);rings.push({radius,amount});remaining-=amount;capacity+=10;radius+=180;}size=2*(rings[rings.length-1].radius+90);const center=size/2;rings.forEach((ring,k)=>{for(let i=0;i<ring.amount;i++){const angle=(-90+i*360/ring.amount+(k%2?9:0))*Math.PI/180;points.push({x:center+ring.radius*Math.cos(angle),y:center+ring.radius*Math.sin(angle),ring:k})}});return {size,center,rings,points}}
function viewControls(){return `<div class="boardviews" aria-label="친구 보기 방식"><button onclick="setBoardView('map')" aria-pressed="${boardView==='map'}">야구지도</button><button onclick="setBoardView('list')" aria-pressed="${boardView==='list'}">친구 목록 · 보조 보기</button></div>`}
function setBoardView(view){if(!['map','list'].includes(view))return;boardView=view;board()}
function friendMap(){if(boardView==='list')return crowdMap();const layout=mapLayout(friends.length),c=layout.center;return `<div class="mapcard"><div class="atlasbar"><b>야구 친구 ${friends.length}명 <span id="mapzoom" class="atlaszoom"></span></b><div class="atlasbuttons"><button onclick="zoomMap(.8)" aria-label="지도 축소">−</button><button onclick="zoomMap(1.25)" aria-label="지도 확대">＋</button><button onclick="fitMap()">전체 보기</button></div></div><p class="mapinstructions">${friends.length>10?'친구가 많아지면 지도가 여러 겹으로 커져요.':'가운데는 나, 주변은 나와 야구 보는 친구들.'} 캐릭터를 누르면 아래에 친구 정보가 나와요.</p><div id="mapviewport" class="atlasviewport" tabindex="0" role="region" aria-label="${esc(nickname)}님의 야구지도. 방향키로 이동, 더하기 빼기로 확대 축소, 0으로 전체 보기."><div id="mapworld" class="mapworld" style="width:${layout.size}px;height:${layout.size}px" data-world-size="${layout.size}"><svg class="atlasgeometry" viewBox="0 0 ${layout.size} ${layout.size}" aria-hidden="true">${layout.rings.map(r=>`<circle cx="${c}" cy="${c}" r="${r.radius}"/>`).join('')}<line id="selectedline" x1="${c}" y1="${c}" x2="${c}" y2="${c}" visibility="hidden"/></svg><div class="mapowner" style="--x:${c}px;--y:${c}px;--team:${teamInfo(ownerTeam)[2]}"><span class="me">이 판의 나</span><span class="charicon">${characterArt(current,true)}</span><b>${esc(nickname)}</b><span class="typename">${esc(current.name)}</span>${teamTag(ownerTeam)}</div>${layout.points.map((point,i)=>{const f=friends[i],pos=`--x:${point.x}px;--y:${point.y}px;`;if(!f)return `<div class="mapslot" style="${pos}" aria-label="아직 비어 있는 친구 자리"><span class="vacancy" aria-hidden="true">＋</span><span class="waiting">${i===0?'첫 친구 자리':'친구 기다리는 중'}</span></div>`;const t=DATA.types.find(t=>t.id===f.id);return `<button class="mapslot ${mapSelected===i?'selected':''}" data-map-friend="${i}" style="${pos}--team:${teamInfo(f.team)[2]}" onclick="selectMapFriend(${i})" aria-label="${esc(f.name)}, ${esc(t.name)}, ${esc(teamInfo(f.team)[1])} 선택"><span class="charicon">${characterArt(t,true)}</span><b>${esc(f.name)}</b>${teamTag(f.team)}</button>`}).join('')}</div></div><div id="mapdetail" class="atlasdetail">${mapDetail()}</div><div class="atlashelp">그림은 팬 유형 · 테두리와 이름표는 응원팀<br>드래그로 이동 · ＋/−로 확대·축소 · 두 손가락 확대·축소<br>지도에 초점을 두고 방향키로 이동할 수도 있어요. 안쪽·바깥쪽 자리는 친밀도나 순위와 무관해요.</div></div>`}
function mapDetail(){const f=friends[mapSelected];if(!f)return `<b>${friends.length?'보고 싶은 친구를 톡 눌러봐.':'내 자리는 완성. 첫 친구만 기다리는 중 ㅋㅋ'}</b><p>${friends.length?'나와 그 친구 사이의 연결선만 강조돼요. 작은 이름은 확대해서 보거나 보조 목록에서 찾을 수 있어요.':'친구가 들어오면 주변 빈자리에 캐릭터와 응원팀이 표시돼요.'}</p>`;const t=DATA.types.find(t=>t.id===f.id),r=relation(current,t);return `<div class="selectedfriend"><span class="charicon" style="border:2px solid ${teamInfo(f.team)[2]}">${characterArt(t,true)}</span><div><b>${esc(f.name)}</b><p>${esc(t.name)} · ${esc(teamInfo(f.team)[1])}</p><p>${esc(r.title)}</p></div></div><button onclick="showRelationAt(${mapSelected})">나 ↔ ${esc(f.name)} 관계 자세히 보기 ↗</button>`}
function selectMapFriend(index){if(!Number.isInteger(index)||!friends[index])return;mapSelected=index;const viewport=document.getElementById('mapviewport'),detail=document.getElementById('mapdetail'),line=document.getElementById('selectedline'),point=mapLayout(friends.length).points[index];if(detail)detail.innerHTML=mapDetail();if(viewport&&viewport.querySelectorAll)viewport.querySelectorAll('[data-map-friend]').forEach(node=>node.classList.toggle('selected',Number(node.dataset.mapFriend)===index));if(line&&line.setAttribute){line.setAttribute('x2',point.x);line.setAttribute('y2',point.y);line.setAttribute('visibility','visible')}}
function cameraTransform(){if(!mapCamera)return;const world=document.getElementById('mapworld'),label=document.getElementById('mapzoom');if(world&&world.style)world.style.transform=`translate(${mapCamera.x}px,${mapCamera.y}px) scale(${mapCamera.scale})`;if(label)label.textContent='· '+Math.round(mapCamera.scale/mapCamera.fit*100)+'%'}
function fitMap(){const viewport=document.getElementById('mapviewport'),world=document.getElementById('mapworld');if(!viewport||!world||!viewport.clientWidth)return;const size=Number(world.dataset.worldSize),fit=Math.min(viewport.clientWidth/size,viewport.clientHeight/size)*.94;mapCamera={fit,scale:fit,x:(viewport.clientWidth-size*fit)/2,y:(viewport.clientHeight-size*fit)/2,size};cameraTransform()}
function scaleMapAt(factor,x,y){if(!mapCamera||!Number.isFinite(factor)||factor<=0)return;const next=Math.max(mapCamera.fit*.8,Math.min(mapCamera.fit*5,mapCamera.scale*factor)),ratio=next/mapCamera.scale;mapCamera.x=x-(x-mapCamera.x)*ratio;mapCamera.y=y-(y-mapCamera.y)*ratio;mapCamera.scale=next;cameraTransform()}
function zoomMap(factor){const viewport=document.getElementById('mapviewport');if(!viewport)return;scaleMapAt(factor,viewport.clientWidth/2,viewport.clientHeight/2)}
function initMapEvents(){const viewport=document.getElementById('mapviewport');if(!viewport||!viewport.addEventListener)return;fitMap();if(typeof ResizeObserver!=='undefined'){mapResizeObserver=new ResizeObserver(()=>fitMap());mapResizeObserver.observe(viewport)}if(friends[mapSelected])selectMapFriend(mapSelected);const pointers=new Map();let last=null,moved=false,start=null;function pair(){const p=[...pointers.values()];if(p.length<2)return null;return {x:(p[0].x+p[1].x)/2,y:(p[0].y+p[1].y)/2,d:Math.hypot(p[0].x-p[1].x,p[0].y-p[1].y)}}function local(e){const r=viewport.getBoundingClientRect();return {x:e.clientX-r.left,y:e.clientY-r.top}}viewport.addEventListener('pointerdown',e=>{if(e.pointerType==='mouse'&&e.button!==0)return;const p=local(e);pointers.set(e.pointerId,p);if(pointers.size===1){moved=false;start=p}last=pair()||p;});viewport.addEventListener('pointermove',e=>{if(!pointers.has(e.pointerId)||!mapCamera)return;const p=local(e);pointers.set(e.pointerId,p);if(start&&Math.hypot(p.x-start.x,p.y-start.y)>5){moved=true;if(viewport.setPointerCapture)viewport.setPointerCapture(e.pointerId)}const current=pair();if(current&&last&&last.d){mapCamera.x+=current.x-last.x;mapCamera.y+=current.y-last.y;scaleMapAt(last.d?current.d/last.d:1,current.x,current.y);moved=true;last=current}else if(!current&&last){mapCamera.x+=p.x-last.x;mapCamera.y+=p.y-last.y;cameraTransform();last=p}});function end(e){pointers.delete(e.pointerId);last=pair()||[...pointers.values()][0]||null;start=last}viewport.addEventListener('pointerup',end);viewport.addEventListener('pointercancel',end);viewport.addEventListener('lostpointercapture',end);viewport.addEventListener('click',e=>{if(moved){e.preventDefault();e.stopPropagation();moved=false}},true);viewport.addEventListener('keydown',e=>{const handled=['ArrowLeft','ArrowRight','ArrowUp','ArrowDown','+','=','-','0'];if(!handled.includes(e.key)||!mapCamera)return;e.preventDefault();if(e.key==='0')fitMap();else if(['+','=','-'].includes(e.key))zoomMap(e.key==='-'?.8:1.25);else {mapCamera.x+=e.key==='ArrowLeft'?40:e.key==='ArrowRight'?-40:0;mapCamera.y+=e.key==='ArrowUp'?40:e.key==='ArrowDown'?-40:0;cameraTransform()}});}

function demoControls(){return `<div class="democontrols"><strong>체험 인원 바꿔보기 · 친구 수 기준</strong><div class="demobuttons">${[0,3,10,20,30].map(n=>`<button onclick="demoFriends(${n})" aria-pressed="${friends.length===n}">${n}명</button>`).join('')}</div><p>전부 가상의 체험 친구예요. 인원이 많아져도 지도가 유지돼요. 목록은 보조 보기에서 열 수 있어요. 인원을 바꾸면 현재 체험 명단이 바뀌어요.</p></div>`}
function setGrouping(value){if(!['team','type'].includes(value))return;groupBy=value;board()}
function crowdMap(){const keys=groupBy==='team'?TEAMS.map(t=>t[0]):DATA.types.map(t=>t.id);const groups=keys.map(key=>({key,items:friends.map((f,i)=>({...f,index:i})).filter(f=>(groupBy==='team'?f.team:f.id)===key)})).filter(g=>g.items.length);return `<div class="mapcard"><div class="crowdsummary"><span class="charicon" style="border:2px solid ${teamInfo(ownerTeam)[2]}">${characterArt(current,true)}</span><div><b>${esc(nickname)} 중심 야구판</b><p>${esc(current.name)} · ${esc(teamInfo(ownerTeam)[1])}</p><span class="badge">${friends.some(f=>f.example)?'체험 친구':'참여한 친구'} ${friends.length}명</span></div></div><div class="crowdstats"><div><b>${friends.length}</b><span>야구 친구</span></div><div><b>${new Set(friends.map(f=>f.team)).size}</b><span>응원팀</span></div><div><b>${new Set(friends.map(f=>f.id)).size}</b><span>팬 유형</span></div></div><div class="groupbar"><strong>모두 나와의 관계예요</strong><div class="grouptabs"><button onclick="setGrouping('team')" aria-pressed="${groupBy==='team'}">구단별</button><button onclick="setGrouping('type')" aria-pressed="${groupBy==='type'}">유형별</button></div></div><div class="crowdgroups">${groups.map(g=>`<section class="crowdgroup"><h3>${esc(groupBy==='team'?teamInfo(g.key)[1]:DATA.types.find(t=>t.id===g.key).name)}<span>${g.items.length}명</span></h3><div class="crowdgrid">${g.items.map(f=>{const t=DATA.types.find(t=>t.id===f.id),r=relation(current,t);return `<button class="crowdperson" style="--team:${teamInfo(f.team)[2]}" onclick="showRelationAt(${f.index})" aria-label="${esc(f.name)}님과 나의 관계 보기"><span class="charicon">${characterArt(t,true)}</span><div><b>${esc(f.name)}</b><span class="typename">${esc(t.name)}</span>${teamTag(f.team)}<span class="relpeek">${esc(r.title)} ↗</span></div></button>`}).join('')}</div></section>`).join('')}</div><div class="maplegend">사람이 많아져도 나 ↔ 각 친구의 관계만 보여요.<br>구단별·유형별로 묶어 보며, 모든 친구를 빠짐없이 표시해요.</div></div>`}
function openMapDemo(n=10){boardView='map';inviteHost=null;hostSnapshot=null;guestProfile=null;if(!current)current=DATA.types.find(t=>t.id==='F');if(!nickname)nickname='으쓱이';if(!ownerTeam)ownerTeam='SSG';demoFriends(n)}

function board(){lastScreen='board';inviteHost=null;go(`<section class="center"><div class="boardhead"><div class="eyebrow">경기는 끝나도 단톡은 연장전</div><h2>${esc(nickname)}의<br><mark>내 야구판</mark></h2></div>${demoControls()}${viewControls()}${friendMap()}<div class="actions"><button class="primary" onclick="invitePanel()">친구 초대 안내·문구 보기 ↗</button><p class="invitehint">초대받은 친구가 5문항을 풀면 이 지도에 합류해요.<br>친구도 자기 결과로 새 지도를 만들 수 있어요.</p>${inviteSteps()}<button class="secondary" onclick="demoFriends()">친구 3명이 모인 지도 미리보기</button><button class="secondary" onclick="retentionInfo()">내 지도 보관·복구 안내</button><div class="linkrow"><button onclick="result()">내 캐릭터 다시 보기</button>${friends.length?'<button onclick="friends=[];board()">체험 친구 비우기</button>':''}${hostSnapshot?'<button onclick="returnHost()">처음 초대한 친구 지도 보기</button>':''}</div></div><div class="note">현재는 화면 체험용이에요. 초대 문구만 복사되며 실제 링크로 친구가 참여하거나 DB에 저장되지는 않아요.</div></section>`)}
function invitePanel(){go(`<section class="center"><button class="back" onclick="board()">← 내 야구판</button><div class="boardhead"><div class="eyebrow">딱 한 명이면 우리 조합 완성</div><h2>너도 알지, 그 친구.<br><mark>이번엔 같이 들켜보자.</mark></h2></div><div class="hostpill"><span class="charicon friendicon">${characterArt(current,true)}</span><div><b>${esc(nickname)}의 야구판</b><p class="small">${esc(current.name)} · ${esc(teamInfo(ownerTeam)[1])}</p></div></div>${inviteSteps()}<div class="invitepreview"><span class="ticket">친구가 받게 될 초대</span><h3>이건 나고, 저건 너다 ㅋㅋ<br>우리 조합 확인하러 와.</h3><p>5문항 풀고 ${esc(nickname)}의 지도에 합류해봐.<br>네 캐릭터도 보고, 우리 관계도 바로 나옴.</p><p class="small">네 결과로 네 지도도 만들 수 있어. 설문은 한 번만!</p></div><div class="actions"><button class="primary" onclick="copyText(current.id,'invite')">이 초대 문구 복사하기</button><p class="invitehint">시안에서는 문구만 복사돼요. 실제 초대 링크는 미연결이에요.</p><button class="secondary" onclick="beginInviteDemo()">초대받은 친구 입장에서 참여해보기 ↗</button></div></section>`)}
function beginInviteDemo(){hostSnapshot={type:current,nickname,team:ownerTeam,friends:friends.map(f=>({...f})),answers:[...answers]};inviteHost=hostSnapshot;guestProfile=null;answers=[];step=0;inviteLanding()}
function inviteLanding(){go(`<section class="center"><button class="back" onclick="returnHost()">← 초대한 사람 화면으로</button><div class="eyebrow">초대받은 친구 화면 체험</div><div class="boardhead"><h2>${esc(inviteHost.nickname)}님이<br>야구판에 초대했어.</h2></div><div class="hostpill"><span class="charicon">${characterArt(inviteHost.type,true)}</span><div><b>${esc(inviteHost.nickname)} · ${esc(inviteHost.type.name)}</b>${teamTag(inviteHost.team)}</div></div><p class="sub">너는 어떤 야구팬인지 5문항으로 찾고,<br>이 친구랑 어떤 조합인지 바로 확인해봐.</p>${inviteSteps()}<button class="primary" onclick="start()">내 캐릭터 찾고 친구 지도에 참여하기 ↗</button><p class="small">결과는 바로 볼 수 있어요. 참여하려면 별명·응원팀을 입력해요. 그 후 같은 결과로 내 지도를 만들 수 있어요.</p><div class="note">현재 브라우저 안에서만 진행되는 초대 체험이에요. 실제 친구에게 전송·저장되지 않아요.</div></section>`)}
function friendJoined(){const h=hostSnapshot,t=current,r=relation(h.type,t);go(`<section class="center resultpage"><div class="joinedbanner"><b>${esc(h.nickname)}님 지도에 내 자리가 생겼어!</b><br>체험 참여 완료 · 두 사람의 야구 조합은?</div><article class="result"><div class="resulthead"><span class="ticket">나 ↔ 초대한 친구</span></div><div class="duo"><div class="duoperson"><span class="charicon duoicon">${characterArt(h.type,true)}</span><small>${esc(h.nickname)}</small>${teamTag(h.team)}</div><span>×</span><div class="duoperson"><span class="charicon duoicon">${characterArt(t,true)}</span><small>${esc(guestProfile.name)}</small>${teamTag(guestProfile.team)}</div></div><div class="relation"><h2>${esc(r.title)}</h2><p>${esc(r.line)}</p><div class="chips"><span class="chip">${esc(h.type.name)}</span><span class="chip">${esc(t.name)}</span></div></div></article><div class="actions"><button class="primary" onclick="makeOwnFromGuest()">내 지도 만들기</button><p class="invitehint">이 결과로 만들 수 있어요. 다시 풀지 않아도 돼요.</p><button class="secondary" onclick="returnHost()">친구 지도에 채워진 내 자리 보기</button><button class="secondary" onclick="result()">내 캐릭터 결과 다시 보기</button></div><div class="note">체험 참여라 새로고침하면 초기화돼요. 실제 친구 지도 저장은 출시 구현 단계에서 연결해요.</div></section>`)}
function makeOwnFromGuest(){nickname=guestProfile.name;ownerTeam=guestProfile.team;friends=[];inviteHost=null;board()}
function returnHost(){if(!hostSnapshot){board();return}current=hostSnapshot.type;nickname=hostSnapshot.nickname;ownerTeam=hostSnapshot.team;friends=hostSnapshot.friends.map(f=>({...f}));answers=[...hostSnapshot.answers];inviteHost=null;hostSnapshot=null;guestProfile=null;board()}

const PAIRS={"AC": ["트레이드 금지", "“기록 봐.” “우리 애야.”"], "BC": ["우리 애 판매 금지", "“얘 주고 데려오자.” 읽씹."], "AH": ["같은 경기 다른 기억", "한 명은 타율, 한 명은 그날 날씨."], "AE": ["분석 중 고성 주의", "설명 끝나기도 전에 “제발!!!!”"], "AD": ["숫자 vs 의리", "“성적은?” “몇 년을 뛰었는데.”"], "AG": ["탈덕 증거 수집", "안 본다더니 기록은 다 알고 있음."], "AF": ["구장 가는 분석실", "한 명은 기록, 한 명은 표를 챙김."], "AB": ["영입 결재 라인", "“사자.” “성적표부터 줘.”"]};
function relation(a,b){const key=[a.id,b.id].sort().join('');if(a.id===b.id)return {title:a.id==='G'?'동반 탈덕 실패':'야구 얘기 무한리필',line:a.id==='G'?'둘 다 안 본다면서 서로 중계 중.':'같은 얘기인데 둘 다 안 질림.'};const p=PAIRS[key];return p?{title:p[0],line:p[1]}:{title:'이 조합은 원고 준비 중',line:'두 캐릭터의 전용 관계 문구를 다음 시안에서 채울 예정이에요.'}}
function demoFriends(count=3){if(![0,3,10,20,30].includes(count))return;boardView='map';mapSelected=-1;const ids=['A','C','G'].filter(x=>x!==current.id);if(ids.length<3)ids.push('H');const names=['야구친구 하나','우리애 지킴이','내일선발 누구'];friends=Array.from({length:count},(_,i)=>({id:i<3?ids[i]:DATA.types[(i-3)%8].id,name:i<3?names[i]:['승요기원','표구함','내년엔우승','잠깐기록좀','우리애지켜','오늘도직관','안본다며','엔딩재탕'][(i-3)%8]+String(i+1),team:i<3?['LG','SSG','LOTTE'][i]:TEAMS[(i-3)%10][0],example:true}));board();toast('체험 친구 '+count+'명 구성이야. 실제 참여자는 아니에요.');}
function showRelationAt(index){const f=friends[index];if(!f)return;showRelation(f.id,f)}
function showRelation(id,friend){const t=DATA.types.find(x=>x.id===id),f=friend||{name:'예시 친구',team:'NONE'},r=relation(current,t);go(`<section class="center"><button class="back" onclick="board()">← 내 야구판</button><article class="result"><div class="resulthead"><span class="ticket">우리 둘의 야구 조합</span></div><div class="duo"><div class="duoperson"><span class="charicon duoicon">${characterArt(current,true)}</span><small>${esc(nickname)}</small>${teamTag(ownerTeam)}</div><span>×</span><div class="duoperson"><span class="charicon duoicon">${characterArt(t,true)}</span><small>${esc(f.name)}</small>${teamTag(f.team)}</div></div><div class="relation"><h2>${esc(r.title)}</h2><p>${esc(r.line)}</p><div class="chips"><span class="chip">${esc(current.name)}</span><span class="chip">${esc(t.name)}</span></div></div><div class="resultfoot">재미로 보는 야구팬 조합</div></article><div class="actions"><button class="primary" onclick="board()">지도로 돌아가기</button></div></section>`)}

function retentionInfo(){const before=lastScreen;go(`<section class="center"><button class="back" onclick="${before==='board'?'board()':before==='result'?'result()':'home()'}">← 돌아가기</button><div class="boardhead"><div class="eyebrow">내 야구판은 일회용이 아니니까</div><h2>친구는 계속 모으고,<br><mark>지도는 오래 보관해.</mark></h2></div><div class="note">출시 정책안이에요. 현재 시안에는 DB 저장·로그인 기능이 연결되지 않아 새로고침하면 초기화돼요.</div><article class="form"><h3>지도와 친구 관계 · 180일</h3><p class="small">주인이 내 지도 관리 화면에 방문하거나 새 친구가 참여하면 보관 기간을 다시 계산할 예정이에요. 공개 링크를 보기만 하는 방문으로는 연장되지 않아요.</p><br><h3>내 지도를 다시 찾으려면?</h3><p class="small">처음에는 로그인 없이 만들고, 나중에 로그인으로 내 지도 관리권을 연결하는 방식이에요. 쿠키 삭제·기기 변경에 대비한 기능으로 출시 전에 구현해요. 로그인해도 무기한 보관되는 건 아니에요.</p><br><h3>답변은 필요한 만큼만</h3><p class="small">미완료 답변은 최대 24시간. 완료하면 캐릭터 결과만 남기고 문항별 답변은 삭제할 예정이에요.</p><br><h3>원하면 내 정보 삭제</h3><p class="small">지도 주인은 자기 지도를, 친구는 자기 참여를 삭제할 수 있도록 만들어요. 공개 초대 링크만으로 다른 사람의 지도를 수정·삭제할 수는 없어요.</p></article><p class="small">정식 버전에서는 내 지도 관리 화면에 보관 종료 예정일을 표시해요. 실제 보관·삭제 기준은 서비스 공개 전에 확정해 안내해요.</p></section>`)}
function gallery(){go(`<section class="center"><button class="back" onclick="home()">← 처음으로</button><div class="eyebrow">팬심은 여덟 가지 모습</div><h2 class="galleryhead">이거 너잖아.<br>아니면 그 친구.</h2><div class="typegrid">${DATA.types.map(t=>`<button class="typepick" onclick="current=DATA.types.find(x=>x.id==='${t.id}');result()"><div class="galleryart">${characterArt(t)}</div><b>${esc(t.name)}</b><p>${esc(t.tag)}</p></button>`).join('')}</div><p class="small">캐릭터 구경용 결과는 테스트를 풀어 나온 판정과 별개예요.</p></section>`)}
async function copyText(id,kind){const t=DATA.types.find(x=>x.id===id);const value=kind==='invite'?`이건 나고, 저건 너다 ㅋㅋ 우리 단톡 문제의 조합 확인하러 와.\n5문항 풀고 ${nickname}의 지도에 합류해봐. 네 캐릭터랑 우리 관계가 바로 나옴.\n네 결과로 네 지도도 만들 수 있어. 설문은 한 번만!\n(화면 체험용 시안: 실제 초대 링크 미연결)`:`나의 야구팬 유형 ㅋㅋ\n내 캐릭터는 ${t.name} ${t.icon}\n${t.line}\n직관메이트 × 팩트페페`;try{await navigator.clipboard.writeText(value);toast(kind==='invite'?'초대 문구 복사! 실제 링크는 다음 단계에 연결돼요.':'결과 문구 복사했어 ㅋㅋ')}catch{window.prompt('아래 문구를 복사해 주세요.',value)}}
// Real beta adapter. Preview data never enters the persistence APIs.
const preview={home,board,createForm,invitePanel,friendJoined,choose,retentionInfo,gallery,result};
let activeBoard=null,recoveryCode='',recoveryBoardId='',productionBusy=false,showDemo=false;
const liveOrigin=location.origin;
async function api(path,body){const response=await fetch('/api/fan/boards'+path,{method:body?'POST':'GET',headers:body?{'Content-Type':'application/json'}:{},body:body?JSON.stringify(body):undefined,credentials:'same-origin',cache:'no-store'});const data=await response.json();if(!response.ok)throw Error(data.error||'연결을 확인해주세요.');return data;}
function safeLocal(key,value){try{if(value===undefined)return localStorage.getItem(key);if(value===null)localStorage.removeItem(key);else localStorage.setItem(key,value)}catch{}return null}
function loadLive(b){activeBoard=b;current=DATA.types.find(t=>t.id===b.owner.type);nickname=b.owner.name;ownerTeam=b.owner.team;friends=b.friends.map(f=>({id:f.type,name:f.name,team:f.team,serverId:f.id,example:false}));mapSelected=-1;boardView='map';inviteHost=null;guestProfile=null;showDemo=false;}
function urlFor(id,view=''){const u=new URL('/play',liveOrigin);u.searchParams.set('map',id);if(view)u.searchParams.set('view',view);return u.href}
function rememberBoard(b){safeLocal('fm_board',b.id)}
function navigateBoard(){if(activeBoard)history.replaceState(null,'',urlFor(activeBoard.id,'map'))}
home=function(scene=0){showDemo=false;preview.home(scene);const note=app.querySelector('.note');if(note)note.textContent='웹 베타 · 친구의 별명·응원팀·팬 유형이 초대 링크를 가진 사람에게 공개돼요. 지도는 마지막 활동 후 180일 보관해요.';const intro=app.querySelector('.intro');if(intro)intro.insertAdjacentHTML('beforeend','<button class="secondary" onclick="myMap()">내 지도 찾기</button>');history.replaceState(null,'','/play');};
openMapDemo=function(n=10){showDemo=true;activeBoard=null;current=current||DATA.types.find(t=>t.id==='F');nickname=nickname||'으쓱이';ownerTeam=ownerTeam||'SSG';demoFriends(n)};
const previewBoard=preview.board;
board=function(){if(showDemo){previewBoard();const note=app.querySelector('.note');if(note)note.textContent='가상 친구로 보는 지도 체험이에요. 실제 저장 지도와 분리돼요.';return}if(!activeBoard){createForm();return}previewBoard();const controls=app.querySelector('.democontrols');if(controls)controls.remove();const actions=app.querySelector('.actions');if(actions)actions.innerHTML=`${activeBoard.isOwner?'<button class="primary" onclick="invitePanel()">친구 초대</button>':'<button class="primary" onclick="joinExisting()">나도 이 지도에 참여하기 ↗</button>'}<button class="secondary" onclick="refreshMap()">지도 새로고침</button><button class="secondary" onclick="shareMap()">지도 공유</button><button class="secondary" onclick="retentionInfo()">지도 보관·복구·삭제 안내</button>${activeBoard.isOwner?'<button class="secondary" onclick="recoveryInfo()">내 지도 복구 코드 안내</button>':''}${activeBoard.myFriendId?'<button class="secondary" onclick="leaveMap()">이 지도에서 내 참여 삭제</button>':''}${activeBoard.isOwner?'<button class="secondary" onclick="deleteMap()">내 지도 삭제</button>':''}`;const note=app.querySelector('.note');if(note)note.innerHTML=`링크를 가진 사람은 이 지도를 볼 수 있어요. 보관 종료 예정: ${new Date(activeBoard.expiresAt).toLocaleDateString('ko-KR')}.<br>캐릭터는 팬 놀이 결과예요. 실제 성격이나 친구 사이를 판정하지 않아요.`;navigateBoard();};
function resultInvite(){if(inviteHost){if(guestProfile)friendJoined();else createForm();return}if(activeBoard?.isOwner&&current.id===activeBoard.owner.type&&answers.length!==5){invitePanel();return}if(answers.length===5||guestProfile)createForm();else start();}
result=function(){preview.result();const section=app.querySelector('.resultpage');if(!section)return;const id=current.id;const canInvite=answers.length===5||guestProfile||activeBoard?.isOwner;const label=inviteHost?(guestProfile?'우리 관계 보기':'참여하고 관계 보기'):(canInvite?'친구 초대':'테스트 시작');const primary=section.querySelector('.actions .primary');if(primary){primary.textContent=label;primary.onclick=resultInvite}const actions=section.querySelector('.actions');if(actions)actions.insertAdjacentHTML('beforeend',`<a class="secondary image-download" href="/api/fan/og?type=${id}&download=1" download="jikgwan-mate-${id}.png">결과 이미지 저장</a><p class="small">저장이 안 되면 <a href="/api/fan/og?type=${id}&card=1" target="_blank" rel="noopener">이미지 열기</a> 후 길게 눌러 저장해줘.</p>`);section.classList.add('with-sharebar');section.insertAdjacentHTML('beforeend',`<div class="result-sharebar"><div class="sharebar-inner"><p>${inviteHost?'참여하면 친구와의 관계를 볼 수 있어요.':canInvite?'친구가 참여하면 지도에 표시돼요.':'나의 유형도 확인해보세요.'}</p><button class="primary" onclick="resultInvite()">${label}</button></div></div>`);};
createForm=function(){preview.createForm();const small=app.querySelectorAll('.form .small');if(small[1])small[1].remove();const form=app.querySelector('.form');if(form){const b=form.querySelector('.primary');if(!inviteHost){b.textContent='초대 링크 만들기 ↗';const hint=form.querySelector('.small');if(hint)hint.textContent='입력하면 친구에게 보낼 초대 링크가 만들어져요.'}b.insertAdjacentHTML('beforebegin','<label style="display:flex;gap:10px;align-items:flex-start;margin:18px 0;font-size:13px;line-height:1.6"><input type="checkbox" id="public-consent" style="width:20px;min-height:20px;margin:3px 0;flex-shrink:0">별명·응원팀·팬 유형이 링크를 가진 사람에게 공개되는 것에 동의해요. 답변 원문은 저장하지 않으며 지도는 마지막 활동 후 180일 보관해요.</label>')} };
createBoard=async function(){if(productionBusy)return;const name=document.getElementById('nick')?.value.trim(),team=document.getElementById('team')?.value,consent=document.getElementById('public-consent')?.checked;if(!name||!team||!consent){toast('별명·응원팀과 공개 동의를 확인해줘.');return}productionBusy=true;const button=app.querySelector('.form .primary');if(button){button.disabled=true;button.textContent='지도에 자리 만드는 중…'}try{if(inviteHost){const data=await api('/'+inviteHost.id,{op:'join',name,team,consent,answers});hostSnapshot={...inviteHost,friends:data.board.friends};guestProfile=data.board.friends.find(f=>f.id===data.board.myFriendId);if(!guestProfile)throw Error('참여 결과를 확인하지 못했어요.');guestProfile={...guestProfile,id:guestProfile.type,serverId:guestProfile.id};current=DATA.types.find(t=>t.id===guestProfile.type);activeBoard=data.board;answers=[];friendJoined();}else {const data=await api('',{name,team,consent,...(guestProfile&&hostSnapshot?{sourceBoardId:hostSnapshot.id}:{answers})});answers=[];recoveryCode=data.recovery;recoveryBoardId=data.board.id;loadLive(data.board);rememberBoard(data.board);navigateBoard();invitePanel(true);}}catch(e){toast(e.message||'저장하지 못했어요.');if(button){button.disabled=false;button.textContent='다시 저장하기 ↗'}}finally{productionBusy=false}};
invitePanel=function(first=false){if(showDemo){toast('퀴즈를 풀고 내 지도를 만들어줘.');return}if(!activeBoard)return;go(`<section class="center"><button class="back" onclick="board()">← 내 지도</button><div class="boardhead"><div class="eyebrow">${first?'초대 링크 준비 완료!':'친구 초대'}</div><h2>친구를 초대해봐.</h2></div><p class="sub">링크를 보내면 친구도 테스트를 하고<br>내 지도에 참여할 수 있어.</p><div class="actions"><button class="primary" onclick="shareMap()">초대 링크 공유</button><button class="secondary" onclick="copyInvite()">초대 링크 복사</button><label class="small" for="invite-url">친구에게 보내는 공개 링크</label><input id="invite-url" class="invite-url" readonly value="${esc(urlFor(activeBoard.id))}" onclick="this.select()"></div>${inviteSteps()}<div class="invitepreview"><h3>${esc(nickname)}의 야구판에 초대!</h3><p>참여한 친구와의 관계는 내 지도에서 확인할 수 있어요.</p></div><button class="secondary" onclick="board()">내 지도 보기</button>${first?'<details class="recovery-reminder"><summary>지도 복구 코드 보관</summary><p class="small">현재 브라우저에는 관리 권한이 저장됐어요. 복구 코드는 친구에게 보내지 말고 비공개로 보관해줘. 처음 만든 지금만 확인할 수 있어요.</p><button class="secondary" onclick="recoveryInfo()">비공개 복구 코드 확인</button></details>':''}<p class="small">내 별명·응원팀·유형은 링크를 가진 사람에게 공개돼요.</p></section>`)};
async function shareOrCopy(text,url){try{if(navigator.share){await navigator.share({title:'직관메이트 · 우리 단톡 문제의 조합',text,url});return}await navigator.clipboard.writeText(text+'\n'+url);toast('초대 링크 복사했어 ㅋㅋ')}catch(e){if(e.name!=='AbortError')window.prompt('이 링크를 복사해서 친구에게 보내줘.',url)}}
async function shareMap(){if(!activeBoard)return;await shareOrCopy(`나는 ${current.name} 나옴 ㅋㅋ 너는 무슨 유형인데? 5문항 풀고 ${nickname}의 지도에 들어와봐. 우리 야구 조합 바로 나옴!`,urlFor(activeBoard.id));}
async function copyInvite(){if(!activeBoard)return;const text=`나는 ${current.name} 나옴 ㅋㅋ 너는 무슨 유형인데?\n5문항 풀고 ${nickname}의 지도에 들어와봐. 우리 야구 조합 바로 나옴!\n${urlFor(activeBoard.id)}`;try{await navigator.clipboard.writeText(text);toast('초대 링크 복사했어.')}catch{window.prompt('복사해서 친구에게 보내줘.',text)}}
copyText=async function(id,kind){if(kind==='invite'){await copyInvite();return}const t=DATA.types.find(t=>t.id===id);const u=new URL('/play',liveOrigin);u.searchParams.set('result',id);await shareOrCopy(`내 야구팬 실체 들킴 ㅋㅋ ${t.name} · ${t.line}`,u.href)};
async function refreshMap(){if(!activeBoard)return;try{const data=await api('/'+activeBoard.id);loadLive(data.board);board();toast('최신 친구들로 업데이트했어.')}catch(e){toast(e.message)}}
async function myMap(){const id=safeLocal('fm_board');if(!id){recoverMapForm();return}try{const data=await api('/'+id);loadLive(data.board);if(data.board.isOwner){const touched=await api('/'+id,{op:'touch'});loadLive(touched.board);board()}else recoverMapForm(id)}catch(e){toast(e.message);recoverMapForm(id)}}
function recoverMapForm(id=''){go(`<section class="center"><button class="back" onclick="home()">← 처음으로</button><div class="boardhead"><h2>내 야구판,<br>다시 찾기.</h2></div><div class="form"><label for="recover-id">지도 ID</label><input id="recover-id" value="${esc(id)}" maxlength="16" placeholder="공유 링크의 map= 뒤 16자리"><label for="recover-code">지도 만들 때 저장한 복구 코드</label><input id="recover-code" autocomplete="off" type="password" placeholder="43자리 복구 코드"><p class="small">공유 링크만으로는 관리 권한을 얻을 수 없어요. 복구 코드가 없다면 처음 만들었던 브라우저에서 열어주세요.</p><button class="primary" onclick="recoverMap()">관리 권한 복구하기</button></div></section>`)}
async function recoverMap(){try{const id=document.getElementById('recover-id').value.trim(),code=document.getElementById('recover-code').value.trim();const data=await api('/'+encodeURIComponent(id),{op:'recover',code});loadLive(data.board);rememberBoard(data.board);board();toast('이 브라우저로 관리 권한을 옮겼어.')}catch(e){toast(e.message)}}
function recoveryInfo(first=false){go(`<section class="center"><button class="back" onclick="board()">← 내 지도</button><div class="boardhead"><h2>${first?'내 야구판 완성!':'내 지도 복구 안내'}</h2></div><div class="note">현재 브라우저에는 관리 권한이 저장돼요. 쿠키를 지우거나 다른 기기로 옮길 때는 지도 ID와 복구 코드가 필요해요.</div>${recoveryCode&&recoveryBoardId===activeBoard.id?`<div class="form"><label>지도 ID</label><p style="overflow-wrap:anywhere">${esc(activeBoard.id)}</p><label>복구 코드 · 친구에게 공유 금지</label><p style="overflow-wrap:anywhere">${esc(recoveryCode)}</p><p class="small">코드는 처음 만들 때만 표시돼요. 비공개로 따로 보관하세요. 공개 지도 링크와는 달라요.</p><button class="secondary" onclick="copyRecovery()">ID·복구 코드 복사</button></div>`:'<p class="small">복구 코드는 처음 만들 때만 표시돼요. 저장해 둔 코드를 사용해주세요. 지금 이 브라우저에서는 계속 관리할 수 있어요.</p>'}<div class="actions"><button class="primary" onclick="board()">내 지도 보러 가기 ↗</button></div></section>`)}
async function copyRecovery(){try{await navigator.clipboard.writeText('지도 ID: '+activeBoard.id+'\n복구 코드: '+recoveryCode);toast('비공개로 보관해줘. 친구에게 보내는 링크가 아니야.')}catch{toast('위 코드를 직접 복사해줘.')}}
async function deleteMap(){if(!activeBoard?.isOwner||!confirm('내 지도와 모든 친구 참여를 삭제할까요? 되돌릴 수 없어요.'))return;try{await api('/'+activeBoard.id,{op:'delete'});safeLocal('fm_board',null);activeBoard=null;recoveryCode='';home();toast('내 지도를 삭제했어.')}catch(e){toast(e.message)}}
async function leaveMap(){if(!activeBoard?.myFriendId||!confirm('이 지도에서 내 별명·응원팀·유형 참여를 삭제할까요?'))return;try{const data=await api('/'+activeBoard.id,{op:'leave'});loadLive(data.board);board();toast('이 지도에서 내 참여를 삭제했어.')}catch(e){toast(e.message)}}
async function joinExisting(){if(!activeBoard)return;if(activeBoard.isOwner){invitePanel();return}if(activeBoard.myFriendId){const f=activeBoard.friends.find(f=>f.id===activeBoard.myFriendId);current=DATA.types.find(t=>t.id===f.type);guestProfile={...f,id:f.type,serverId:f.id};hostSnapshot={...activeBoard,nickname:activeBoard.owner.name,team:activeBoard.owner.team,type:DATA.types.find(t=>t.id===activeBoard.owner.type)};inviteHost=hostSnapshot;friendJoined();return}inviteHost={...activeBoard,nickname:activeBoard.owner.name,team:activeBoard.owner.team,type:DATA.types.find(t=>t.id===activeBoard.owner.type)};hostSnapshot=inviteHost;answers=[];guestProfile=null;inviteLanding()}
const previewLanding=inviteLanding;
inviteLanding=function(){previewLanding();const eyebrow=app.querySelector('section > .eyebrow');if(eyebrow)eyebrow.textContent='친구의 초대';const heading=app.querySelector('.boardhead h2');if(heading)heading.innerHTML=`${esc(inviteHost.nickname)}님은 ${esc(inviteHost.type.name)},<br><mark>너는 무슨 유형인데?</mark>`;const sub=app.querySelector('.sub');if(sub)sub.innerHTML='5문항으로 내 유형을 알아보고,<br>친구와의 관계를 확인해봐.';const primary=app.querySelector('section > .primary');if(primary)primary.textContent='테스트하고 참여하기';const note=app.querySelector('.note');if(note)note.textContent='결과를 먼저 보고, 별명·응원팀 공개에 동의하면 친구 지도에 참여해요. 답변 원문은 저장하지 않아요.';const back=app.querySelector('.back');if(back){back.textContent='← 친구 지도 먼저 보기';back.onclick=()=>{loadLive(activeBoard);board()}}};
friendJoined=function(){preview.friendJoined();const banner=app.querySelector('.joinedbanner');if(banner)banner.innerHTML=`<b>${esc(hostSnapshot.nickname)}님 지도에 내 자리가 생겼어!</b><br>참여 완료 · 두 사람의 야구 조합은?`;const note=app.querySelector('.note');if(note)note.innerHTML='친구 지도에 참여가 저장됐어요. 내 참여는 같은 브라우저에서 삭제할 수 있어요.';const second=app.querySelectorAll('.actions .secondary');if(second[0])second[0].onclick=()=>{loadLive(activeBoard);board()};};
makeOwnFromGuest=function(){nickname=guestProfile.name;ownerTeam=guestProfile.team;inviteHost=null;createForm();};
retentionInfo=function(){go(`<section class="center"><button class="back" onclick="${activeBoard?'board()':'home()'}">← 돌아가기</button><div class="boardhead"><h2>내 야구판<br>보관·공개 안내</h2></div><div class="form"><h3>링크를 가진 사람에게 보여요</h3><p class="small">별명·응원팀·팬 유형과 친구 참여가 공개돼요. 실명·연락처 등 개인 식별 정보는 별명에 넣지 마세요.</p><br><h3>마지막 활동 후 180일</h3><p class="small">주인이 ‘내 지도’로 관리 화면에 들어오거나 새 친구가 실제 참여하면 연장돼요. 공개 링크 열람만으로는 연장되지 않아요. 종료되면 저장소에서 자동 만료돼요.</p><br><h3>답변 원문은 저장하지 않아요</h3><p class="small">서버에서 결과를 계산하고 팬 유형·계산 버전·완료 시각을 보관해요. 관리와 중복 참여 확인을 위해 브라우저 관리 쿠키의 해시를 저장해요. 속도 제한용 요청 식별 해시는 최대 2분 보관돼요.</p><br><h3>복구·삭제</h3><p class="small">지도 ID와 비공개 복구 코드로 기기를 옮길 수 있어요. 로그인 연결은 아직 없어요. 주인은 지도 전체, 참여자는 자기 참여를 삭제할 수 있어요. 쿠키와 복구 코드를 모두 잃으면 관리 권한을 되찾을 수 없어요.</p><br><h3>웹 베타</h3><p class="small">방문자 수·페이지 조회·유입 경로 등 이용 통계는 Vercel Web Analytics로 집계해요. 분석 URL에서는 지도 ID 등 쿼리 정보를 제외하며 별명·응원팀·설문 답변·복구 코드를 보내지 않아요. 서비스 제공 목적 이외의 광고·마케팅 용도로 사용하지 않아요. 서버 장애 시 저장·접근이 잠시 중단될 수 있어요. 구단 공식 서비스가 아닌 팬 놀이예요.</p></div><p class="small">운영: 팩트페페 · 문의: X @factpepe_ · 시행 2026-11-10</p></section>`)};
// Fill every unordered pairing (8 same-type + 28 cross-type) for beta.
Object.assign(PAIRS,{"BD": ["영입 협상 결렬", "“누굴 보내?” “걔 빼고 전부.”"], "BE": ["실점하면 장바구니", "점수 내줄 때마다 영입 후보 추가."], "BF": ["영입부터 예매까지", "“얘 온대.” “데뷔전 표 잡자.”"], "BG": ["탈덕 중 스카우트", "안 본다던 애가 영입 소식 제일 빠름."], "BH": ["벌써 입단 다큐", "오지도 않았는데 감동 영상부터 만듦."], "CD": ["전원 판매 불가", "신인도 안 되고, 고참도 안 됨."], "CE": ["우리 애 응원단", "우리 신인 나오면 둘 다 볼륨 최대."], "CF": ["우리 애 보러 감", "“오늘 선발이래.” “표 잡았어.”"], "CG": ["탈덕해도 육아 중", "팀은 안 봐도 우리 신인 소식은 봄."], "CH": ["첫 안타 무한 재생", "안타는 하나, 저장한 영상은 열 개."], "DE": ["우리 선수 지킴이", "우리 선수 욕하면 둘이 동시에 등판."], "DF": ["유니폼 개근상", "유니폼은 낡아도 출석은 새로 찍음."], "DG": ["탈덕 반려", "“안 봐.” “걔 은퇴할 때도?”"], "DH": ["그때 그 경기", "한 경기 추억으로 밤샘 가능."], "EF": ["구장 소음 담당", "옆자리도 같이 목 쉬는 조합."], "EG": ["안 본다며 소리 지름", "“안 봐!” “쳐!” “아니!!!!”"], "EH": ["눈물 2회차", "경기 보고 울고, 영상 보고 또 욺."], "FG": ["탈덕했는데 예매됨", "“안 간다니까.” “네 자리도 잡음.”"], "FH": ["직관 후유증", "한 명은 다음 표, 한 명은 그날 영상."], "GH": ["탈덕은 내일부터", "“안 봐.” 해놓고 추억 영상 주고받음."]});
let relationFriendId='';
function relationShareControls(friendId){relationFriendId=friendId;if(!activeBoard||!friendId)return;const actions=app.querySelector('.actions');if(!actions)return;const image='/api/fan/og?map='+encodeURIComponent(activeBoard.id)+'&friend='+encodeURIComponent(friendId);actions.insertAdjacentHTML('afterbegin',`<button class="primary" onclick="shareRelationCard()">관계 카드 공유</button><a class="secondary image-download" href="${image}&download=1" download="jikgwan-mate-relation.png">관계 카드 이미지 저장</a><p class="small">저장이 안 되면 <a href="${image}" target="_blank" rel="noopener">이미지 열기</a> 후 길게 눌러 저장해줘.</p>`);}
const baseShowRelation=showRelation;
showRelation=function(id,friend){baseShowRelation(id,friend);relationShareControls(friend?.serverId)};
const baseFriendJoined=friendJoined;
friendJoined=function(){baseFriendJoined();relationShareControls(guestProfile?.serverId)};
async function shareRelationCard(){if(!activeBoard||!relationFriendId)return;const b=activeBoard,id=relationFriendId;const link=new URL(urlFor(b.id));link.searchParams.set('friend',id);const image='/api/fan/og?map='+encodeURIComponent(b.id)+'&friend='+encodeURIComponent(id);try{const res=await fetch(image);if(!res.ok)throw Error('이미지를 불러오지 못했어요.');const file=new File([await res.blob()],'jikgwan-mate-relation.png',{type:'image/png'});if(navigator.canShare?.({files:[file]})&&navigator.share){await navigator.share({files:[file],title:'우리 둘의 야구 조합',text:link.href});return}await shareOrCopy('우리 둘의 야구 조합 ㅋㅋ 너도 테스트하고 참여해봐.',link.href)}catch(e){if(e.name!=='AbortError')await shareOrCopy('우리 둘의 야구 조합',link.href)}}
async function boot(){const q=new URLSearchParams(location.search);const id=q.get('map'),type=q.get('result');if(id){go('<section class="center"><h2>야구 친구들 불러오는 중…</h2></section>');try{const data=await api('/'+encodeURIComponent(id));loadLive(data.board);const sharedFriend=data.board.friends.find(f=>f.id===q.get('friend'));if(sharedFriend){showRelation(sharedFriend.type,{name:sharedFriend.name,team:sharedFriend.team,serverId:sharedFriend.id});return}if(q.get('view')==='map'||data.board.isOwner||data.board.myFriendId)board();else await joinExisting();}catch(e){go(`<section class="center"><h2>지도를 열지 못했어.</h2><p class="sub">${esc(e.message)}</p><button class="primary" onclick="location.reload()">다시 불러오기</button><button class="secondary" onclick="home()">내 야구팬 캐릭터 찾기</button></section>`)}return}if(type&&DATA.types.some(t=>t.id===type)){current=DATA.types.find(t=>t.id===type);result();const back=app.querySelector('.back');if(back){back.textContent='이 캐릭터가 나일까? 검사하기';back.onclick=start}const primary=app.querySelector('.actions .primary');if(primary){primary.textContent='테스트 시작';primary.onclick=start}return}home();}
boot();
