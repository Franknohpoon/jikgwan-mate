/**
 * lib/teams.ts 유닛 테스트
 *
 * 실행: npx vitest run
 *
 * 확인 대상:
 * - 16개 고정 라이벌 쌍이 정확히 매칭되는지 (양방향)
 * - 4개 흥참동 쌍이 정확히 매칭되는지 (양방향)
 * - 나머지 25쌍(45 - 20)은 "dynamic_pending"이 반환되는지
 * - 같은 팀 조합, TEAMS/TEAM_REGION 정합성
 */

import { describe, it, expect } from 'vitest';
import {
  TEAMS,
  TEAM_REGION,
  FIXED_RIVALRIES,
  HEUNGCHAMDONG_PAIRS,
  getTeamRelationship,
  isSameTeamError,
  type TeamCode,
} from './teams';

const FIXED_PAIRS: [TeamCode, TeamCode][] = [
  ['LG', '두산'],
  ['삼성', 'KIA'],
  ['롯데', 'KIA'],
  ['롯데', '삼성'],
  ['롯데', 'NC'],
  ['삼성', 'NC'],
  ['LG', '롯데'],
  ['삼성', '두산'],
  ['LG', 'KT'],
  ['SSG', '롯데'],
  ['LG', '키움'],
  ['KT', 'SSG'],
  ['두산', 'KIA'],
  ['두산', 'SSG'],
  ['KIA', 'LG'],  // 신규: 이름 없는 앙숙
  ['키움', 'SSG'], // 흥참동에서 승격: 1호선 시리즈
];

const HEUNGCHAMDONG_ONLY_PAIRS: [TeamCode, TeamCode][] = [
  ['SSG', 'NC'],
  ['키움', 'NC'],
  ['키움', 'KT'],
  ['NC', 'KT'],
];

function allPairs(teams: readonly TeamCode[]): [TeamCode, TeamCode][] {
  const pairs: [TeamCode, TeamCode][] = [];
  for (let i = 0; i < teams.length; i++) {
    for (let j = i + 1; j < teams.length; j++) {
      pairs.push([teams[i], teams[j]]);
    }
  }
  return pairs;
}

describe('TEAMS / TEAM_REGION', () => {
  it('TEAMS는 10개 팀을 포함한다', () => {
    expect(TEAMS.length).toBe(10);
    expect(new Set(TEAMS).size).toBe(10);
  });

  it('TEAM_REGION은 모든 팀의 연고지를 포함한다', () => {
    for (const team of TEAMS) {
      expect(TEAM_REGION[team]).toBeTruthy();
    }
  });

  it('전체 조합은 45쌍이다 (10 choose 2)', () => {
    expect(allPairs(TEAMS).length).toBe(45);
  });
});

