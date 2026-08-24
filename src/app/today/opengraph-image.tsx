/**
 * 오늘의 핫매치업 OG 이미지
 *
 * URL 패턴: /today
 * og:title  → "오늘 KBO 최고 앙숙은? 🔥"
 * #1 매치업을 VS 레이아웃으로 표시
 */

import { ImageResponse } from 'next/og';
import { getSeasonData } from '@/lib/kv';
import { getAllDynamicRanking } from '@/lib/teams';
import { getOgFonts } from '@/lib/ogFont';
import { OgTodayImage } from '@/lib/ogCard';

export const runtime = 'edge';
export const alt = '오늘의 KBO 핫매치업';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  try {
    const [seasonData, fonts] = await Promise.all([getSeasonData(), getOgFonts()]);

    if (!seasonData) throw new Error('no season data');

    const ranking = getAllDynamicRanking(seasonData);
    if (ranking.length === 0) throw new Error('no ranking');

    const top = ranking[0];

    // role_label에서 이모지·라벨 분리
    const emojiMatch = top.relationship.role_label.match(
      /^(\p{Emoji_Presentation}|\p{Extended_Pictographic})\s*/u,
    );
    const emoji = emojiMatch?.[1] ?? '🔥';
    const labelText = emojiMatch
      ? top.relationship.role_label.slice(emojiMatch[0].length)
      : top.relationship.role_label;

    return new ImageResponse(
      (
        <OgTodayImage
          teamA={top.teamA}
          teamB={top.teamB}
          chemistryScore={top.relationship.chemistry_score}
          roleLabel={labelText}
          emoji={emoji}
          updatedAt={seasonData.standings.updatedAt}
        />
      ),
      { ...size, fonts },
    );
  } catch {
    const fonts = await getOgFonts();
    return new ImageResponse(
      (
        <div
          style={{
            display: 'flex',
            width: '100%',
            height: '100%',
            backgroundColor: '#0b0b12',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'NotoSansKR',
            gap: 16,
          }}
        >
          <div style={{ fontSize: 64 }}>🔥</div>
          <div style={{ fontSize: 40, fontWeight: 900, color: '#ffffff' }}>오늘의 KBO 핫매치업</div>
          <div style={{ fontSize: 20, color: '#8b8b9e' }}>시즌 데이터 준비 중…</div>
        </div>
      ),
      { ...size, fonts },
    );
  }
}
