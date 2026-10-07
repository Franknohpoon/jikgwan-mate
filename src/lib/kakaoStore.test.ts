import { afterEach, describe, expect, it, vi } from 'vitest';
const calls = vi.hoisted(() => ({ set: vi.fn(), get: vi.fn(), del: vi.fn() }));
vi.mock('@upstash/redis', () => ({ Redis: class { set = calls.set; get = calls.get; del = calls.del; } }));
import { createTeamStore } from './kakaoStore';
afterEach(() => { vi.unstubAllEnvs(); vi.clearAllMocks(); });
describe('Profile storage isolation', () => {
  it('requires an explicit namespace and rejects production writes outside production', () => {
    expect(() => createTeamStore()).toThrow('namespace');
    vi.stubEnv('KAKAO_PROFILE_NAMESPACE', 'production');
    vi.stubEnv('VERCEL_ENV', 'preview');
    expect(() => createTeamStore()).toThrow('Production namespace');
  });
  it('uses separate namespaces and hashed identity without touching web keys', async () => {
    vi.stubEnv('KV_REST_API_URL', 'https://example.test');
    vi.stubEnv('KV_REST_API_TOKEN', 'mock-only');
    vi.stubEnv('KAKAO_PROFILE_NAMESPACE', 'local-test');
    await createTeamStore().set('private-user-id', 'SSG');
    const localKey = calls.set.mock.calls[0][0];
    expect(localKey).toMatch(/^kakao:profiles:local-test:[a-f0-9]{64}$/);
    expect(localKey).not.toContain('private-user-id');
    vi.stubEnv('KAKAO_PROFILE_NAMESPACE', 'preview');
    await createTeamStore().delete('private-user-id');
    expect(calls.del.mock.calls[0][0]).not.toBe(localKey);
  });
});
