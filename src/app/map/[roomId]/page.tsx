'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { toPng } from 'html-to-image';
import ShareButtons from '@/components/ShareButtons';
import MapCanvas from '@/components/MapCanvas';
import type { TeamCode } from '@/lib/teams';
import { MAX_FRIENDS } from '@/lib/mapConfig';

interface Friend {
  id: string;
  team: TeamCode;
  nickname: string;
  joinedAt: number;
}

interface Room {
  id: string;
  ownerTeam: TeamCode;
  friends: Friend[];
  maxFriends: number;
}

const POLL_INTERVAL_MS = 5000;

// 지도 페이지는 누구나(방장 본인 확인 없이) 열람 가능한 공개 페이지.
// 최소 인원 게이트 없이 친구가 등록될 때마다 폴링으로 바로 반영된다.
export default function MapPage() {
  const { roomId } = useParams<{ roomId: string }>();
  const [room, setRoom] = useState<Room | null>(null);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const fetchRoom = useCallback(async () => {
    try {
      const res = await fetch(`/api/rooms/${roomId}`, { cache: 'no-store' });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || '지도를 찾을 수 없습니다.');
      setRoom(data.room);
    } catch (e) {
      setError(e instanceof Error ? e.message : '지도를 불러오지 못했습니다.');
    }
  }, [roomId]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchRoom();
    const timer = setInterval(fetchRoom, POLL_INTERVAL_MS);
    return () => clearInterval(timer);
  }, [fetchRoom]);

  const handleDownload = async () => {
    if (!cardRef.current || busy) return;
    setBusy(true);
    try {
      const dataUrl = await toPng(cardRef.current, { pixelRatio: 2, backgroundColor: '#0b0b12' });
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = `jikgwanmate-${roomId}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (e) {
      console.error(e);
    } finally {
      setBusy(false);
    }
  };

  if (error) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center px-6 text-center gap-4">
        <p className="text-accent-red">⚠️ {error}</p>
        <Link href="/create" className="text-muted underline text-sm">
          새로 만들기
        </Link>
      </div>
    );
  }

  if (!room) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <p className="text-muted text-sm">불러오는 중…</p>
      </div>
    );
  }

  const shareUrl = typeof window !== 'undefined' ? `${window.location.origin}/join/${room.id}` : '';
  const isFull = room.friends.length >= room.maxFriends;

  return (
    <div className="flex flex-1 flex-col px-4 py-8 max-w-md mx-auto w-full gap-4">
      <div className="rounded-2xl border border-border p-4" style={{ background: 'var(--surface)' }}>
        <p className="text-xs font-bold tracking-wider text-muted mb-2">
          {isFull ? `⚠️ 정원(${MAX_FRIENDS}명)이 가득 찼어요` : '친구 초대 링크'}
        </p>
        <p className="text-xs text-muted mb-2 break-all">{shareUrl || '링크 생성 중…'}</p>
        <ShareButtons
          url={shareUrl}
          title="직관메이트 지도 만들기"
          description={`${room.ownerTeam} 팬이 만든 직관메이트 지도에 참여해보세요!`}
        />
      </div>

      <MapCanvas ref={cardRef} ownerTeam={room.ownerTeam} friends={room.friends} />

      <button
        onClick={handleDownload}
        disabled={busy || room.friends.length === 0}
        className="w-full rounded-2xl py-3.5 font-black text-white transition-all disabled:opacity-40"
        style={{ background: 'var(--accent-red)' }}
      >
        {busy ? '저장 중…' : '이미지로 저장'}
      </button>
    </div>
  );
}
