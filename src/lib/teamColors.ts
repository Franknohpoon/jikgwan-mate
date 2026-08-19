/**
 * KBO 10구단 포인트 컬러
 *
 * 완전 공식 팀컬러는 아니고, 다크 배경 카드 위에서 팀을 구분하기 좋게
 * 고른 근사 팔레트. factpepe-v3의 BigMatch.jsx(KBO_COLORS)와 동일한 값을
 * 사용해 브랜드 톤을 맞춘다.
 */

import type { TeamCode } from './teams';

export const TEAM_COLORS: Record<TeamCode, string> = {
  SSG: '#FF3B5C',
  두산: '#4C7CF0',
  LG: '#F0503A',
  키움: '#9161F5',
  KT: '#F5A623',
  삼성: '#38BDF8',
  롯데: '#FB923C',
  한화: '#FF7A50',
  NC: '#1FC5A8',
  KIA: '#E23B4E',
};

export function teamColor(team: TeamCode): string {
  return TEAM_COLORS[team] ?? '#9CA3AF';
}
