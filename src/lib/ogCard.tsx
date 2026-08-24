/**
 * OG 이미지용 공유 JSX 컴포넌트
 *
 * Satori(next/og) 제약 사항:
 *  - flexbox만 사용 가능 (grid / table 불가)
 *  - 모든 div에 display: 'flex' 필요
 *  - inline style만 사용 (className 불가)
 *  - CSS 변수 불가 — 실제 색상값 사용
 */

/* eslint-disable @next/next/no-img-element */

import type { TeamCode } from './teams';
import { TEAM_COLORS } from './teamColors';

// ─── 공통 상수 ──────────────────────────────────────────────────────

const BG = '#0b0b12';
const SURFACE = '#16162a';
const TEXT = '#ffffff';
const TEXT_MUTED = '#8b8b9e';
const ACCENT_GOLD = '#F5A623';
const ACCENT_RED = '#E23B4E';

// ─── 팀 컬러 헬퍼 ──────────────────────────────────────────────────

function tc(team: TeamCode): string {
  return TEAM_COLORS[team] ?? '#9CA3AF';
}

// ─── 지도 초대 OG (A) ──────────────────────────────────────────────

export function OgMapImage({ ownerTeam, friendCount }: { ownerTeam: TeamCode; friendCount: number }) {
  return (
    <div
      style={{
        display: 'flex',
        width: '100%',
        height: '100%',
        backgroundColor: BG,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'NotoSansKR',
        gap: 24,
      }}
    >
      {/* 상단 로고 영역 */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
        <div style={{ fontSize: 64, lineHeight: 1 }}>🐸</div>
        <div style={{ fontSize: 18, color: TEXT_MUTED, letterSpacing: 4 }}>FACTPEPE · 직관메이트</div>
      </div>

      {/* 팀 원 */}
      <div
        style={{
          display: 'flex',
          width: 120,
          height: 120,
          borderRadius: 60,
          backgroundColor: tc(ownerTeam),
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          gap: 4,
        }}
      >
        <div style={{ fontSize: 16, color: BG }}>👑</div>
        <div style={{ fontSize: 28, fontWeight: 900, color: BG }}>{ownerTeam}</div>
      </div>

      {/* 제목 */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
        <div style={{ fontSize: 40, fontWeight: 900, color: TEXT }}>
          {ownerTeam} 팬의 직관메이트 지도
        </div>
        <div style={{ fontSize: 22, color: ACCENT_GOLD }}>
          {friendCount > 0 ? `친구 ${friendCount}명이 등록됐어요` : '너의 팀은 케미가 몇 점일까?'}
        </div>
      </div>
    </div>
  );
}

// ─── 결과 카드 OG (B) ───────────────────────────────────────────────

export function OgResultImage({
  ownerTeam,
  friendTeam,
  friendNickname,
  chemistryScore,
  roleLabel,
  emoji,
  description,
}: {
  ownerTeam: TeamCode;
  friendTeam: TeamCode;
  friendNickname: string;
  chemistryScore: number;
  roleLabel: string;
  emoji: string;
  description: string;
}) {
  return (
    <div
      style={{
        display: 'flex',
        width: '100%',
        height: '100%',
        backgroundColor: BG,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'NotoSansKR',
        gap: 20,
      }}
    >
      {/* VS 영역 */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 40 }}>
        {/* 팀 A */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
          <div
            style={{
              display: 'flex',
              width: 100,
              height: 100,
              borderRadius: 50,
              backgroundColor: tc(ownerTeam),
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div style={{ fontSize: 32, fontWeight: 900, color: BG }}>{ownerTeam}</div>
          </div>
        </div>

        {/* VS */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
          <div style={{ fontSize: 28, color: TEXT_MUTED }}>VS</div>
        </div>

        {/* 팀 B */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
          <div
            style={{
              display: 'flex',
              width: 100,
              height: 100,
              borderRadius: 50,
              backgroundColor: tc(friendTeam),
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div style={{ fontSize: 32, fontWeight: 900, color: BG }}>{friendTeam}</div>
          </div>
          <div style={{ fontSize: 16, color: tc(friendTeam) }}>{friendNickname}</div>
        </div>
      </div>

      {/* 케미지수 */}
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
        <div style={{ fontSize: 96, fontWeight: 900, color: chemistryScore >= 75 ? ACCENT_RED : ACCENT_GOLD }}>
          {chemistryScore}
        </div>
        <div style={{ fontSize: 24, color: TEXT_MUTED }}>점</div>
      </div>

      {/* 라벨 */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <div style={{ fontSize: 36, fontWeight: 900, color: TEXT }}>
          {emoji} {roleLabel}
        </div>
      </div>

      {/* 설명 */}
      <div style={{ fontSize: 18, color: TEXT_MUTED, maxWidth: 600, textAlign: 'center' }}>
        {description}
      </div>

      {/* 푸터 */}
      <div style={{ display: 'flex', position: 'absolute', bottom: 24, right: 32, gap: 8 }}>
        <div style={{ fontSize: 14, color: TEXT_MUTED, letterSpacing: 2 }}>FACTPEPE · 직관메이트</div>
      </div>
    </div>
  );
}

// ─── 오늘의 핫매치업 OG (C) ─────────────────────────────────────────

export function OgTodayImage({
  teamA,
  teamB,
  chemistryScore,
  roleLabel,
  emoji,
  updatedAt,
}: {
  teamA: TeamCode;
  teamB: TeamCode;
  chemistryScore: number;
  roleLabel: string;
  emoji: string;
  updatedAt: string;
}) {
  return (
    <div
      style={{
        display: 'flex',
        width: '100%',
        height: '100%',
        backgroundColor: BG,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'NotoSansKR',
        gap: 24,
      }}
    >
      {/* 타이틀 */}
      <div style={{ fontSize: 28, color: ACCENT_GOLD, letterSpacing: 2 }}>
        오늘의 KBO 핫매치업 🔥
      </div>

      {/* VS */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
        <div
          style={{
            display: 'flex',
            width: 110,
            height: 110,
            borderRadius: 55,
            backgroundColor: tc(teamA),
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div style={{ fontSize: 36, fontWeight: 900, color: BG }}>{teamA}</div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
          <div style={{ fontSize: 80, fontWeight: 900, color: ACCENT_RED }}>{chemistryScore}</div>
          <div style={{ fontSize: 16, color: TEXT_MUTED }}>케미지수</div>
        </div>

        <div
          style={{
            display: 'flex',
            width: 110,
            height: 110,
            borderRadius: 55,
            backgroundColor: tc(teamB),
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div style={{ fontSize: 36, fontWeight: 900, color: BG }}>{teamB}</div>
        </div>
      </div>

      {/* 라벨 */}
      <div style={{ fontSize: 32, fontWeight: 900, color: TEXT }}>
        {emoji} {roleLabel}
      </div>

      {/* 기준일 + 푸터 */}
      <div style={{ display: 'flex', position: 'absolute', bottom: 24, left: 0, right: 0, justifyContent: 'space-between', paddingLeft: 32, paddingRight: 32 }}>
        <div style={{ fontSize: 14, color: TEXT_MUTED }}>{updatedAt} 기준</div>
        <div style={{ fontSize: 14, color: TEXT_MUTED, letterSpacing: 2 }}>FACTPEPE · 직관메이트</div>
      </div>
    </div>
  );
}
