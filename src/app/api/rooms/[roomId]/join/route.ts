import { NextResponse } from 'next/server';
import { TEAMS, type TeamCode } from '@/lib/teams';
import { joinRoom, RoomNotFoundError, RoomFullError } from '@/lib/kv';
import { NICKNAME_MAX_LENGTH } from '@/lib/mapConfig';

function isTeamCode(value: unknown): value is TeamCode {
  return typeof value === 'string' && (TEAMS as readonly string[]).includes(value);
}

export async function POST(request: Request, context: { params: Promise<{ roomId: string }> }) {
  const { roomId } = await context.params;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: '요청 본문이 올바르지 않습니다.' }, { status: 400 });
  }

  const parsed = body as { team?: unknown; nickname?: unknown } | null;
  const team = parsed?.team;
  const nickname = typeof parsed?.nickname === 'string' ? parsed.nickname.trim() : '';

  if (!isTeamCode(team)) {
    return NextResponse.json({ error: '유효한 팀을 선택해주세요.' }, { status: 400 });
  }
  if (!nickname) {
    return NextResponse.json({ error: '닉네임을 입력해주세요.' }, { status: 400 });
  }
  if (nickname.length > NICKNAME_MAX_LENGTH) {
    return NextResponse.json({ error: `닉네임은 ${NICKNAME_MAX_LENGTH}자 이내로 입력해주세요.` }, { status: 400 });
  }

  try {
    const { room, friend } = await joinRoom(roomId, { team, nickname });
    return NextResponse.json({ room, friend });
  } catch (e) {
    if (e instanceof RoomNotFoundError) {
      return NextResponse.json({ error: e.message }, { status: 404 });
    }
    if (e instanceof RoomFullError) {
      return NextResponse.json({ error: e.message }, { status: 409 });
    }
    const message = e instanceof Error ? e.message : '참여에 실패했습니다.';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
