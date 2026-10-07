import { TEAMS, type TeamCode } from './teams';

export interface TeamStore {
  get(userId: string): Promise<TeamCode | null>;
  set(userId: string, team: TeamCode): Promise<void>;
  delete(userId: string): Promise<void>;
}

const aliases: Record<string, TeamCode> = {
  엘지: 'LG', 트윈스: 'LG', 베어스: '두산', 히어로즈: '키움',
  쓱: 'SSG', 랜더스: 'SSG', 케이티: 'KT', 위즈: 'KT',
  이글스: '한화', 기아: 'KIA', 타이거즈: 'KIA', 라이온즈: '삼성',
  자이언츠: '롯데', 엔씨: 'NC', 다이노스: 'NC',
};

export function parseTeam(value: string): TeamCode | null {
  const normalized = value.trim().toUpperCase();
  return TEAMS.find(team => team === normalized) ?? aliases[normalized] ?? null;
}

export function readSkillRequest(body: unknown): { userId: string; utterance: string } | null {
  if (!body || typeof body !== 'object') return null;
  const request = (body as Record<string, unknown>).userRequest;
  if (!request || typeof request !== 'object') return null;
  const { user, utterance } = request as Record<string, unknown>;
  if (typeof utterance !== 'string' || utterance.length > 1000 || !user || typeof user !== 'object') return null;
  const properties = (user as Record<string, unknown>).properties;
  if (!properties || typeof properties !== 'object') return null;
  const userId = (properties as Record<string, unknown>).botUserKey;
  if (typeof userId !== 'string' || !userId.trim() || userId.length > 256) return null;
  return { userId, utterance: utterance.trim() };
}

export function textResponse(text: string) {
  return { version: '2.0', template: { outputs: [{ simpleText: { text } }] } };
}

export async function handleTeamCommand(userId: string, utterance: string, store: TeamStore) {
  const input = utterance.trim();
  if (/^(내\s*팀|응원팀)(\s*(조회|확인))?$/.test(input)) {
    const team = await store.get(userId);
    return textResponse(team ? `⚾ 내 응원팀은 ${team}!\n변경: 내 팀 롯데\n삭제: 내 팀 삭제` : '아직 응원팀이 없어요.\n“내 팀 SSG”처럼 입력해 주세요.');
  }
  if (/^(내\s*팀|응원팀)\s*삭제$/.test(input)) {
    await store.delete(userId);
    return textResponse('응원팀 정보를 삭제했어요. 다시 등록하려면 “내 팀 SSG”처럼 입력해 주세요.');
  }
  const registration = input.match(/^(?:내\s*팀|응원팀)\s+(?:(?:등록|변경)\s+)?(.+)$/);
  if (registration) {
    const team = parseTeam(registration[1]);
    if (!team) return textResponse(`응원팀을 확인해 주세요.\n${TEAMS.join(' · ')}\n예: 내 팀 SSG`);
    await store.set(userId, team);
    return textResponse(`⚾ 응원팀을 ${team}(으)로 저장했어요!\n조회: 내 팀\n변경: 내 팀 롯데\n삭제: 내 팀 삭제\n\n친구 케미 기능은 준비 중이에요.`);
  }
  return textResponse('⚾ 직관메이트 응원팀 등록\n등록·변경: 내 팀 SSG\n조회: 내 팀\n삭제: 내 팀 삭제\n\n친구 멘션 케미 기능은 준비 중이에요.');
}
