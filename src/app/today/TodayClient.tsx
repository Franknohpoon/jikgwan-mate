'use client';

import Link from 'next/link';
import type { TeamCode, TeamRelationship } from '@/lib/teams';
import { teamColor } from '@/lib/teamColors';

interface RankingEntry {
  teamA: TeamCode;
  teamB: TeamCode;
  relationship: TeamRelationship;
}

export default function TodayClient({
  top5,
  updatedAt,
}: {
  top5: RankingEntry[];
  updatedAt: string;
}) {
  const handleShare = async () => {
    const text = top5.length > 0
      ? `오늘 KBO 최고 앙숙은? ${top5[0].teamA} vs ${top5[0].teamB} (케미 ${top5[0].relationship.chemistry_score}점!) 🔥`
      : '오늘의 KBO 핫매치업을 확인하세요!';
    const url = typeof window !== 'undefined' ? window.location.href : '';

    if (navigator.share) {
      try {
        await navigator.share({ title: '오늘의 KBO 핫매치업', text, url });
      } catch {
        // 사용자 취소
      }
    } else {
      await navigator.clipboard.writeText(`${text}\n${url}`);
      alert('링크가 복사됐어요!');
    }
  };

  return (
    <div className="flex flex-1 flex-col px-6 py-10 max-w-md mx-auto w-full">
      {/* 헤더 */}
      <div className="text-center space-y-1 mb-6">
        <p className="text-muted text-xs font-bold tracking-wider">FACTPEPE · 직관메이트</p>
        <h1 className="text-2xl font-black">오늘의 KBO 핫매치업 🔥</h1>
        <p className="text-muted text-xs">{updatedAt} 기준 · 동적 매치업 TOP5</p>
      </div>

      {/* TOP5 카드 */}
      <div className="space-y-3">
        {top5.map((entry, idx) => (
          <div
            key={`${entry.teamA}-${entry.teamB}`}
            className="rounded-2xl border p-4"
            style={{
              borderColor: idx === 0 ? 'var(--accent-gold)' : 'var(--border)',
              background: 'var(--surface)',
            }}
          >
            {/* 순위 + VS */}
            <div className="flex items-center gap-3 mb-2">
              <span
                className="flex items-center justify-center w-8 h-8 rounded-full text-sm font-black shrink-0"
                style={{
                  background: idx === 0 ? 'var(--accent-gold)' : 'var(--surface-2)',
                  color: idx === 0 ? '#0b0b12' : 'var(--text-muted)',
                }}
              >
                {idx + 1}
              </span>
              <div className="flex items-center gap-2 flex-1 min-w-0">
                <span className="font-black text-sm" style={{ color: teamColor(entry.teamA) }}>
                  {entry.teamA}
                </span>
                <span className="text-muted text-xs">vs</span>
                <span className="font-black text-sm" style={{ color: teamColor(entry.teamB) }}>
                  {entry.teamB}
                </span>
              </div>
              <span
                className="text-xs font-bold px-2 py-0.5 rounded-full shrink-0"
                style={{
                  background:
                    entry.relationship.chemistry_score >= 75
                      ? 'var(--accent-red)'
                      : 'var(--accent-gold)',
                  color: '#000',
                }}
              >
                케미 {entry.relationship.chemistry_score}
              </span>
            </div>

            {/* 라벨 + 설명 */}
            <p className="font-bold text-[15px] mb-0.5">{entry.relationship.name}</p>
            <p className="text-[13px] text-muted leading-relaxed">{entry.relationship.description}</p>

            {/* 태그 */}
            {entry.relationship.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 pt-1.5">
                {entry.relationship.tags.map((tag) => (
                  <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-surface-2 text-muted">
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="flex flex-col gap-2 pt-6">
        <button
          onClick={handleShare}
          className="w-full rounded-2xl py-3.5 font-black text-white text-center transition-all"
          style={{ background: 'var(--accent-gold)' }}
        >
          핫매치업 공유하기 🔥
        </button>
        <Link
          href="/create"
          className="w-full rounded-2xl py-3.5 font-black text-white text-center transition-all"
          style={{ background: 'var(--accent-red)' }}
        >
          내 직관메이트 지도 만들기 🐸
        </Link>
      </div>
    </div>
  );
}
