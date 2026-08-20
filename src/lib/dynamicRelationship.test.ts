/**
 * dynamicRelationship.ts 유닛 테스트
 *
 * 확인 대상:
 * - 승률 구간 분류 (압도적/우세열세/접전)
 * - 순위 상황 분류 (둘다top5/한쪽만/둘다bottom5)
 * - 케미지수 공식 (기본점수 + 순위보너스)
 * - 라벨 매트릭스 9개 조합 중 대표 사례 검증
 * - 데이터 누락 시 null 반환
 */

import { describe, it, expect } from 'vitest';
import {
  categorizeWinRate,
  categorizeRankSituation,
  calculateDynamicRelationship,
  type SeasonData,
} from './dynamicRelationship';
import type { TeamCode } from './teams';

// ─── 테스트용 시즌 데이터 (2026-08-20 스냅샷) ─────────────────────────

const TEST_STANDINGS: SeasonData['standings'] = {
  entries: [
    { team: 'KT', rank: 1 },
    { team: '삼성', rank: 2 },
    { team: 'LG', rank: 3 },
    { team: 'KIA', rank: 4 },
    { team: '두산', rank: 5 },
    { team: '한화', rank: 6 },
    { team: 'NC', rank: 7 },
    { team: '롯데', rank: 8 },
    { team: 'SSG', rank: 9 },
    { team: '키움', rank: 10 },
  ],
  updatedAt: '2026-08-20',
};

const TEST_H2H: SeasonData['headToHead'] = {
  entries: [
    { teamA: 'LG', teamB: 'SSG', wins: 9, draws: 0, losses: 4 },
    { teamA: 'LG', teamB: '한화', wins: 5, draws: 0, losses: 6 },
    { teamA: 'LG', teamB: '삼성', wins: 5, draws: 0, losses: 6 },
    { teamA: '두산', teamB: 'KT', wins: 3, draws: 1, losses: 6 },
    { teamA: '두산', teamB: 'NC', wins: 8, draws: 0, losses: 2 },
    { teamA: 'KT', teamB: '삼성', wins: 3, draws: 0, losses: 8 },
    { teamA: 'KT', teamB: '한화', wins: 8, draws: 0, losses: 3 },
    { teamA: '키움', teamB: '롯데', wins: 2, draws: 0, losses: 10 },
    { teamA: 'SSG', teamB: '한화', wins: 2, draws: 0, losses: 9 },
    { teamA: '한화', teamB: '롯데', wins: 7, draws: 0, losses: 3 },
    { teamA: '키움', teamB: '한화', wins: 7, draws: 1, losses: 4 },
    { teamA: 'LG', teamB: 'NC', wins: 5, draws: 0, losses: 5 },
    { teamA: '두산', teamB: '한화', wins: 7, draws: 1, losses: 7 },
  ],
  updatedAt: '2026-08-18',
};

const TEST_SEASON: SeasonData = {
  standings: TEST_STANDINGS,
  headToHead: TEST_H2H,
};

// ─── 승률 구간 분류 ──────────────────────────────────────────────────

describe('categorizeWinRate', () => {
  it('70% 이상이면 dominant', () => {
    expect(categorizeWinRate(70)).toBe('dominant');
    expect(categorizeWinRate(80)).toBe('dominant');
    expect(categorizeWinRate(100)).toBe('dominant');
  });

  it('55% 이상 70% 미만이면 advantage', () => {
    expect(categorizeWinRate(55)).toBe('advantage');
    expect(categorizeWinRate(69.9)).toBe('advantage');
  });

  it('55% 미만이면 close', () => {
    expect(categorizeWinRate(50)).toBe('close');
    expect(categorizeWinRate(54.9)).toBe('close');
  });
});

// ─── 순위 상황 분류 ──────────────────────────────────────────────────

describe('categorizeRankSituation', () => {
  it('둘 다 1~5위면 both_top5', () => {
    expect(categorizeRankSituation(1, 5)).toBe('both_top5');
    expect(categorizeRankSituation(3, 4)).toBe('both_top5');
  });

  it('한쪽만 1~5위면 one_top5', () => {
    expect(categorizeRankSituation(3, 8)).toBe('one_top5');
    expect(categorizeRankSituation(7, 2)).toBe('one_top5');
  });

  it('둘 다 6~10위면 both_bottom5', () => {
    expect(categorizeRankSituation(6, 10)).toBe('both_bottom5');
    expect(categorizeRankSituation(8, 9)).toBe('both_bottom5');
  });
});

// ─── 동적 관계 계산 ──────────────────────────────────────────────────

