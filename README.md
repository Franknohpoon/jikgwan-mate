# 직관메이트 (jikgwan-mate)

내 응원팀을 고르고 링크를 공유하면, 친구들이 각자 응원팀+닉네임을 등록할 때마다 "나(방장) vs 친구"의 관계가 즉시 내 지도에 쌓이는 서비스 (귀인지도와 동일한 "나 중심 지도" 구조). 팩트페페(@factpepe_) 사이드 프로젝트.

친구끼리의 관계는 계산하지 않습니다 — 항상 방장 1명 vs 친구 1명 쌍만 다룹니다. 최소 인원 대기 로직은 없고, 친구가 등록되는 즉시 지도에 반영됩니다.

factpepe-v3와는 완전히 분리된 저장소·배포로 운영합니다.

## 화면 흐름

`/` → `/create`(방장 팀 선택) → `/map/[roomId]`(공개 지도 — 링크 공유 + 등록된 친구 실시간 반영, 5초 폴링) → `/join/[roomId]`(친구가 팀+닉네임 등록 → 대기 없이 즉시 "방장 vs 나" 관계 확인 → "너도 네 지도 만들어봐" CTA로 `/create` 재진입)

- `/map/[roomId]`는 방장 본인 확인 없는 **공개** 페이지입니다 — 링크만 알면 누구나 열람 가능합니다.
- 등록 인원이 [lib/mapConfig.ts](src/lib/mapConfig.ts)의 `RADIAL_VIEW_MAX`(기본 10명) 이하면 방장을 중심에 둔 방사형 뷰, 초과하면 리스트 뷰로 자동 전환됩니다. 전환 기준·최대 인원(`MAX_FRIENDS`, 기본 100명)은 전부 이 파일의 상수로 조정 가능합니다.

## 로컬 개발

```bash
npm install
npm run dev
```

[http://localhost:3000](http://localhost:3000) 에서 확인.

### 유닛 테스트

`lib/teams.ts`의 KBO 팀 매칭 로직(고정 라이벌 14쌍 + 흥참동 5쌍 + 나머지 26쌍 `dynamic_pending`) 테스트:

```bash
npx vitest run
```

## 수동 설정이 필요한 것 (Claude Code가 대신 할 수 없는 부분)

### 1. Redis(KV) 스토어 연결 — 참여자 데이터 저장에 필수

방(room)과 등록된 친구 목록을 저장하는 데 Upstash Redis(Vercel의 새 KV 스토리지)를 사용합니다.

1. [Vercel 대시보드](https://vercel.com) → 프로젝트 → **Storage** → Redis(Upstash) 스토어 생성 후 프로젝트에 연결
2. 연결하면 아래 두 조합 중 하나가 자동으로 환경변수에 채워집니다(연동 방식에 따라 이름이 다름 — 코드는 둘 다 지원):
   - `KV_REST_API_URL` / `KV_REST_API_TOKEN`
   - `UPSTASH_REDIS_REST_URL` / `UPSTASH_REDIS_REST_TOKEN`
3. 로컬 개발용으로는 `.env.local.example`을 복사해 `.env.local`을 만들고 같은 값을 채워 넣으세요.

이 값이 없으면 방 생성/조회/참여 API가 명확한 에러 메시지를 반환합니다(서버가 죽지는 않음).

### 2. GitHub 저장소 생성 (로컬에 `gh` CLI 없음)

```bash
git add -A
git commit -m "feat: 직관메이트 MVP 초기 셋업"
```

이후 GitHub 웹에서 새 저장소를 만들고 원격을 연결해주세요:

```bash
git remote add origin <새 저장소 URL>
git push -u origin main
```

### 3. Vercel 배포

GitHub 저장소를 Vercel에 Import하면 자동 배포됩니다. 이때 위 1번의 Redis 스토어를 같은 프로젝트에 연결해야 합니다.

### 4. (선택) 카카오톡 공유

카카오 개발자 콘솔에서 앱을 등록하고 JS 키를 발급받아 `NEXT_PUBLIC_KAKAO_JS_KEY`에 채우면 공유 화면에 카카오톡 공유 버튼이 자동으로 나타납니다. 키가 없으면 버튼이 표시되지 않을 뿐 다른 기능에는 영향이 없습니다.

## MVP 범위

- ✅ 방장 팀 선택 → 고유 링크(내 지도) 생성
- ✅ 링크 공유 → 친구가 팀+닉네임 등록 (최소 인원 게이트 없음, 최대 100명)
- ✅ 등록 즉시 "방장 vs 친구" 관계 확인 + 지도(`/map`)에 실시간 반영(5초 폴링)
- ✅ 지도 방사형(≤10명) ↔ 리스트(11명+) 자동 전환, 기준은 `lib/mapConfig.ts` 상수
- ✅ "너도 네 지도 만들어봐" CTA로 연쇄 바이럴 유도
- ✅ 지도 이미지 다운로드
- ⏳ 동적 관계(순위/상대전적 기반) — `lib/teams.ts`의 `getTeamRelationship` 3순위 로직으로 2차 작업 예정, 문구/톤은 별도 논의 후 반영
- ⏳ 카카오톡 공유 — 코드는 있음, 키 발급 후 활성화
- ❌ 로그인/실시간 알림 — MVP 범위 밖
