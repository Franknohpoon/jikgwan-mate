import { NextResponse } from 'next/server';
import { getRoom, RoomNotFoundError } from '@/lib/kv';

export async function GET(_request: Request, context: { params: Promise<{ roomId: string }> }) {
  const { roomId } = await context.params;

  try {
    const room = await getRoom(roomId);
    return NextResponse.json({ room });
  } catch (e) {
    if (e instanceof RoomNotFoundError) {
      return NextResponse.json({ error: e.message }, { status: 404 });
    }
    const message = e instanceof Error ? e.message : '방 조회에 실패했습니다.';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
