/**
 * 오늘의 핫매치업 — TOP5 동적 매치업 페이지
 *
 * URL: /today
 *
 * 동적 25쌍만 사용 (고정 라이벌·흥참동 제외).
 * "매일 달라지는 콘텐츠여야 재방문/재포스팅 가치가 생김" — 시즌 데이터 기반.
 */

import type { Metadata } from 'next';
import { getSeasonData } from '@/lib/kv';
import { getAllDynamicRanking } from '@/lib/teams';
import TodayClient from './TodayClient';

export const metadata: Metadata = {
  title: '오늘의 KBO 핫매치업 🔥 | 직관메이트',
  description: '시즌 순위와 상대전적 기반, 오늘 KBO 최고 앙숙 TOP5를 확인하세요!',
};

export const dynamic = 'force-dynamic';

export default async function TodayPage() {
  const seasonData = await getSeasonData();

  if (!seasonData) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center px-6 text-center gap-4">
        <p className="text-6xl">🐸</p>
        <p className="text-muted text-sm">시즌 데이터가 아직 등록되지 않았어요.</p>
      </div>
    );
  }

  const ranking = getAllDynamicRanking(seasonData);
  const top5 = ranking.slice(0, 5);
  const updatedAt = seasonData.standings.updatedAt;

  return <TodayClient top5={top5} updatedAt={updatedAt} />;
}
