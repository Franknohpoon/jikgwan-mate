
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
      "title": "배터리 1%.\n야구 알림은 4개.",
      "sub": "딱 하나만 열 수 있다. 마지막 배터리를 바칠 알림은?",
      "chat": "야 너 폰 꺼지기 전에 이것만 봐 ㅋㅋ",
      "options": [
        "새 외국인 영입설. 일단 성적표부터 연다.",
        "선수단 근황 사진. 우리 애들 잘 있나 생존 확인.",
        "또 뜬 역전패 영상. 안 본다 했는데 손이 이미 누름.",
        "구장 브이로그. 보다가 내년 첫 직관 날짜 잡음."
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
      "hint": "가장 멀쩡한 답 말고, 네 손이 먼저 누를 쪽으로."
    },
    {
      "title": "단톡방에서\n우리 선수가 매물 됐다.",
      "sub": "“즉시전력 투수 데려오려면 얘는 줘야지.” 아직 썰인데 벌써 열받음.",
      "chat": "솔직히 얘 주고 데려오면 이득 아님?",
      "options": [
        "잠깐. 얘 2군 기록은 보고 파는 거냐?",
        "보강은 해야지. 근데 우리 간판 말고 다른 카드 없어?",
        "내가 간 날마다 털렸잖아. 일단 데려와.",
        "야구 끊으려 했는데… 걔 첫 안타 영상 다시 봄."
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
      "hint": "실제 트레이드 소식이 아닌 단톡 상황극이야. 네 반응만 골라줘."
    },
    {
      "title": "9회말 2아웃.\n친구가 “와”만 보냈다.",
      "sub": "한 점 차 승부처. 내 중계는 10초 느리다. 너 지금 뭐 하고 있음?",
      "chat": "와",
      "options": [
        "직전 구종까지 다 봤는데 왜 심장이 뜀. 제발!!!!",
        "이래서 타자 사오랬지. 안 봐. …쳤냐?",
        "자리에서 일어남. 우리 신인이면 더 크게 응원해야 됨.",
        "저 선수 데뷔 때도 이랬는데… 갑자기 그 시즌 생각남."
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
      "hint": "스포 금지 외치면서도 다음 메시지는 기다리고 있지?"
    },
    {
      "title": "야구도 안 하는데\n일요일이 사라졌다.",
      "sub": "오후 1시에 폰을 켰는데 벌써 6시. 대체 뭘 본 거야?",
      "chat": "너 오늘 뭐 했냐? 설마 또 야구?",
      "options": [
        "우리 레전드 통산 기록. 숫자만 봐도 그 시절 생각남.",
        "2군·영입 후보 영상. 내년 라인업 벌써 세 번 갈아엎음.",
        "끝내기 영상. 결말 아는데 또 소리 지르고 울었음.",
        "구장 좌석 뷰 후기. 야구 안 본다더니 앉을 자리 고르는 중."
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
      "hint": "폰 사용 시간은 묻지 않을게. 본 건 솔직히 말하자."
    },
    {
      "title": "친구 폰에 저장된\n네 이름을 봐버렸다.",
      "sub": "본명은 없고 이것만 적혀 있다. 제일 반박하기 어려운 이름은?",
      "chat": "아 미안 ㅋㅋ 근데 틀린 말은 아니잖아",
      "options": [
        "안본다며_기록첨부.pdf",
        "지면_선수사달라는_사람",
        "우리애_성장다큐_제작자",
        "그유니폼입고_또구장감"
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
      "hint": "마지막 선택. 제일 웃긴 별명 말고 제일 덜 억울한 걸로."
    }
  ],
  "version": "five-scenes-v0.2",
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
function home(scene=0){inviteHost=null;guestProfile=null;lastScreen='home';const w=WITNESSES[scene]||WITNESSES[0],t=DATA.types.find(t=>t.id===w.id);go(`<section class="hero hookhero"><div class="intro"><div class="casefile">야구팬 목격담 · 혹시 우리 단톡?</div><h1>${esc(w.headline)}<br><mark>${esc(w.punch)}</mark></h1><p class="sub">안 본다더니 소식은 제일 빠르고,<br>우리 신인은 벌써 마음속 영구결번.<br><b>그래서 너는 어떤 놈인데?</b></p><button class="primary" onclick="start()">내 야구팬 실체 확인하기 ↗</button><p class="small">5문항 · 결과 바로 공개 · 로그인 없이 체험</p></div><div class="witnessstage"><div class="evidencehead"><span>FAN FILE / 0${scene+1}</span><strong class="evidencestamp">팬심 목격 완료</strong></div><div class="speech">“${esc(w.speech)}”</div><div class="witnessart">${characterArt(t)}</div><p class="caught">↳ ${esc(w.caught)}</p><div class="witnesstabs" aria-label="다른 야구팬 목격담">${WITNESSES.map((x,i)=>`<button onclick="home(${i})" aria-pressed="${scene===i}">${x.icon} ${esc(x.tab)}</button>`).join('')}</div></div></section><section class="witnesslist"><h2 class="sectionlabel">우리 단톡에 꼭 한 명씩 있음.</h2><div class="sightinggrid">${WITNESSES.map((x,i)=>`<article class="sighting ${scene===i?'active':''}"><span class="sceneicon" aria-hidden="true">${x.icon}</span><b>${esc(x.caught)}</b><p>${esc(x.note)}</p></article>`).join('')}</div></section><section class="pitch"><div><div class="number">01</div><b>이건 나네.</b><p>5문항으로 내 팬 캐릭터 확인.</p></div><div><div class="number">02</div><b>저건 무조건 너다.</b><p>읽자마자 떠오른 야구 친구 초대.</p></div><div><div class="number">03</div><b>우리 단톡 문제의 조합.</b><p>내 지도에 모이면 두 사람 관계 공개.</p></div></section><p class="hookclosing">내 얘기 같아서 왔다가,<br>친구 한 명 떠올리고 나가는 테스트.</p><button class="secondary" onclick="openMapDemo(10)">퀴즈 없이 지도 구경 · 10명 / 20명 / 30명 ↗</button><button class="secondary" onclick="gallery()">그 친구 같은 캐릭터, 8종 먼저 구경하기</button><div class="note">화면 체험용 시안이에요. 실제 초대·친구 저장은 아직 연결되지 않았어요. 결과와 친구 예시는 이 화면에서만 확인할 수 있어요.</div>`)}
function friendBait(t){const picks={A:['C','G'],B:['C','D'],C:['B','A'],D:['B','A'],E:['A','G'],F:['G','H'],G:['A','F'],H:['A','F']}[t.id];return `<aside class="friendbait"><div class="eyebrow">읽자마자 떠오른 그 친구</div><h3>이건 나고,<br>저건 무조건 너다 ㅋㅋ</h3><p>이 캐릭터인 친구 한 명 떠오르지?<br>그 친구가 들어오면 <b>우리 단톡 문제의 조합</b>이 나와요.</p><div class="baitnames">${picks.map(id=>{const f=DATA.types.find(x=>x.id===id);return `<span>${f.icon} ${esc(f.name)}</span>`}).join('')}</div></aside>`}

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
function result(){lastScreen='result';const t=current;go(`<section class="center resultpage">${inviteHost?`<div class="guestmode">${esc(inviteHost.nickname)}님이 초대한 야구판 · 이 결과로 참여할 수 있어요.</div>`:''}<div class="topline"><button class="back" onclick="editLastAnswer()">← 마지막 답 바꾸기</button><span class="eyebrow">팬심 목격 보고서</span></div><article class="result"><div class="resulthead"><span class="ticket">내 야구팬 실체 들킴</span><h2>${esc(t.name)}</h2></div>${portrait(t)}<div class="tag">“${esc(t.tag)}”</div><div class="resultbody"><p><b>${esc(t.line)}</b></p><p>${esc(t.body)}</p><div class="quote">단톡 목격담<br>“${esc(t.quote)}”</div></div><div class="resultfoot">오늘의 선택으로 만든 팬 캐릭터 · 심리 진단이 아니에요.</div></article>${inviteHost?'':friendBait(t)}<div class="actions"><button class="primary" onclick="${inviteHost&&guestProfile?'friendJoined()':'createForm()'}">${inviteHost?guestProfile?'참여 완료 · 우리 관계 다시 보기 ↗':`${esc(inviteHost.nickname)}님 지도에 참여하고 관계 보기 ↗`:'떠오른 그 친구, 내 지도에 부르기 ↗'}</button><p class="invitehint">${inviteHost?'별명·응원팀만 입력하면 참여 완료.<br>그다음엔 이 결과 그대로 내 지도도 만들 수 있어요.':'먼저 내 지도를 만들고 초대하면, 친구가 5문항을 풀고 합류해요.<br>우리 둘의 관계를 확인하고 친구도 자기 지도를 만들 수 있어요.'}</p>${inviteHost?'':inviteSteps()}<button class="secondary" onclick="copyText('${t.id}','result')">이거 나네 ㅋㅋ 결과 문구 복사</button><div class="linkrow"><button onclick="start()">아닌데? 다시 풀기</button>${inviteHost?'':'<button onclick="gallery()">다른 캐릭터 구경</button>'}</div></div></section>`)}
function createForm(){go(`<section class="center"><button class="back" onclick="result()">← 내 결과</button><div class="boardhead"><div class="eyebrow">${inviteHost?'친구랑 나, 어떤 조합인데?':'너 들어오면 우리 관계 나옴'}</div><h2>${inviteHost?`${esc(inviteHost.nickname)}님 지도에<br>내 자리 만들기.`:'내 야구판,<br>간판부터 달자.'}</h2></div><div class="form"><label for="nick">친구가 알아볼 별명</label><input id="nick" maxlength="12" placeholder="예: 으쓱이" value="${esc(inviteHost?'':nickname)}" autocomplete="off">${teamSelect(inviteHost?'':ownerTeam)}<p class="small">${inviteHost?'참여하면 내 별명·응원팀·팬 유형이 친구 지도에 보여요. 결과와 관계는 참여 전에 다시 볼 수 있어요.':'지도에 내 별명·응원팀·팬 유형이 표시돼요. 친구는 설문을 풀고 별명을 입력하면 내 주변에 나타나요.'}</p><p class="small">화면 체험용 · DB 저장·실제 초대 링크는 아직 미연결이에요. 출시 보관 정책은 마지막 활동 후 180일 예정이에요.</p><br><button class="primary" onclick="createBoard()">${inviteHost?'이 결과로 참여하고 우리 관계 보기 ↗':'내 캐릭터 가운데 놓기 ↗'}</button></div></section>`)}
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
function crowdMap(){const keys=groupBy==='team'?TEAMS.map(t=>t[0]):DATA.types.map(t=>t.id);const groups=keys.map(key=>({key,items:friends.map((f,i)=>({...f,index:i})).filter(f=>(groupBy==='team'?f.team:f.id)===key)})).filter(g=>g.items.length);return `<div class="mapcard"><div class="crowdsummary"><span class="charicon" style="border:2px solid ${teamInfo(ownerTeam)[2]}">${characterArt(current,true)}</span><div><b>${esc(nickname)} 중심 야구판</b><p>${esc(current.name)} · ${esc(teamInfo(ownerTeam)[1])}</p><span class="badge">체험 친구 ${friends.length}명</span></div></div><div class="crowdstats"><div><b>${friends.length}</b><span>야구 친구</span></div><div><b>${new Set(friends.map(f=>f.team)).size}</b><span>응원팀</span></div><div><b>${new Set(friends.map(f=>f.id)).size}</b><span>팬 유형</span></div></div><div class="groupbar"><strong>모두 나와의 관계예요</strong><div class="grouptabs"><button onclick="setGrouping('team')" aria-pressed="${groupBy==='team'}">구단별</button><button onclick="setGrouping('type')" aria-pressed="${groupBy==='type'}">유형별</button></div></div><div class="crowdgroups">${groups.map(g=>`<section class="crowdgroup"><h3>${esc(groupBy==='team'?teamInfo(g.key)[1]:DATA.types.find(t=>t.id===g.key).name)}<span>${g.items.length}명</span></h3><div class="crowdgrid">${g.items.map(f=>{const t=DATA.types.find(t=>t.id===f.id),r=relation(current,t);return `<button class="crowdperson" style="--team:${teamInfo(f.team)[2]}" onclick="showRelationAt(${f.index})" aria-label="${esc(f.name)}님과 나의 관계 보기"><span class="charicon">${characterArt(t,true)}</span><div><b>${esc(f.name)}</b><span class="typename">${esc(t.name)}</span>${teamTag(f.team)}<span class="relpeek">${esc(r.title)} ↗</span></div></button>`}).join('')}</div></section>`).join('')}</div><div class="maplegend">사람이 많아져도 나 ↔ 각 친구의 관계만 보여요.<br>구단별·유형별로 묶어 보며, 모든 친구를 빠짐없이 표시해요.</div></div>`}
function openMapDemo(n=10){boardView='map';inviteHost=null;hostSnapshot=null;guestProfile=null;if(!current)current=DATA.types.find(t=>t.id==='F');if(!nickname)nickname='으쓱이';if(!ownerTeam)ownerTeam='SSG';demoFriends(n)}

function board(){lastScreen='board';inviteHost=null;go(`<section class="center"><div class="boardhead"><div class="eyebrow">경기는 끝나도 단톡은 연장전</div><h2>${esc(nickname)}의<br><mark>내 야구판</mark></h2></div>${demoControls()}${viewControls()}${friendMap()}<div class="actions"><button class="primary" onclick="invitePanel()">친구 초대 안내·문구 보기 ↗</button><p class="invitehint">초대받은 친구가 5문항을 풀면 이 지도에 합류해요.<br>친구도 자기 결과로 새 지도를 만들 수 있어요.</p>${inviteSteps()}<button class="secondary" onclick="demoFriends()">친구 3명이 모인 지도 미리보기</button><button class="secondary" onclick="retentionInfo()">내 지도 보관·복구 안내</button><div class="linkrow"><button onclick="result()">내 캐릭터 다시 보기</button>${friends.length?'<button onclick="friends=[];board()">체험 친구 비우기</button>':''}${hostSnapshot?'<button onclick="returnHost()">처음 초대한 친구 지도 보기</button>':''}</div></div><div class="note">현재는 화면 체험용이에요. 초대 문구만 복사되며 실제 링크로 친구가 참여하거나 DB에 저장되지는 않아요.</div></section>`)}
function invitePanel(){go(`<section class="center"><button class="back" onclick="board()">← 내 야구판</button><div class="boardhead"><div class="eyebrow">딱 한 명이면 우리 조합 완성</div><h2>너도 알지, 그 친구.<br><mark>이번엔 같이 들켜보자.</mark></h2></div><div class="hostpill"><span class="charicon friendicon">${characterArt(current,true)}</span><div><b>${esc(nickname)}의 야구판</b><p class="small">${esc(current.name)} · ${esc(teamInfo(ownerTeam)[1])}</p></div></div>${inviteSteps()}<div class="invitepreview"><span class="ticket">친구가 받게 될 초대</span><h3>이건 나고, 저건 너다 ㅋㅋ<br>우리 조합 확인하러 와.</h3><p>5문항 풀고 ${esc(nickname)}의 지도에 합류해봐.<br>네 캐릭터도 보고, 우리 관계도 바로 나옴.</p><p class="small">네 결과로 네 지도도 만들 수 있어. 설문은 한 번만!</p></div><div class="actions"><button class="primary" onclick="copyText(current.id,'invite')">이 초대 문구 복사하기</button><p class="invitehint">시안에서는 문구만 복사돼요. 실제 초대 링크는 미연결이에요.</p><button class="secondary" onclick="beginInviteDemo()">초대받은 친구 입장에서 참여해보기 ↗</button></div></section>`)}
function beginInviteDemo(){hostSnapshot={type:current,nickname,team:ownerTeam,friends:friends.map(f=>({...f})),answers:[...answers]};inviteHost=hostSnapshot;guestProfile=null;answers=[];step=0;inviteLanding()}
function inviteLanding(){go(`<section class="center"><button class="back" onclick="returnHost()">← 초대한 사람 화면으로</button><div class="eyebrow">초대받은 친구 화면 체험</div><div class="boardhead"><h2>${esc(inviteHost.nickname)}님이<br>야구판에 초대했어.</h2></div><div class="hostpill"><span class="charicon">${characterArt(inviteHost.type,true)}</span><div><b>${esc(inviteHost.nickname)} · ${esc(inviteHost.type.name)}</b>${teamTag(inviteHost.team)}</div></div><p class="sub">너는 어떤 야구팬인지 5문항으로 찾고,<br>이 친구랑 어떤 조합인지 바로 확인해봐.</p>${inviteSteps()}<button class="primary" onclick="start()">내 캐릭터 찾고 친구 지도에 참여하기 ↗</button><p class="small">결과는 바로 볼 수 있어요. 참여하려면 별명·응원팀을 입력해요. 그 후 같은 결과로 내 지도를 만들 수 있어요.</p><div class="note">현재 브라우저 안에서만 진행되는 초대 체험이에요. 실제 친구에게 전송·저장되지 않아요.</div></section>`)}
function friendJoined(){const h=hostSnapshot,t=current,r=relation(h.type,t);go(`<section class="center resultpage"><div class="joinedbanner"><b>${esc(h.nickname)}님 지도에 내 자리가 생겼어!</b><br>체험 참여 완료 · 두 사람의 야구 조합은?</div><article class="result"><div class="resulthead"><span class="ticket">나 ↔ 초대한 친구</span></div><div class="duo"><div class="duoperson"><span class="charicon duoicon">${characterArt(h.type,true)}</span><small>${esc(h.nickname)}</small>${teamTag(h.team)}</div><span>×</span><div class="duoperson"><span class="charicon duoicon">${characterArt(t,true)}</span><small>${esc(guestProfile.name)}</small>${teamTag(guestProfile.team)}</div></div><div class="relation"><h2>${esc(r.title)}</h2><p>${esc(r.line)}</p><div class="chips"><span class="chip">${esc(h.type.name)}</span><span class="chip">${esc(t.name)}</span></div></div></article><div class="actions"><button class="primary" onclick="makeOwnFromGuest()">이번엔 내 지도 만들고 친구 초대하기 ↗</button><p class="invitehint">방금 나온 ${esc(t.name)} 결과 그대로 가져가요.<br>설문을 다시 풀 필요 없어요.</p><button class="secondary" onclick="returnHost()">친구 지도에 채워진 내 자리 보기</button><button class="secondary" onclick="result()">내 캐릭터 결과 다시 보기</button></div><div class="note">체험 참여라 새로고침하면 초기화돼요. 실제 친구 지도 저장은 출시 구현 단계에서 연결해요.</div></section>`)}
function makeOwnFromGuest(){nickname=guestProfile.name;ownerTeam=guestProfile.team;friends=[];inviteHost=null;board()}
function returnHost(){if(!hostSnapshot){board();return}current=hostSnapshot.type;nickname=hostSnapshot.nickname;ownerTeam=hostSnapshot.team;friends=hostSnapshot.friends.map(f=>({...f}));answers=[...hostSnapshot.answers];inviteHost=null;hostSnapshot=null;guestProfile=null;board()}

const PAIRS={AC:['트레이드 청문회','한 명의 보강안이 다른 한 명의 절교 사유.'],BC:['우리 애 매물등록 금지','“얘 주고 데려오자”는 말에 읽씹 시작.'],AH:['지표와 서사의 충돌','한 명은 기록을 말하고 한 명은 그날을 기억함.'],AE:['분석실 비상벨','차분히 분석하려는데 옆에서 이미 함성 터짐.'],AD:['기록과 추억의 협상','숫자 한 줄과 함께한 몇 년이 맞붙는 중.'],AG:['탈덕 보고서 반려','안 본다는 말에 기록 첨부해서 다시 불러옴.'],AF:['분석실 현장 출동','집에서 볼 기록을 굳이 구장까지 들고 감.'],AB:['영입 제안 검토 중','장바구니 담는 옆에서 성적표 확인 중.']};
function relation(a,b){const key=[a.id,b.id].sort().join('');if(a.id===b.id)return {title:a.id==='G'?'동반 탈덕 실패':'동종 팬심 발견',line:a.id==='G'?'둘 다 안 본다면서 서로 중계해줌.':'같은 말 하는 친구 둘이면 단톡은 연장전.'};const p=PAIRS[key];return p?{title:p[0],line:p[1]}:{title:'이 조합은 원고 준비 중',line:'두 캐릭터의 전용 관계 문구를 다음 시안에서 채울 예정이에요.'}}
function demoFriends(count=3){if(![0,3,10,20,30].includes(count))return;boardView='map';mapSelected=-1;const ids=['A','C','G'].filter(x=>x!==current.id);if(ids.length<3)ids.push('H');const names=['야구친구 하나','우리애 지킴이','내일선발 누구'];friends=Array.from({length:count},(_,i)=>({id:i<3?ids[i]:DATA.types[(i-3)%8].id,name:i<3?names[i]:['승요기원','표구함','내년엔우승','잠깐기록좀','우리애지켜','오늘도직관','안본다며','엔딩재탕'][(i-3)%8]+String(i+1),team:i<3?['LG','SSG','LOTTE'][i]:TEAMS[(i-3)%10][0],example:true}));board();toast('체험 친구 '+count+'명 구성이야. 실제 참여자는 아니에요.');}
function showRelationAt(index){const f=friends[index];if(!f)return;showRelation(f.id,f)}
function showRelation(id,friend){const t=DATA.types.find(x=>x.id===id),f=friend||{name:'예시 친구',team:'NONE'},r=relation(current,t);go(`<section class="center"><button class="back" onclick="board()">← 내 야구판</button><div class="note">친구 관계 화면 체험 · 실제 참여·공유 결과가 아니에요.</div><article class="result"><div class="resulthead"><span class="ticket">야구 얘기만 하면 왜 이러냐면</span></div><div class="duo"><div class="duoperson"><span class="charicon duoicon">${characterArt(current,true)}</span><small>${esc(nickname)}</small>${teamTag(ownerTeam)}</div><span>×</span><div class="duoperson"><span class="charicon duoicon">${characterArt(t,true)}</span><small>${esc(f.name)}</small>${teamTag(f.team)}</div></div><div class="relation"><h2>${esc(r.title)}</h2><p>${esc(r.line)}</p><div class="chips"><span class="chip">${esc(current.name)}</span><span class="chip">${esc(t.name)}</span></div></div><div class="resultfoot">친구가 한 명만 들어와도 우리 관계는 완성.</div></article><div class="actions"><button class="primary" onclick="board()">지도에서 다른 친구도 보기 ↗</button></div></section>`)}

function retentionInfo(){const before=lastScreen;go(`<section class="center"><button class="back" onclick="${before==='board'?'board()':before==='result'?'result()':'home()'}">← 돌아가기</button><div class="boardhead"><div class="eyebrow">내 야구판은 일회용이 아니니까</div><h2>친구는 계속 모으고,<br><mark>지도는 오래 보관해.</mark></h2></div><div class="note">출시 정책안이에요. 현재 시안에는 DB 저장·로그인 기능이 연결되지 않아 새로고침하면 초기화돼요.</div><article class="form"><h3>지도와 친구 관계 · 180일</h3><p class="small">주인이 내 지도 관리 화면에 방문하거나 새 친구가 참여하면 보관 기간을 다시 계산할 예정이에요. 공개 링크를 보기만 하는 방문으로는 연장되지 않아요.</p><br><h3>내 지도를 다시 찾으려면?</h3><p class="small">처음에는 로그인 없이 만들고, 나중에 로그인으로 내 지도 관리권을 연결하는 방식이에요. 쿠키 삭제·기기 변경에 대비한 기능으로 출시 전에 구현해요. 로그인해도 무기한 보관되는 건 아니에요.</p><br><h3>답변은 필요한 만큼만</h3><p class="small">미완료 답변은 최대 24시간. 완료하면 캐릭터 결과만 남기고 문항별 답변은 삭제할 예정이에요.</p><br><h3>원하면 내 정보 삭제</h3><p class="small">지도 주인은 자기 지도를, 친구는 자기 참여를 삭제할 수 있도록 만들어요. 공개 초대 링크만으로 다른 사람의 지도를 수정·삭제할 수는 없어요.</p></article><p class="small">정식 버전에서는 내 지도 관리 화면에 보관 종료 예정일을 표시해요. 실제 보관·삭제 기준은 서비스 공개 전에 확정해 안내해요.</p></section>`)}
function gallery(){go(`<section class="center"><button class="back" onclick="home()">← 처음으로</button><div class="eyebrow">팬심은 여덟 가지 모습</div><h2 class="galleryhead">이거 너잖아.<br>아니면 그 친구.</h2><div class="typegrid">${DATA.types.map(t=>`<button class="typepick" onclick="current=DATA.types.find(x=>x.id==='${t.id}');result()"><div class="galleryart">${characterArt(t)}</div><b>${esc(t.name)}</b><p>${esc(t.tag)}</p></button>`).join('')}</div><p class="small">캐릭터 구경용 결과는 테스트를 풀어 나온 판정과 별개예요.</p></section>`)}
async function copyText(id,kind){const t=DATA.types.find(x=>x.id===id);const value=kind==='invite'?`이건 나고, 저건 너다 ㅋㅋ 우리 단톡 문제의 조합 확인하러 와.\n5문항 풀고 ${nickname}의 지도에 합류해봐. 네 캐릭터랑 우리 관계가 바로 나옴.\n네 결과로 네 지도도 만들 수 있어. 설문은 한 번만!\n(화면 체험용 시안: 실제 초대 링크 미연결)`:`내 야구팬 실체 들킴 ㅋㅋ\n내 캐릭터는 ${t.name} ${t.icon}\n${t.line}\n직관메이트 × 팩트페페`;try{await navigator.clipboard.writeText(value);toast(kind==='invite'?'초대 문구 복사! 실제 링크는 다음 단계에 연결돼요.':'결과 문구 복사했어 ㅋㅋ')}catch{window.prompt('아래 문구를 복사해 주세요.',value)}}
// Real beta adapter. Preview data never enters the persistence APIs.
const preview={home,board,createForm,invitePanel,friendJoined,choose,retentionInfo,gallery};
let activeBoard=null,recoveryCode='',recoveryBoardId='',productionBusy=false,showDemo=false;
const liveOrigin=location.origin;
async function api(path,body){const response=await fetch('/api/fan/boards'+path,{method:body?'POST':'GET',headers:body?{'Content-Type':'application/json'}:{},body:body?JSON.stringify(body):undefined,credentials:'same-origin',cache:'no-store'});const data=await response.json();if(!response.ok)throw Error(data.error||'연결을 확인해주세요.');return data;}
function safeLocal(key,value){try{if(value===undefined)return localStorage.getItem(key);if(value===null)localStorage.removeItem(key);else localStorage.setItem(key,value)}catch{}return null}
function loadLive(b){activeBoard=b;current=DATA.types.find(t=>t.id===b.owner.type);nickname=b.owner.name;ownerTeam=b.owner.team;friends=b.friends.map(f=>({id:f.type,name:f.name,team:f.team,serverId:f.id,example:false}));mapSelected=-1;boardView='map';inviteHost=null;guestProfile=null;showDemo=false;}
function urlFor(id,view=''){const u=new URL('/play',liveOrigin);u.searchParams.set('map',id);if(view)u.searchParams.set('view',view);return u.href}
function rememberBoard(b){safeLocal('fm_board',b.id)}
function navigateBoard(){if(activeBoard)history.replaceState(null,'',urlFor(activeBoard.id,'map'))}
home=function(scene=0){showDemo=false;preview.home(scene);const note=app.querySelector('.note');if(note)note.textContent='웹 베타 · 친구의 별명·응원팀·팬 유형이 초대 링크를 가진 사람에게 공개돼요. 지도는 마지막 활동 후 180일 보관해요.';const buttons=app.querySelectorAll('button');for(const b of buttons){if(b.textContent.includes('퀴즈 없이 지도 구경'))b.textContent='가상 친구 10명 · 20명 · 30명 지도 체험 ↗'}const intro=app.querySelector('.intro');if(intro)intro.insertAdjacentHTML('beforeend','<button class="secondary" onclick="myMap()">만들어 둔 내 지도 찾기 ↗</button>');history.replaceState(null,'','/play');};
openMapDemo=function(n=10){showDemo=true;activeBoard=null;current=current||DATA.types.find(t=>t.id==='F');nickname=nickname||'으쓱이';ownerTeam=ownerTeam||'SSG';demoFriends(n)};
const previewBoard=preview.board;
board=function(){if(showDemo){previewBoard();const note=app.querySelector('.note');if(note)note.textContent='가상 친구로 보는 지도 체험이에요. 실제 저장 지도와 분리돼요.';return}if(!activeBoard){createForm();return}previewBoard();const controls=app.querySelector('.democontrols');if(controls)controls.remove();const actions=app.querySelector('.actions');if(actions)actions.innerHTML=`${activeBoard.isOwner?'<button class="primary" onclick="invitePanel()">떠오른 그 친구, 이 지도에 부르기 ↗</button>':'<button class="primary" onclick="joinExisting()">나도 이 지도에 참여하기 ↗</button>'}<button class="secondary" onclick="refreshMap()">새로 들어온 친구 확인 ↻</button><button class="secondary" onclick="shareMap()">이 지도 공유하기 ↗</button><button class="secondary" onclick="retentionInfo()">지도 보관·복구·삭제 안내</button>${activeBoard.isOwner?'<button class="secondary" onclick="recoveryInfo()">내 지도 복구 코드 안내</button>':''}${activeBoard.myFriendId?'<button class="secondary" onclick="leaveMap()">이 지도에서 내 참여 삭제</button>':''}${activeBoard.isOwner?'<button class="secondary" onclick="deleteMap()">내 지도 삭제</button>':''}`;const note=app.querySelector('.note');if(note)note.innerHTML=`링크를 가진 사람은 이 지도를 볼 수 있어요. 보관 종료 예정: ${new Date(activeBoard.expiresAt).toLocaleDateString('ko-KR')}.<br>캐릭터는 팬 놀이 결과예요. 실제 성격이나 친구 사이를 판정하지 않아요.`;navigateBoard();};
createForm=function(){preview.createForm();const small=app.querySelectorAll('.form .small');if(small[1])small[1].remove();const form=app.querySelector('.form');if(form){const b=form.querySelector('.primary');b.insertAdjacentHTML('beforebegin','<label style="display:flex;gap:10px;align-items:flex-start;margin:18px 0;font-size:13px;line-height:1.6"><input type="checkbox" id="public-consent" style="width:20px;min-height:20px;margin:3px 0;flex-shrink:0">별명·응원팀·팬 유형이 링크를 가진 사람에게 공개되는 것에 동의해요. 답변 원문은 저장하지 않으며 지도는 마지막 활동 후 180일 보관해요.</label>')} };
createBoard=async function(){if(productionBusy)return;const name=document.getElementById('nick')?.value.trim(),team=document.getElementById('team')?.value,consent=document.getElementById('public-consent')?.checked;if(!name||!team||!consent){toast('별명·응원팀과 공개 동의를 확인해줘.');return}productionBusy=true;const button=app.querySelector('.form .primary');if(button){button.disabled=true;button.textContent='지도에 자리 만드는 중…'}try{if(inviteHost){const data=await api('/'+inviteHost.id,{op:'join',name,team,consent,answers});hostSnapshot={...inviteHost,friends:data.board.friends};guestProfile=data.board.friends.find(f=>f.id===data.board.myFriendId);if(!guestProfile)throw Error('참여 결과를 확인하지 못했어요.');guestProfile={...guestProfile,id:guestProfile.type,serverId:guestProfile.id};current=DATA.types.find(t=>t.id===guestProfile.type);activeBoard=data.board;answers=[];friendJoined();}else {const data=await api('',{name,team,consent,...(guestProfile&&hostSnapshot?{sourceBoardId:hostSnapshot.id}:{answers})});answers=[];recoveryCode=data.recovery;recoveryBoardId=data.board.id;loadLive(data.board);rememberBoard(data.board);board();recoveryInfo(true);}}catch(e){toast(e.message||'저장하지 못했어요.');if(button){button.disabled=false;button.textContent='다시 저장하기 ↗'}}finally{productionBusy=false}};
invitePanel=function(){if(showDemo){toast('가상 체험 지도에서는 실제 초대를 만들지 않아요. 퀴즈를 풀고 내 지도를 만들어줘.');return}if(!activeBoard)return;go(`<section class="center"><button class="back" onclick="board()">← 내 지도</button><div class="boardhead"><div class="eyebrow">이건 나고, 저건 무조건 너다 ㅋㅋ</div><h2>우리 단톡 문제의 조합,<br><mark>이제 같이 들켜보자.</mark></h2></div>${inviteSteps()}<div class="invitepreview"><h3>${esc(nickname)}의 야구판에 초대!</h3><p>친구가 5문항을 풀고 참여하면 내 지도에 캐릭터가 나타나요. 친구도 같은 결과로 자기 지도를 만들 수 있어요.</p></div><div class="actions"><button class="primary" onclick="shareMap()">친구에게 초대 링크 보내기 ↗</button><button class="secondary" onclick="copyInvite()">초대 문구·링크 복사</button></div><p class="small">내 별명·응원팀·유형은 링크를 가진 사람에게 공개돼요. 복구 코드는 공유하지 마세요.</p></section>`)};
async function shareOrCopy(text,url){try{if(navigator.share){await navigator.share({title:'직관메이트 · 우리 단톡 문제의 조합',text,url});return}await navigator.clipboard.writeText(text+'\n'+url);toast('초대 링크 복사했어 ㅋㅋ')}catch(e){if(e.name!=='AbortError')window.prompt('이 링크를 복사해서 친구에게 보내줘.',url)}}
async function shareMap(){if(!activeBoard)return;await shareOrCopy(`이건 나고, 저건 너다 ㅋㅋ ${nickname}의 지도에 들어와봐. 5문항 풀면 우리 야구 조합 나옴!`,urlFor(activeBoard.id));}
async function copyInvite(){if(!activeBoard)return;const text=`이건 나고, 저건 너다 ㅋㅋ\n${nickname}의 야구판에 들어와봐. 5문항 풀면 우리 조합 나옴!\n${urlFor(activeBoard.id)}`;try{await navigator.clipboard.writeText(text);toast('초대 문구·링크 복사했어.')}catch{window.prompt('복사해서 친구에게 보내줘.',text)}}
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
inviteLanding=function(){previewLanding();const note=app.querySelector('.note');if(note)note.textContent='결과를 먼저 보고, 별명·응원팀 공개에 동의하면 친구 지도에 참여해요. 답변 원문은 저장하지 않아요.';const back=app.querySelector('.back');if(back){back.textContent='← 친구 지도 먼저 보기';back.onclick=()=>{loadLive(activeBoard);board()}}};
friendJoined=function(){preview.friendJoined();const banner=app.querySelector('.joinedbanner');if(banner)banner.innerHTML=`<b>${esc(hostSnapshot.nickname)}님 지도에 내 자리가 생겼어!</b><br>참여 완료 · 두 사람의 야구 조합은?`;const note=app.querySelector('.note');if(note)note.innerHTML='친구 지도에 참여가 저장됐어요. 내 참여는 같은 브라우저에서 삭제할 수 있어요.';const second=app.querySelectorAll('.actions .secondary');if(second[0])second[0].onclick=()=>{loadLive(activeBoard);board()};};
makeOwnFromGuest=function(){nickname=guestProfile.name;ownerTeam=guestProfile.team;inviteHost=null;createForm();};
retentionInfo=function(){go(`<section class="center"><button class="back" onclick="${activeBoard?'board()':'home()'}">← 돌아가기</button><div class="boardhead"><h2>내 야구판<br>보관·공개 안내</h2></div><div class="form"><h3>링크를 가진 사람에게 보여요</h3><p class="small">별명·응원팀·팬 유형과 친구 참여가 공개돼요. 실명·연락처 등 개인 식별 정보는 별명에 넣지 마세요.</p><br><h3>마지막 활동 후 180일</h3><p class="small">주인이 ‘내 지도’로 관리 화면에 들어오거나 새 친구가 실제 참여하면 연장돼요. 공개 링크 열람만으로는 연장되지 않아요. 종료되면 저장소에서 자동 만료돼요.</p><br><h3>답변 원문은 저장하지 않아요</h3><p class="small">서버에서 결과를 계산하고 팬 유형·계산 버전·완료 시각을 보관해요. 관리와 중복 참여 확인을 위해 브라우저 관리 쿠키의 해시를 저장해요. 속도 제한용 요청 식별 해시는 최대 2분 보관돼요.</p><br><h3>복구·삭제</h3><p class="small">지도 ID와 비공개 복구 코드로 기기를 옮길 수 있어요. 로그인 연결은 아직 없어요. 주인은 지도 전체, 참여자는 자기 참여를 삭제할 수 있어요. 쿠키와 복구 코드를 모두 잃으면 관리 권한을 되찾을 수 없어요.</p><br><h3>웹 베타</h3><p class="small">서비스 제공 목적 이외의 광고·마케팅 용도로 사용하지 않아요. 서버 장애 시 저장·접근이 잠시 중단될 수 있어요. 구단 공식 서비스가 아닌 팬 놀이예요.</p></div><p class="small">운영: 팩트페페 · 문의: X @factpepe_ · 시행 2026-11-10</p></section>`)};
// Fill every unordered pairing (8 same-type + 28 cross-type) for beta.
Object.assign(PAIRS,{BD:['장바구니 압수수색','데려오자는 사람과 절대 못 보낸다는 사람의 협상.'],BE:['분노의 영입 버튼','한 번 실점할 때마다 장바구니에 한 명씩 추가됨.'],BF:['영입 발표 직관조','한 명이 선수 찾아오면 한 명이 데뷔전 표 찾아옴.'],BG:['탈덕 중 영입 회의','야구 안 본다는 사람이 영입 후보는 제일 빨리 보냄.'],BH:['입단 전 다큐 제작','아직 안 왔는데 벌써 우리 팀 서사에 편입됨.'],CD:['가족회의 소집','한 명은 신인 보호, 한 명은 오래 뛴 선수 보호. 팔 사람이 없음.'],CE:['우리 애 응원 비상벨','신인 한 타석에 보호자와 확성기 동시 출동.'],CF:['우리 애 현장 보호','한 명은 기회를 달라 하고 한 명은 구장에서 응원함.'],CG:['양육권은 포기 못 함','팀은 안 본다면서 우리 애 소식은 매일 확인함.'],CH:['성장 다큐 1화','첫 안타 하나로 시즌 분량 서사가 시작됨.'],DE:['간판 수호 확성기','우리 선수 이름만 나오면 목소리부터 커지는 조합.'],DF:['그 유니폼 또 출석','오래된 유니폼과 새 직관 티켓이 만났다.'],DG:['탈덕 불가 계약','떠난다는 말은 하는데 함께한 계절이 너무 많음.'],DH:['추억 재방송 편성','그때 그 경기 얘기하다 오늘 약속 시간이 끝남.'],EF:['현장 음량 주의','한 명이 소리 지르면 한 명이 구장에서 받아줌.'],EG:['탈덕 선언 생중계','안 본다와 제발이 같은 타석에서 동시에 나옴.'],EH:['감정선 연장전','한 명은 지금 울고 한 명은 편집 영상 보고 또 운다.'],FG:['안 본다며 예매 완료','탈덕 선언한 친구 자리까지 이미 잡아둠.'],FH:['직관 엔딩 크레딧','한 명이 데려가고 한 명이 그날을 평생 기억함.'],GH:['탈덕 실패 재방송','안 본다더니 추억 영상 링크를 서로 보내는 중.']});
async function boot(){const q=new URLSearchParams(location.search);const id=q.get('map'),type=q.get('result');if(id){go('<section class="center"><h2>야구 친구들 불러오는 중…</h2></section>');try{const data=await api('/'+encodeURIComponent(id));loadLive(data.board);if(q.get('view')==='map'||data.board.isOwner||data.board.myFriendId)board();else await joinExisting();}catch(e){go(`<section class="center"><h2>지도를 열지 못했어.</h2><p class="sub">${esc(e.message)}</p><button class="primary" onclick="location.reload()">다시 불러오기</button><button class="secondary" onclick="home()">내 야구팬 캐릭터 찾기</button></section>`)}return}if(type&&DATA.types.some(t=>t.id===type)){current=DATA.types.find(t=>t.id===type);result();const back=app.querySelector('.back');if(back){back.textContent='이 캐릭터가 나일까? 검사하기';back.onclick=start}const primary=app.querySelector('.actions .primary');if(primary){primary.textContent='나는 어떤 유형인지 검사하기 ↗';primary.onclick=start}return}home();}
boot();
