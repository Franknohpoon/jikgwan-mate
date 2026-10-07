import { getTeamRelationship, isSameTeamError, type SeasonData, type TeamCode } from './teams';
import { textResponse, type TeamStore } from './kakaoProfile';

const mascots: Record<TeamCode, string> = {
  SSG: '으쓱이', 두산: '철웅이', LG: '엘린이', 키움: '턱돌이', KT: '빅또리',
  한화: '수리', KIA: '호걸이', 삼성: '블레오', 롯데: '갈매기', NC: '단디&쎄리',
};

// targetId must come from a verified platform mention, never a typed nickname.
export async function handleChemistry(callerId: string, targetId: string, store: TeamStore,
  readSeason: () => Promise<SeasonData | null>) {
  if (callerId === targetId) return textResponse('친구 한 명을 지목해 주세요. 나 자신과의 케미는 다음 기회에!');
  const [mine, friend] = await Promise.all([store.get(callerId), store.get(targetId)]);
  if (!mine) return textResponse('먼저 내 응원팀을 등록해 주세요.\n@직관메이트 내 팀 SSG');
  if (!friend) return textResponse('지목한 친구가 아직 응원팀을 등록하지 않았어요.\n친구도 “@직관메이트 내 팀 롯데”처럼 등록해 주세요.');
  if (mine === friend) return textResponse(`⚾ ${mine} × ${friend}\n케미 지수: 95점\n🤝 ${mascots[mine]} 전우 — 같은 팀 동맹\n이겨도 함께, 져도 함께! 오늘도 같은 편.\n\n케미는 사이좋은 정도보다 야구 서사의 진함을 뜻해요.`);
  let result = getTeamRelationship(mine, friend);
  let season: SeasonData | null = null;
  if (!isSameTeamError(result) && result.type === 'dynamic_pending') {
    try { season = await readSeason(); } catch { /* Fixed results remain available without season storage. */ }
    result = getTeamRelationship(mine, friend, season);
  }
  if (isSameTeamError(result) || result.type === 'dynamic_pending') {
    return textResponse(`⚾ ${mine} × ${friend}\n이 조합의 시즌 데이터가 아직 준비되지 않았어요. 케미 점수는 데이터 갱신 후 확인해 주세요.`);
  }
  const basis = result.type === 'dynamic' && season
    ? `\n기준: 순위 ${season.standings.updatedAt} / 상대전적 ${season.headToHead.updatedAt}` : '';
  return textResponse(`⚾ ${mine} × ${friend}\n케미 지수: ${result.chemistry_score}점\n“${result.role_label}” — ${result.name}\n${result.description}${basis}\n\n케미는 사이좋은 정도보다 야구 서사의 진함을 뜻해요.`);
}

// Explicit diagnostic command only. Emit schema, not values, IDs, names or utterances.
export function mentionSchema(body: unknown): string {
  const lines: string[] = [];
  function walk(value: unknown, path: string, depth: number) {
    if (depth > 6 || lines.length >= 35) return;
    if (Array.isArray(value)) {
      lines.push(`${path}: array(${value.length})`);
      if (value.length) walk(value[0], `${path}[]`, depth + 1);
    } else if (value && typeof value === 'object') {
      for (const [key, child] of Object.entries(value).slice(0, 25)) {
        const safeKey = /^[A-Za-z_][A-Za-z0-9_]{0,39}$/.test(key) ? key : '[key]';
        walk(child, path ? `${path}.${safeKey}` : safeKey, depth + 1);
      }
    } else lines.push(`${path}: ${value === null ? 'null' : typeof value}`);
  }
  const root = body && typeof body === 'object' ? body as Record<string, unknown> : {};
  // User metadata/utterance are already understood. Inspect other request fields first.
  const userRequest = root.userRequest && typeof root.userRequest === 'object' ? root.userRequest as Record<string, unknown> : {};
  for (const [key, value] of Object.entries(userRequest)) {
    if (!['user', 'utterance', 'block', 'timezone', 'lang'].includes(key)) walk({ [key]: value }, 'userRequest', 0);
  }
  for (const [key, value] of Object.entries(root)) {
    if (!['userRequest', 'bot', 'intent', 'contexts'].includes(key)) walk({ [key]: value }, '', 0);
  }
  return `🔎 멘션 연결 점검\n값은 표시·저장하지 않아요.\n${lines.join('\n') || '추가 필드 없음'}`.slice(0, 1000);
}
