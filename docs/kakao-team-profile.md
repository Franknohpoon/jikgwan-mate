# 카카오 응원팀 등록 스킬

현재 단계는 응원팀 등록·조회·변경·삭제입니다. 친구 멘션 케미 계산은 아직 제공하지 않습니다.

## 환경 설정

기존 Redis 환경변수를 그대로 사용합니다. 기존 `room:*`, `season:data`에는 접근하지 않습니다.

- `KAKAO_SKILL_SECRET`: 32자 이상의 무작위 비밀값. NEXT_PUBLIC 변수로 만들지 않습니다.
- `KAKAO_PROFILE_NAMESPACE`: 로컬 `local`, Preview `preview`, Production `production`.
  Production 네임스페이스는 `VERCEL_ENV=production`일 때만 허용합니다.
  여러 개발 환경이 같은 Redis를 쓰면 `local-frank` 등 서로 다른 값을 지정합니다.

응원팀은 `kakao:profiles:<namespace>:<SHA256(botUserKey)>`에 저장합니다.
원본 사용자 ID·닉네임·대화 내용은 저장하지 않습니다. 해시도 사용자 식별자로 취급합니다.
응원팀은 사용자가 변경하거나 `내 팀 삭제`를 입력할 때까지 유지합니다.

## 관리자센터 연결

Vercel 환경변수 설정 및 코드 배포 후 스킬을 생성합니다.

- URL: `https://jikgwan-mate.vercel.app/api/kakao/skill?key=<KAKAO_SKILL_SECRET>`
- URL 전체를 인증정보로 취급합니다. 스크린샷·공유 문서·로그에 노출하지 않습니다.
  플랫폼 접근 로그에도 URL이 남을 수 있으므로 접근을 제한하고 노출 시 값을 교체합니다.
- 응원팀 블록에 `내 팀 SSG`, `내 팀`, `내 팀 변경 롯데`, `내 팀 삭제`,
  `응원팀 등록 한화` 등의 발화를 등록하고 스킬 응답을 연결합니다.
- 팀 이름을 변수로 태깅해 10팀을 받도록 구성합니다. 단톡방에서는 봇을 멘션해 호출합니다.
- 이 API는 `userRequest.utterance`의 명령과
  `userRequest.user.properties.botUserKey`를 사용합니다. 실제 그룹 챗봇 요청에서 필드가
  오는지 테스트합니다. 멘션 문자열이 명령에 포함된다면 실제 페이로드에 맞춰 정규화합니다.
- 사용자 정보/시즌 변경 API에 이 비밀값을 재사용하지 않습니다.

## 검증

`npm test`, `npx tsc --noEmit`, 변경 파일 ESLint를 실행합니다.
자동 테스트는 메모리 저장소 또는 mock만 사용하며 운영 Redis에 연결하지 않습니다.
실제 카톡 검증은 개발/Preview 네임스페이스로 등록→조회→변경→삭제하고,
다른 사용자의 팀이 바뀌지 않는지 확인합니다. 그 후 운영 블록을 연결합니다.

## 다음 단계

친구 멘션 식별, 같은 팀 전우 결과, 기존 케미 함수 연동이 남아 있습니다.
기존 공개 `POST /api/season`의 관리자 인증도 별도로 보완해야 합니다.
