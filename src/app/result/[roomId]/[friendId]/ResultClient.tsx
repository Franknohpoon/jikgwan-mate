'use client';

import Link from 'next/link';
import RelationshipCard from '@/components/RelationshipCard';
import type { TeamCode, TeamRelationship } from '@/lib/teams';

interface Friend {
  id: string;
  team: TeamCode;
  nickname: string;
}

export default function ResultClient({
  ownerTeam,
  friend,
  relationship,
  roomId,
}: {
  ownerTeam: TeamCode;
  friend: Friend;
  relationship: TeamRelationship;
  roomId: string;
}) {
  const shareUrl = typeof window !== 'undefined'
    ? window.location.href
    : '';

  const handleShare = async () => {
    const text = `${ownerTeam} vs ${friend.team}(${friend.nickname}) 케미지수 ${relationship.chemistry_score}점! ${relationship.role_label}`;
    if (navigator.share) {
      try {
        await navigator.share({ title: '직관메이트 결과', text, url: shareUrl });
      } catch {
        // 사용자 취소
      }
    } else {
      await navigator.clipboard.writeText(`${text}\n${shareUrl}`);
      alert('링크가 복사됐어요!');
    }
  };

  return (
    <div className="flex flex-1 flex-col px-6 py-10 max-w-md mx-auto w-full">
      <div className="text-center space-y-1 mb-4">
        <p className="text-muted text-xs font-bold tracking-wider">직관메이트 결과</p>
        <h1 className="text-xl font-black">
          {friend.nickname}님과 {ownerTeam}의 관계는?
        </h1>
      </div>

      <RelationshipCard ownerTeam={ownerTeam} friend={friend} relationship={relationship} />

      <div className="flex flex-col gap-2 pt-4">
        <button
          onClick={handleShare}
          className="w-full rounded-2xl py-3.5 font-black text-white text-center transition-all"
          style={{ background: 'var(--accent-gold)' }}
        >
          이 결과 공유하기 📤
        </button>
        <Link
          href="/create"
          className="w-full rounded-2xl py-3.5 font-black text-white text-center transition-all"
          style={{ background: 'var(--accent-red)' }}
        >
          너도 네 지도 만들어봐 🐸
        </Link>
        <Link
          href={`/map/${roomId}`}
          className="w-full rounded-2xl py-3.5 font-black text-center border border-border"
          style={{ background: 'var(--surface)' }}
        >
          지도 전체 보기
        </Link>
      </div>
    </div>
  );
}
