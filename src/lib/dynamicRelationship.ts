/**
 * 동적 관계 계산 — 시즌 순위표 + 상대전적 기반 25쌍 자동 판정
 *
 * 판정 기준:
 *  - 상대전적 승률 구간: 압도적(≥70%) · 우세/열세(55~69%) · 접전(<55%)
 *  - 순위 상황: 둘다 top5 · 한쪽만 top5 · 둘다 bottom5
 *  - 케미지수 = 기본점수(접전50 · 우세열세60 · 압도적75) + 순위보너스(둘다top5 +15 · 한쪽만 +5 · 둘다bottom5 +0)
 *  - 라벨 = 3×3 매트릭스(승률구간 × 순위상황)
 *
 * 순위표는 매일, 상대전적은 주 1회 갱신 기준 — 각각 updatedAt 을 별도 기록한다.
 */

import type { TeamCode, TeamRelationship } from './teams';

// ─── 시즌 데이터 타입 ────────────────────────────────────────────────

export interface StandingsEntry {
  team: TeamCode;
  rank: number;
}

export interface HeadToHeadEntry {
  teamA: TeamCode;
  teamB: TeamCode;
  wins: number;    // teamA 기준 승
  draws: number;
  losses: number;  // teamA 기준 패 (= teamB 승)
}

export interface SeasonData {
  standings: {
    entries: StandingsEntry[];
    updatedAt: string; // ISO date "2026-08-20"
  };
  headToHead: {
    entries: HeadToHeadEntry[];
    updatedAt: string;
  };
}

// ─── 판정 상수 ───────────────────────────────────────────────────────

type WinRateCategory = 'dominant' | 'advantage' | 'close';
type RankSituation = 'both_top5' | 'one_top5' | 'both_bottom5';

const TOP5_CUTOFF = 5;

interface DynamicLabel {
  emoji: string;
  label: string;
  description: string;
}

/** 3×3 라벨 매트릭스: (승률 구간) × (순위 상황) → 라벨 */
export const LABEL_MATRIX: Record<WinRateCategory, Record<RankSituation, DynamicLabel>> = {
  dominant: {
    both_top5:    { emoji: '🐍', label: '천적 확정', description: '1위 해도 얘 앞에서는 다리가 풀림' },
    one_top5:     { emoji: '🚌', label: '가을야구 셔틀', description: '밥값하듯 승수 갖다 바치는 사이' },
    both_bottom5: { emoji: '⚰️', label: '지하 결투', description: '바닥에서도 굴욕은 못 피함' },
  },
  advantage: {
    both_top5:    { emoji: '👀', label: '가을 눈치싸움', description: '웃고 있어도 뒤로는 견제 중' },
    one_top5:     { emoji: '🦵', label: '발목잡기 매치업', description: '쟤만 만나면 순위표가 흔들림' },
    both_bottom5: { emoji: '💣', label: '폭탄 돌리기', description: '지는 게 국룰인데 그중에도 급은 있음' },
  },
  close: {
    both_top5:    { emoji: '⚔️', label: '가을야구 혈전', description: '이기면 로또, 지면 광탈' },
    one_top5:     { emoji: '🎰', label: '복불복 매치업', description: '여기서 지면 억까 스토리 시작' },
    both_bottom5: { emoji: '🤝', label: '동병상련 배틀', description: '순위는 바닥, 자존심은 안 바닥' },
  },
};

const BASE_SCORES: Record<WinRateCategory, number> = {
  close: 50,
  advantage: 60,
  dominant: 75,
};

const RANK_BONUSES: Record<RankSituation, number> = {
  both_top5: 15,
  one_top5: 5,
  both_bottom5: 0,
};

// ─── 판정 함수 ───────────────────────────────────────────────────────

export function categorizeWinRate(dominantWinPct: number): WinRateCategory {
  if (dominantWinPct >= 70) return 'dominant';
  if (dominantWinPct >= 55) return 'advantage';
  return 'close';
}

export function categorizeRankSituation(rankA: number, rankB: number): RankSituation {
  const aTop = rankA <= TOP5_CUTOFF;
  const bTop = rankB <= TOP5_CUTOFF;
  if (aTop && bTop) return 'both_top5';
  if (aTop || bTop) return 'one_top5';
  return 'both_bottom5';
}

// ─── 메인 계산 ───────────────────────────────────────────────────────

/**
 * 두 팀의 동적 관계를 시즌 데이터 기반으로 계산한다.
 * 해당 쌍의 데이터가 없으면 null을 반환 → 호출부에서 dynamic_pending 폴백.
 *
 * @param teamA - 첫 번째 팀 (방장). 상대전적 기술 시 기준이 되는 쪽.
 * @param teamB - 두 번째 팀 (친구).
 * @param seasonData - 현재 시즌 데이터 (순위표 + 상대전적).
 */
export function calculateDynamicRelationship(
  teamA: TeamCode,
  teamB: TeamCode,
  seasonData: SeasonData,
): TeamRelationship | null {
  const { standings, headToHead } = seasonData;

  // 순위 탐색
  const rankA = standings.entries.find((e) => e.team === teamA)?.rank;
  const rankB = standings.entries.find((e) => e.team === teamB)?.rank;
  if (rankA === undefined || rankB === undefined) return null;

  // 상대전적 탐색 (양방향)
  const h2h = headToHead.entries.find(
    (e) =>
      (e.teamA === teamA && e.teamB === teamB) ||
      (e.teamA === teamB && e.teamB === teamA),
  );
  if (!h2h) return null;

  // teamA 기준으로 정규화
  const winsA = h2h.teamA === teamA ? h2h.wins : h2h.losses;
  const lossesA = h2h.teamA === teamA ? h2h.losses : h2h.wins;
  const draws = h2h.draws;
  const totalDecisive = winsA + lossesA;
  if (totalDecisive === 0) return null;

  // 우세 쪽 기준 승률
  const dominantWins = Math.max(winsA, lossesA);
  const dominantWinPct = (dominantWins / totalDecisive) * 100;

  const winRateCategory = categorizeWinRate(dominantWinPct);
  const rankSituation = categorizeRankSituation(rankA, rankB);
  const label = LABEL_MATRIX[winRateCategory][rankSituation];
  const chemistryScore = BASE_SCORES[winRateCategory] + RANK_BONUSES[rankSituation];

  // 상대전적 문자열 (teamA 기준)
  const recordStr = `${winsA}-${draws}-${lossesA}`;

  return {
    type: 'dynamic',
    name: `${label.emoji} ${label.label}`,
    tier: null,
    description: label.description,
    tags: [`상대전적 ${recordStr}`],
    chemistry_score: chemistryScore,
    role_label: `${label.emoji} ${label.label}`,
  };
}
