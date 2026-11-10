# 직관메이트 웹 베타

Entry `/play` (root redirects), opaque invite `/play?map={id}`, public map `/play?map={id}&view=map`, shareable type `/play?result={A-H}`. Existing team-map and Kakao endpoints are unchanged.

## Editing

- Quiz and score mapping: `src/lib/fan/quiz.json`.
- UI template: `src/lib/fan/source/template.html`.
- Live adapter: `src/lib/fan/source/production.txt`.
- Regenerate: `node scripts/build-fan.mjs`. Commit generated `public/fan/app.js` and `src/lib/fan/shell.ts` with their sources.
- WebP assets are delivery encodings of the approved artwork; original PNGs are used by the OG image route. Fonts are Noto Sans KR, bundled with OFL license. No external font request is needed by the new beta page or OG route.

## Storage and authority

Redis keys `fan:v1:{production|preview}:board:{16-char-id}` are separate from legacy room/Kakao data. Existing JIKGWAN KV variables are preferred. No in-memory fallback in production.

Board contains owner, friends, quiz version, completion/activity/expiry times. Raw question answers are scored server-side and never persisted. Public API responses omit member/session and recovery hashes.

HttpOnly SameSite=Lax cookie holds an unguessable browser identity. The board stores its hash. Public map links grant viewing only. Creation returns a separate private recovery code once; save it privately. Recovery transfers the owner identity. No OAuth/login is implemented in this beta.

Retention: 180 days after creation, a genuine new participation, or authenticated owner touch from “내 지도”. Public GET does not extend retention. Atomic Lua join checks prevent lost concurrent updates, repeat joins and more than 100 friends. Owner can delete the board; participants can leave with their original browser. Recovery and write requests are same-origin and rate limited. IP hashes for request throttling expire after at most 2 minutes.

## Verification

`npm test`, `npx tsc --noEmit`, `npm run build`.
Targeted lint: `npx eslint src/lib/fan src/app/api/fan src/app/play src/app/page.tsx --quiet`.
Full repo lint also reports a pre-existing synchronous state update in `src/app/admin/page.tsx`.

Optional isolated storage integration: install `fakeredis[lua]` in Python, then `python3 scripts/check-fan-storage.py`. It runs actual built Next handlers against local Redis REST/Lua semantics and covers create/read/join/capacity/idempotence/CSRF/authority/recovery/leave/delete. No production credentials or data are used.

## Deployment gate

2026-11-10: linked Upstash resource is **archived due to inactivity** (`uninstalled`), and production legacy read returns HTTP 500 `fetch failed`. Restore/reconnect an active database via Upstash/Vercel before public release. Verify a real create → independent browser join → refresh → delete cycle against that database. Do not treat local emulator checks as hosted storage verification.
