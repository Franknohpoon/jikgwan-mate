import { createHash } from 'node:crypto';
import { Redis } from '@upstash/redis';
import { TEAMS, type TeamCode } from './teams';
import type { TeamStore } from './kakaoProfile';

export function createTeamStore(): TeamStore {
  // Never default local/preview execution to the production namespace.
  const namespace = process.env.KAKAO_PROFILE_NAMESPACE;
  if (!namespace || !/^[a-zA-Z0-9_-]{1,64}$/.test(namespace)) throw new Error('Missing profile namespace');
  if (namespace === 'production' && process.env.VERCEL_ENV !== 'production') throw new Error('Production namespace requires production deployment');
  const url = process.env.JIKGWAN_KV_REST_API_URL ?? process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.JIKGWAN_KV_REST_API_TOKEN ?? process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) throw new Error('Missing Redis configuration');
  const redis = new Redis({ url, token });
  const key = (userId: string) => `kakao:profiles:${namespace}:${createHash('sha256').update(userId).digest('hex')}`;
  return {
    async get(userId) {
      const team = await redis.get<unknown>(key(userId));
      return typeof team === 'string' && (TEAMS as readonly string[]).includes(team) ? team as TeamCode : null;
    },
    async set(userId, team) { await redis.set(key(userId), team); },
    async delete(userId) { await redis.del(key(userId)); },
  };
}
