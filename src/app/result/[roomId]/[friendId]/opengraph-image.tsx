/**
 * 결과 카드 OG 이미지
 *
 * URL 패턴: /result/{roomId}/{friendId}
 * og:title  → "{케미지수}점! {역할라벨} {이모지}"
 * VS 레이아웃 + 거대한 케미지수 + dark navy 배경
 */

import { ImageResponse } from 'next/og';
import { getRoom, getSeasonData } from '@/lib/kv';
import { getTeamRelationship, isSameTeamError } from '@/lib/teams';
import { getOgFonts } from '@/lib/ogFont';
import { OgResultImage } from '@/lib/ogCard';

export const runtime = 'edge';
export const alt = '직관메이트 결과';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image({
  params,
}: {
  params: Promise<{ roomId: string; friendId: string }>;
}) {
  const { roomId, friendId } = await params;

  try {
    const [room, seasonData, fonts] = await Promise.all([
      getRoom(roomId),
      getSeasonData(),
      getOgFonts(),
    ]);

    const friend = room.friends.find((f) => f.id === friendId);
    if (!friend) throw new Error('friend not found');

    const rel = getTeamRelationship(room.ownerTeam, friend.team, seasonData);
    if (isSameTeamError(rel)) throw new Error('same team');

    // role_label에서 이모지·라벨 분리 (예: "🐍 천적 확정" → emoji="🐍", label="천적 확정")
    const emojiMatch = rel.role_label.match(/^(\p{Emoji_Presentation}|\p{Extended_Pictographic})\s*/u);
    const emoji = emojiMatch?.[1] ?? '⚾';
    const labelText = emojiMatch ? rel.role_label.slice(emojiMatch[0].length) : rel.role_label;

    return new ImageResponse(
      (
        <OgResultImage
          ownerTeam={room.ownerTeam}
          friendTeam={friend.team}
          friendNickname={friend.nickname}
          chemistryScore={rel.chemistry_score}
          roleLabel={labelText}
          emoji={emoji}
          description={rel.description}
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
          <div style={{ fontSize: 64 }}>🐸</div>
          <div style={{ fontSize: 40, fontWeight: 900, color: '#ffffff' }}>직관메이트</div>
          <div style={{ fontSize: 20, color: '#8b8b9e' }}>KBO 팬 관계 지도</div>
        </div>
      ),
      { ...size, fonts },
    );
  }
}