describe('calculateDynamicRelationship', () => {
  it('KT-삼성: 압도적 + 둘다top5 → 천적 확정 (90점)', () => {
    const result = calculateDynamicRelationship('KT', '삼성', TEST_SEASON);
    expect(result).not.toBeNull();
    expect(result!.type).toBe('dynamic');
    expect(result!.name).toContain('천적 확정');
    expect(result!.chemistry_score).toBe(90);
  });

  it('두산-NC: 압도적 + 한쪽만top5 → 가을야구 셔틀 (80점)', () => {
    const result = calculateDynamicRelationship('두산', 'NC', TEST_SEASON);
    expect(result).not.toBeNull();
    expect(result!.name).toContain('가을야구 셔틀');
    expect(result!.chemistry_score).toBe(80);
  });

  it('LG-SSG: 우세/열세 + 한쪽만top5 → 발목잡기 매치업 (65점)', () => {
    const result = calculateDynamicRelationship('LG', 'SSG', TEST_SEASON);
    expect(result).not.toBeNull();
    expect(result!.name).toContain('발목잡기');
    expect(result!.chemistry_score).toBe(65);
  });

  it('LG-한화: 접전 + 한쪽만top5 → 복불복 매치업 (55점)', () => {
    // 한화 6승 LG 5승 → dominant 55% → close (< 55)
    const result = calculateDynamicRelationship('LG', '한화', TEST_SEASON);
    expect(result).not.toBeNull();
    expect(result!.name).toContain('복불복');
    expect(result!.chemistry_score).toBe(55);
  });

  it('키움-롯데: 압도적 + 둘다bottom5 → 지하 결투 (75점)', () => {
    const result = calculateDynamicRelationship('키움', '롯데', TEST_SEASON);
    expect(result).not.toBeNull();
    expect(result!.name).toContain('지하 결투');
    expect(result!.chemistry_score).toBe(75);
  });

  it('키움-한화: 우세/열세 + 둘다bottom5 → 폭탄 돌리기 (60점)', () => {
    const result = calculateDynamicRelationship('키움', '한화', TEST_SEASON);
    expect(result).not.toBeNull();
    expect(result!.name).toContain('폭탄 돌리기');
    expect(result!.chemistry_score).toBe(60);
  });

  it('두산-KT: 우세/열세 + 둘다top5 → 가을 눈치싸움 (75점)', () => {
    const result = calculateDynamicRelationship('두산', 'KT', TEST_SEASON);
    expect(result).not.toBeNull();
    expect(result!.name).toContain('눈치싸움');
    expect(result!.chemistry_score).toBe(75);
  });

  it('LG-삼성: 접전 + 둘다top5 → 가을야구 혈전 (65점)', () => {
    const result = calculateDynamicRelationship('LG', '삼성', TEST_SEASON);
    expect(result).not.toBeNull();
    expect(result!.name).toContain('혈전');
    expect(result!.chemistry_score).toBe(65);
  });

  it('한화-롯데: 압도적 + 둘다bottom5 → 지하 결투 (75점)', () => {
    const result = calculateDynamicRelationship('한화', '롯데', TEST_SEASON);
    expect(result).not.toBeNull();
    expect(result!.name).toContain('지하 결투');
    expect(result!.chemistry_score).toBe(75);
  });

  it('LG-NC: 접전 + 한쪽만top5 → 복불복 매치업 (55점)', () => {
    const result = calculateDynamicRelationship('LG', 'NC', TEST_SEASON);
    expect(result).not.toBeNull();
    expect(result!.name).toContain('복불복');
    expect(result!.chemistry_score).toBe(55);
  });

  it('두산-한화: 접전 + 한쪽만top5 → 복불복 매치업 (55점)', () => {
    const result = calculateDynamicRelationship('두산', '한화', TEST_SEASON);
    expect(result).not.toBeNull();
    expect(result!.name).toContain('복불복');
    expect(result!.chemistry_score).toBe(55);
  });

  it('양방향 일관성: A-B와 B-A는 같은 라벨과 케미지수를 반환한다', () => {
    const forward = calculateDynamicRelationship('KT', '삼성', TEST_SEASON);
    const backward = calculateDynamicRelationship('삼성', 'KT', TEST_SEASON);
    expect(forward).not.toBeNull();
    expect(backward).not.toBeNull();
    expect(forward!.name).toBe(backward!.name);
    expect(forward!.chemistry_score).toBe(backward!.chemistry_score);
  });

  it('상대전적 태그는 첫 번째 팀(teamA) 기준이다', () => {
    const result = calculateDynamicRelationship('KT', '삼성', TEST_SEASON);
    expect(result).not.toBeNull();
    // KT 기준: 3-0-8 (KT가 teamA in 원본 데이터)
    expect(result!.tags).toContain('상대전적 3-0-8');

    const reverse = calculateDynamicRelationship('삼성', 'KT', TEST_SEASON);
    expect(reverse).not.toBeNull();
    // 삼성 기준: 8-0-3
    expect(reverse!.tags).toContain('상대전적 8-0-3');
  });

  it('데이터가 없는 쌍은 null을 반환한다', () => {
    // KIA-NC 전적이 테스트 데이터에 없음
    const result = calculateDynamicRelationship('KIA' as TeamCode, 'NC' as TeamCode, TEST_SEASON);
    expect(result).toBeNull();
  });

  it('순위 데이터가 없으면 null을 반환한다', () => {
    const noStandings: SeasonData = {
      standings: { entries: [], updatedAt: '2026-08-20' },
      headToHead: TEST_H2H,
    };
    const result = calculateDynamicRelationship('KT', '삼성', noStandings);
    expect(result).toBeNull();
  });
});
