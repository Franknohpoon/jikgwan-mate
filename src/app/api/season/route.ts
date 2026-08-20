import { NextResponse } from 'next/server';
import { getSeasonData, saveSeasonData } from '@/lib/kv';
import type { SeasonData } from '@/lib/dynamicRelationship';
import { TEAMS, type TeamCode } from '@/lib/teams';

function isTeamCode(value: unknown): value is TeamCode {
  return typeof value === 'string' && (TEAMS as readonly string[]).includes(value);
}

/** GET /api/season — 현재 시즌 데이터 조회 (공개) */
export async function GET() {
  try {
    const data = await getSeasonData();
    return NextResponse.json({ data });
  } catch (e) {
    const message = e instanceof Error ? e.message : '시즌 데이터를 불러오지 못했습니다.';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

/** POST /api/season — 시즌 데이터 저장 (관리자) */
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: '요청 본문이 올바르지 않습니다.' }, { status: 400 });
  }

  const parsed = body as SeasonData | null;
  if (!parsed?.standings?.entries || !parsed?.headToHead?.entries) {
    return NextResponse.json({ error: 'standings와 headToHead가 필요합니다.' }, { status: 400 });
  }

  // 순위표 검증: 10개 팀, 각각 rank 1-10
  const standings = parsed.standings.entries;
  if (standings.length !== 10) {
    return NextResponse.json({ error: '순위표는 10개 팀이어야 합니다.' }, { status: 400 });
  }
  for (const entry of standings) {
    if (!isTeamCode(entry.team)) {
      return NextResponse.json({ error: `유효하지 않은 팀: ${entry.team}` }, { status: 400 });
    }
    if (!Number.isInteger(entry.rank) || entry.rank < 1 || entry.rank > 10) {
      return NextResponse.json({ error: `${entry.team}의 순위가 유효하지 않습니다: ${entry.rank}` }, { status: 400 });
    }
  }

  // 상대전적 검증
  for (const entry of parsed.headToHead.entries) {
    if (!isTeamCode(entry.teamA) || !isTeamCode(entry.teamB)) {
      return NextResponse.json({ error: `유효하지 않은 팀 조합: ${entry.teamA}-${entry.teamB}` }, { status: 400 });
    }
    if (entry.wins < 0 || entry.draws < 0 || entry.losses < 0) {
      return NextResponse.json({ error: `${entry.teamA}-${entry.teamB} 전적이 유효하지 않습니다.` }, { status: 400 });
    }
  }

  try {
    await saveSeasonData(parsed);
    return NextResponse.json({ ok: true });
  } catch (e) {
    const message = e instanceof Error ? e.message : '저장에 실패했습니다.';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
