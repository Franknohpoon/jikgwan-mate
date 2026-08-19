import { NextResponse } from 'next/server';
import { TEAMS, type TeamCode } from '@/lib/teams';
import { createRoom } from '@/lib/kv';

function isTeamCode(value: unknown): value is TeamCode {
  return typeof value === 'string' && (TEAMS as readonly string[]).includes(value);
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: '요청 본문이 올바르지 않습니다.' }, { status: 400 });
  }

  const team = (body as { team?: unknown } | null)?.team;
  if (!isTeamCode(team)) {
    return NextResponse.json({ error: '유효한 팀을 선택해주세요.' }, { status: 400 });
  }

  try {
    const room = await createRoom(team);
    return NextResponse.json({ roomId: room.id, room }, { status: 201 });
  } catch (e) {
    const message = e instanceof Error ? e.message : '방 생성에 실패했습니다.';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
