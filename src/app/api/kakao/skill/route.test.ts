import { afterEach, describe, expect, it, vi } from 'vitest';
vi.mock('../../../../lib/kakaoStore', () => ({ createTeamStore: vi.fn() }));
import { createTeamStore } from '../../../../lib/kakaoStore';
import { POST } from './route';

const secret = 'test-only-secret-with-at-least-32-characters';
function request(key = secret, body: unknown = { userRequest: { utterance: '내 팀 SSG', user: { properties: { botUserKey: 'a' } } } }) {
  return new Request(`https://example.test/api/kakao/skill?key=${key}`, { method: 'POST', body: JSON.stringify(body) });
}
afterEach(() => { vi.unstubAllEnvs(); vi.clearAllMocks(); });
describe('Kakao skill boundary', () => {
  it('fails closed when auth is missing or wrong without accessing storage', async () => {
    expect((await POST(request())).status).toBe(503);
    vi.stubEnv('KAKAO_SKILL_SECRET', secret);
    expect((await POST(request('wrong'))).status).toBe(401);
    expect(createTeamStore).not.toHaveBeenCalled();
  });
  it('rejects malformed identity and JSON before storage', async () => {
    vi.stubEnv('KAKAO_SKILL_SECRET', secret);
    expect((await POST(request(secret, {}))).status).toBe(400);
    expect((await POST(new Request(`https://example.test/?key=${secret}`, { method: 'POST', body: '{' }))).status).toBe(400);
    expect(createTeamStore).not.toHaveBeenCalled();
  });
  it('returns a skill response and uses the caller ID for writes', async () => {
    vi.stubEnv('KAKAO_SKILL_SECRET', secret);
    const set = vi.fn().mockResolvedValue(undefined);
    vi.mocked(createTeamStore).mockReturnValue({ get: vi.fn(), set, delete: vi.fn() });
    const response = await POST(request());
    expect(response.status).toBe(200);
    expect((await response.json()).version).toBe('2.0');
    expect(set).toHaveBeenCalledWith('a', 'SSG');
  });
  it('does not expose storage error details', async () => {
    vi.stubEnv('KAKAO_SKILL_SECRET', secret);
    vi.mocked(createTeamStore).mockImplementation(() => { throw new Error('private-token'); });
    const result = await (await POST(request())).text();
    expect(result).not.toContain('private-token');
    expect(result).toContain('다시 시도');
  });
});
