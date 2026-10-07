import { describe, expect, it, vi } from 'vitest';
import { handleChemistry, mentionSchema } from './kakaoChemistry';
import type { TeamStore } from './kakaoProfile';
import type { TeamCode } from './teams';
function store(a: TeamCode | null, b: TeamCode | null): TeamStore {
  return { get: async id => id === 'a' ? a : b, set: vi.fn(), delete: vi.fn() };
}
describe('Kakao chemistry', () => {
  it('uses existing rivalry score and does not read season data for fixed pairs', async () => {
    const season = vi.fn();
    const result = JSON.stringify(await handleChemistry('a', 'b', store('SSG', '롯데'), season));
    expect(result).toContain('84점'); expect(result).toContain('항구 시리즈'); expect(season).not.toHaveBeenCalled();
  });
  it('handles missing registration, same team, self and missing season without invented scores', async () => {
    expect(JSON.stringify(await handleChemistry('a', 'b', store('SSG', null), async () => null))).toContain('친구가 아직');
    expect(JSON.stringify(await handleChemistry('a', 'b', store('SSG', 'SSG'), async () => null))).toContain('95점');
    expect(JSON.stringify(await handleChemistry('a', 'a', store('SSG', 'SSG'), async () => null))).toContain('나 자신');
    const result = JSON.stringify(await handleChemistry('a', 'b', store('한화', 'SSG'), async () => null));
    expect(result).toContain('아직 준비'); expect(result).not.toContain('0점');
  });
  it('diagnostic emits only structure and hides scalar values', () => {
    const output = mentionSchema({ userRequest: { utterance: 'private message', user: { id: 'secret-id' }, mentions: [{ botUserKey: 'private-id', nickname: 'private-name' }] }, action: { params: { target: 'secret' } } });
    expect(output).toContain('mentions: array(1)'); expect(output).toContain('botUserKey: string');
    for (const value of ['private message', 'secret-id', 'private-id', 'private-name', 'secret']) expect(output).not.toContain(value);
  });
});
