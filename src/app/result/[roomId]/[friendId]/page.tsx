/**
 * 결과 공유 페이지 — 서버 컴포넌트
 *
 * URL: /result/{roomId}/{friendId}
 *
 * 카카오톡/X에서 OG 프리뷰를 터치하면 이 페이지가 열린다.
 * 방 정보 + 시즌 데이터를 불러와 관계를 계산하고, RelationshipCard를 보여줌.
 */

import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getRoom, getSeasonData } from '@/lib/kv';
import { getTeamRelationship, isSameTeamError } from '@/lib/teams';
import ResultClient from './ResultClient';

export async function generateMetadata({ params }: { params: Promise<{ roomId: string; friendId: string }> }) {
  const { roomId, friendId } = await params;

  try {
    const [room, seasonData] = await Promise.all([getRoom(roomId), getSeasonData()]);
    const friend = room.friends.find((f) => f.id === friendId);
    if (!friend) return { title: '직관메이트' };

    const rel = getTeamRelationship(room.ownerTeam, friend.team, seasonData);
    if (isSameTeamError(rel)) return { title: '직관메이트' };

    return {
      title: `${rel.chemistry_score}점! ${rel.role_label} | 직관메이트`,
      description: `${room.ownerTeam} vs ${friend.team} (${friend.nickname}) — ${rel.description}`,
    };
  } catch {
    return { title: '직관메이트' };
  }
}

export default async function ResultPage({ params }: { params: Promise<{ roomId: string; friendId: string }> }) {
  const { roomId, friendId } = await params;

  let room;
  try {
    room = await getRoom(roomId);
  } catch {
    notFound();
  }

  const friend = room.friends.find((f) => f.id === friendId);
  if (!friend) notFound();

  const seasonData = await getSeasonData();
  const relationship = getTeamRelationship(room.ownerTeam, friend.team, seasonData);

  if (isSameTeamError(relationship)) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center px-6 text-center gap-4">
        <p className="text-muted text-sm">같은 팀이에요!</p>
        <Link href="/create" className="text-accent-gold underline text-sm">
          내 지도 만들기
        </Link>
      </div>
    );
  }

  return (
    <ResultClient
      ownerTeam={room.ownerTeam}
      friend={friend}
      relationship={relationship}
      roomId={roomId}
    />
  );
}
