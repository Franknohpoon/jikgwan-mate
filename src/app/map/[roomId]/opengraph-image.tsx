/**
 * 지도 초대 OG 이미지
 *
 * URL 패턴: /map/{roomId}
 * og:title  → "{방장팀} 팬의 직관메이트 지도 🗺️"
 * og:description → "너의 팀은 {방장팀}이랑 케미가 몇 점일까?"
 */

import { ImageResponse } from 'next/og';
import { getRoom } from '@/lib/kv';
import { getOgFonts } from '@/lib/ogFont';
import { OgMapImage } from '@/lib/ogCard';

export const runtime = 'edge';
export const alt = '직관메이트 지도';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image({ params }: { params: Promise<{ roomId: string }> }) {
  const { roomId } = await params;

  try {
    const [room, fonts] = await Promise.all([getRoom(roomId), getOgFonts()]);

    return new ImageResponse(
      <OgMapImage ownerTeam={room.ownerTeam} friendCount={room.friends.length} />,
      { ...size, fonts },
    );
  } catch {
    // 방이 없거나 에러 시 기본 이미지
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