describe('getTeamRelationship', () => {
  it('같은 팀을 입력하면 에러를 반환한다', () => {
    for (const team of TEAMS) {
      const result = getTeamRelationship(team, team);
      expect(isSameTeamError(result)).toBe(true);
      if (isSameTeamError(result)) {
        expect(result.error).toBe('같은 팀입니다');
      }
    }
  });

  it('FIXED_RIVALRIES는 정확히 16쌍을 담는다', () => {
    expect(FIXED_RIVALRIES.size).toBe(16);
  });

  it('HEUNGCHAMDONG_PAIRS는 정확히 4쌍을 담는다 (KT-SSG·키움-SSG 제외)', () => {
    expect(HEUNGCHAMDONG_PAIRS.size).toBe(4);
  });

  it('16개 고정 라이벌 쌍이 fixed_rivalry로 정확히 매칭된다 (양방향)', () => {
    expect(FIXED_PAIRS.length).toBe(16);
    for (const [a, b] of FIXED_PAIRS) {
      const forward = getTeamRelationship(a, b);
      const backward = getTeamRelationship(b, a);
      if (isSameTeamError(forward) || isSameTeamError(backward)) {
        throw new Error(`${a}-${b}가 같은 팀으로 취급됨`);
      }
      expect(forward.type).toBe('fixed_rivalry');
      expect(forward).toEqual(backward);
      expect(forward.name).toBeTruthy();
      expect(['S', 'A', 'B']).toContain(forward.tier);
    }
  });

  it('4개 흥참동 전용 쌍이 heungchamdong으로 정확히 매칭된다 (양방향)', () => {
    expect(HEUNGCHAMDONG_ONLY_PAIRS.length).toBe(4);
    for (const [a, b] of HEUNGCHAMDONG_ONLY_PAIRS) {
      const forward = getTeamRelationship(a, b);
      const backward = getTeamRelationship(b, a);
      if (isSameTeamError(forward) || isSameTeamError(backward)) {
        throw new Error(`${a}-${b}가 같은 팀으로 취급됨`);
      }
      expect(forward.type).toBe('heungchamdong');
      expect(forward).toEqual(backward);
      expect(forward.tier).toBe('C');
    }
  });

  it('KT-SSG는 흥참동이 아니라 수인선 시리즈(fixed_rivalry)로 매칭된다', () => {
    const result = getTeamRelationship('KT', 'SSG');
    if (isSameTeamError(result)) throw new Error('unexpected same-team error');
    expect(result.type).toBe('fixed_rivalry');
    expect(result.name).toBe('수인선 시리즈');
  });

  it('seasonData 없이 호출하면 나머지 25쌍은 dynamic_pending을 반환한다', () => {
    const covered = new Set(
      [...FIXED_PAIRS, ...HEUNGCHAMDONG_ONLY_PAIRS].map(([a, b]) => [a, b].sort().join('__'))
    );
    const rest = allPairs(TEAMS).filter(([a, b]) => !covered.has([a, b].sort().join('__')));

    expect(covered.size).toBe(20);
    expect(rest.length).toBe(25);

    for (const [a, b] of rest) {
      const result = getTeamRelationship(a, b); // seasonData 생략
      if (isSameTeamError(result)) throw new Error(`${a}-${b}가 같은 팀으로 취급됨`);
      expect(result.type).toBe('dynamic_pending');
      expect(result.tier).toBeNull();
      expect(result.tags).toEqual([]);
    }
  });

  it('seasonData를 전달하면 동적 쌍은 dynamic 타입을 반환한다', () => {
    const seasonData = {
      standings: {
        entries: [
          { team: 'KT' as const, rank: 1 },
          { team: '삼성' as const, rank: 2 },
          { team: 'LG' as const, rank: 3 },
          { team: 'KIA' as const, rank: 4 },
          { team: '두산' as const, rank: 5 },
          { team: '한화' as const, rank: 6 },
          { team: 'NC' as const, rank: 7 },
          { team: '롯데' as const, rank: 8 },
          { team: 'SSG' as const, rank: 9 },
          { team: '키움' as const, rank: 10 },
        ],
        updatedAt: '2026-08-20',
      },
      headToHead: {
        entries: [
          { teamA: 'KT' as const, teamB: '삼성' as const, wins: 3, draws: 0, losses: 8 },
        ],
        updatedAt: '2026-08-18',
      },
    };

    // KT-삼성: 시즌 데이터가 있으므로 dynamic
    const result = getTeamRelationship('KT', '삼성', seasonData);
    if (isSameTeamError(result)) throw new Error('unexpected same-team');
    expect(result.type).toBe('dynamic');
    expect(result.chemistry_score).toBe(90); // 압도적(75) + 둘다top5(15)

    // 고정 라이벌은 seasonData가 있어도 fixed_rivalry 우선
    const fixed = getTeamRelationship('LG', '두산', seasonData);
    if (isSameTeamError(fixed)) throw new Error('unexpected same-team');
    expect(fixed.type).toBe('fixed_rivalry');
  });

  it('고정 커버리지는 20/45쌍이다', () => {
    const total = allPairs(TEAMS).length;
    const coveredCount = FIXED_RIVALRIES.size + HEUNGCHAMDONG_PAIRS.size;
    expect(total).toBe(45);
    expect(coveredCount).toBe(20);
  });
});
