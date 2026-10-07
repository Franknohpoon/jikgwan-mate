import { describe, expect, it } from 'vitest';
import { handleTeamCommand, parseTeam, readSkillRequest, type TeamStore } from './kakaoProfile';
import type { TeamCode } from './teams';

function memoryStore(): TeamStore {
  const data = new Map<string, TeamCode>();
  return {
    async get(id) { return data.get(id) ?? null; },
    async set(id, team) { data.set(id, team); },
    async delete(id) { data.delete(id); },
  };
}
describe('Kakao team profiles', () => {
  it('registers, changes, reads and deletes only the caller profile', async () => {
    const store = memoryStore();
    await handleTeamCommand('a', '내 팀 SSG', store);
    await handleTeamCommand('b', '응원팀 롯데', store);
    expect(JSON.stringify(await handleTeamCommand('a', '내 팀', store))).toContain('SSG');
    await handleTeamCommand('a', '내 팀 변경 기아', store);
    expect(await store.get('a')).toBe('KIA');
    await handleTeamCommand('a', '내 팀 삭제', store);
    expect(await store.get('a')).toBeNull();
    expect(await store.get('b')).toBe('롯데');
  });
  it('does not replace a valid team with invalid input', async () => {
    const store = memoryStore();
    await handleTeamCommand('a', '내 팀 쓱', store);
    await handleTeamCommand('a', '내 팀 없는팀', store);
    expect(await store.get('a')).toBe('SSG');
    expect(parseTeam('lg')).toBe('LG');
  });
  it('requires bot-scoped caller identity, never nickname or params', () => {
    expect(readSkillRequest({ userRequest: { utterance: '내 팀', user: { id: 'nickname' } } })).toBeNull();
    expect(readSkillRequest({ userRequest: { utterance: '내 팀', user: { properties: { botUserKey: 'a' } } } })).toEqual({ userId: 'a', utterance: '내 팀' });
    expect(readSkillRequest(null)).toBeNull();
  });
});
