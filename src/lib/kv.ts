/**
 * Room 저장소 — Upstash Redis(=Vercel의 새 KV 스토리지) REST 클라이언트.
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

const ROOM_TTL_SECONDS = 60 * 60 * 24 * 7; // 7일
export const MIN_PARTICIPANTS = 2;
export const MAX_PARTICIPANTS = 8;

export interface Participant {
  id: string;
  team: TeamCode;
  isHost: boolean;
  joinedAt: number;
}

export interface Room {
  id: string;
  minParticipants: number;
  maxParticipants: number;
  participants: Participant[];
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
    super('이미 정원이 가득 찼습니다.');
    this.name = 'RoomFullError';
  }
}

export async function createRoom(hostTeam: TeamCode): Promise<Room> {
  const redis = getRedis();
  const room: Room = {
    id: nanoid(8),
    minParticipants: MIN_PARTICIPANTS,
    maxParticipants: MAX_PARTICIPANTS,
    participants: [{ id: nanoid(8), team: hostTeam, isHost: true, joinedAt: Date.now() }],
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

export async function joinRoom(roomId: string, team: TeamCode): Promise<Room> {
  const redis = getRedis();
  const room = await getRoom(roomId);

  if (room.participants.length >= room.maxParticipants) {
    throw new RoomFullError();
  }

  const participant: Participant = { id: nanoid(8), team, isHost: false, joinedAt: Date.now() };
  room.participants.push(participant);

  await redis.set(roomKey(room.id), room, { ex: ROOM_TTL_SECONDS });
  return room;
}
