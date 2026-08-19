/**
 * lib/teams.ts 유닛 테스트
 *
 * 실행: npx vitest run
 *
 * 확인 대상:
 * - 14개 고정 라이벌 쌍이 정확히 매칭되는지 (양방향)
 * - 5개 흥참동 쌍이 정확히 매칭되는지 (양방향)
 * - 나머지 26쌍(45 - 19)은 "dynamic_pending"이 반환되는지
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
];

const HEUNGCHAMDONG_ONLY_PAIRS: [TeamCode, TeamCode][] = [
  ['SSG', '키움'],
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

  it('FIXED_RIVALRIES는 정확히 14쌍을 담는다', () => {
    expect(FIXED_RIVALRIES.size).toBe(14);
  });

  it('HEUNGCHAMDONG_PAIRS는 정확히 5쌍을 담는다 (KT-SSG 제외)', () => {
    expect(HEUNGCHAMDONG_PAIRS.size).toBe(5);
  });

  it('14개 고정 라이벌 쌍이 fixed_rivalry로 정확히 매칭된다 (양방향)', () => {
    expect(FIXED_PAIRS.length).toBe(14);
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

  it('5개 흥참동 전용 쌍이 heungchamdong으로 정확히 매칭된다 (양방향)', () => {
    expect(HEUNGCHAMDONG_ONLY_PAIRS.length).toBe(5);
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

  it('KT-SSG는 흥참동이 아니라 경인 라이벌(fixed_rivalry)로 매칭된다', () => {
    const result = getTeamRelationship('KT', 'SSG');
    if (isSameTeamError(result)) throw new Error('unexpected same-team error');
    expect(result.type).toBe('fixed_rivalry');
    expect(result.name).toBe('경인 라이벌');
  });

  it('나머지 26쌍은 dynamic_pending을 반환한다', () => {
    const covered = new Set(
      [...FIXED_PAIRS, ...HEUNGCHAMDONG_ONLY_PAIRS].map(([a, b]) => [a, b].sort().join('__'))
    );
    const rest = allPairs(TEAMS).filter(([a, b]) => !covered.has([a, b].sort().join('__')));

    expect(covered.size).toBe(19);
    expect(rest.length).toBe(26);

    for (const [a, b] of rest) {
      const result = getTeamRelationship(a, b);
      if (isSameTeamError(result)) throw new Error(`${a}-${b}가 같은 팀으로 취급됨`);
      expect(result.type).toBe('dynamic_pending');
      expect(result.tier).toBeNull();
      expect(result.tags).toEqual([]);
    }
  });

  it('1차 구현 커버리지는 19/45쌍이다', () => {
    const total = allPairs(TEAMS).length;
    const coveredCount = FIXED_RIVALRIES.size + HEUNGCHAMDONG_PAIRS.size;
    expect(total).toBe(45);
    expect(coveredCount).toBe(19);
  });
});
