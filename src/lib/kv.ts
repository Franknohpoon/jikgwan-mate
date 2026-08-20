/**
 * Room 저장소 — Upstash Redis(=Vercel의 새 KV 스토리지) REST 클라이언트.
 *
 * "나 중심 지도" 모델: 방장(ownerTeam) 한 명 + 친구(friends) 목록. 친구끼리의
 * 관계는 계산하지 않고, 항상 "방장 vs 친구 1명"만 다룬다.
 *
 * Vercel 대시보드에서 KV/Redis 스토어를 프로젝트에 연결하면 아래 두 env var
 * 조합 중 하나가 자동으로 채워진다(연동 방식에 따라 이름이 다를 수 있어
 * 둘 다 지원):
 *   - KV_REST_API_URL / KV_REST_API_TOKEN            (레거시 Vercel KV 연동)
 *   - UPSTASH_REDIS_REST_URL / UPSTASH_REDIS_REST_TOKEN (Upstash 마켓플레이스 연동)
 *
 * 로컬 개발 중 이 값이 없으면 명확한 에러를 던진다 — README의 "수동 설정
 * 단계"를 참고해 .env.local에 채워 넣을 것.
 */

import { Redis } from '@upstash/redis';
import { nanoid } from 'nanoid';
import type { TeamCode } from './teams';
import type { SeasonData } from './dynamicRelationship';
import { MAX_FRIENDS } from './mapConfig';

const ROOM_TTL_SECONDS = 60 * 60 * 24 * 7; // 7일

export interface Friend {
  id: string;
  team: TeamCode;
  nickname: string;
  joinedAt: number;
}

export interface Room {
  id: string;
  ownerTeam: TeamCode;
  friends: Friend[];
  maxFriends: number;
  createdAt: number;
}

let redisClient: Redis | null = null;

function getRedis(): Redis {
  if (redisClient) return redisClient;

  const url = process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!url || !token) {
    throw new Error(
      'Redis(KV) 연결 정보가 없습니다. Vercel 대시보드에서 KV/Redis 스토어를 만들고 ' +
        'KV_REST_API_URL / KV_REST_API_TOKEN (또는 UPSTASH_REDIS_REST_URL / ' +
        'UPSTASH_REDIS_REST_TOKEN)을 .env.local에 설정해주세요. 자세한 안내는 README 참고.'
    );
  }

  redisClient = new Redis({ url, token });
  return redisClient;
}

function roomKey(roomId: string): string {
  return `room:${roomId}`;
}

export class RoomNotFoundError extends Error {
  constructor(roomId: string) {
    super(`방을 찾을 수 없습니다: ${roomId}`);
    this.name = 'RoomNotFoundError';
  }
}

export class RoomFullError extends Error {
  constructor() {
    super(`이미 정원(${MAX_FRIENDS}명)이 가득 찼습니다.`);
    this.name = 'RoomFullError';
  }
}

export async function createRoom(ownerTeam: TeamCode): Promise<Room> {
  const redis = getRedis();
  const room: Room = {
    id: nanoid(8),
    ownerTeam,
    friends: [],
    maxFriends: MAX_FRIENDS,
    createdAt: Date.now(),
  };
  await redis.set(roomKey(room.id), room, { ex: ROOM_TTL_SECONDS });
  return room;
}

export async function getRoom(roomId: string): Promise<Room> {
  const redis = getRedis();
  const room = await redis.get<Room>(roomKey(roomId));
  if (!room) throw new RoomNotFoundError(roomId);
  return room;
}

export async function joinRoom(
  roomId: string,
  input: { team: TeamCode; nickname: string }
): Promise<{ room: Room; friend: Friend }> {
  const redis = getRedis();
  const room = await getRoom(roomId);

  if (room.friends.length >= room.maxFriends) {
    throw new RoomFullError();
  }

  // 중복 참여(동일인이 다른 닉네임으로 여러 번 등록)는 스펙상 허용 — 별도 검증 없음.
  const friend: Friend = { id: nanoid(8), team: input.team, nickname: input.nickname, joinedAt: Date.now() };
  room.friends.push(friend);

  await redis.set(roomKey(room.id), room, { ex: ROOM_TTL_SECONDS });
  return { room, friend };
}

// ─── 시즌 데이터 (순위표 + 상대전적) ─────────────────────────────────
// 순위표는 매일, 상대전적은 주 1회 갱신. 각각 updatedAt을 별도 기록한다.
// TTL 없음 — 시즌이 끝나면 관리자가 새 시즌 데이터로 덮어쓴다.

const SEASON_KEY = 'season:data';

export async function saveSeasonData(data: SeasonData): Promise<void> {
  const redis = getRedis();
  await redis.set(SEASON_KEY, data);
}

export async function getSeasonData(): Promise<SeasonData | null> {
  const redis = getRedis();
  return redis.get<SeasonData>(SEASON_KEY);
}
