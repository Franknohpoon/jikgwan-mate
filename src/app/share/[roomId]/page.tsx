'use client';

import { useEffect, useState, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import ShareButtons from '@/components/ShareButtons';
import { teamColor } from '@/lib/teamColors';
import type { TeamCode } from '@/lib/teams';

interface Participant {
  id: string;
  team: TeamCode;
  isHost: boolean;
  joinedAt: number;
}

interface Room {
  id: string;
  minParticipants: number;
  maxParticipants: number;
  participants: Participant[];
}

const POLL_INTERVAL_MS = 5000;

export default function SharePage() {
  const { roomId } = useParams<{ roomId: string }>();
  const router = useRouter();
  const [room, setRoom] = useState<Room | null>(null);
  const [error, setError] = useState('');

  const fetchRoom = useCallback(async () => {
    try {
      const res = await fetch(`/api/rooms/${roomId}`, { cache: 'no-store' });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || '방을 찾을 수 없습니다.');
      setRoom(data.room);
    } catch (e) {
      setError(e instanceof Error ? e.message : '방을 불러오지 못했습니다.');
    }
  }, [roomId]);

  useEffect(() => {
    // 마운트 직후 1회 즉시 조회 + 이후 폴링. fetchRoom 내부에서 setState가
    // 일어나지만 비동기 fetch 완료 콜백에서만 호출되므로 렌더 중 동기 setState는
    // 아니다 — eslint의 set-state-in-effect 휴리스틱이 이 패턴을 과탐지한다.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchRoom();
    const timer = setInterval(fetchRoom, POLL_INTERVAL_MS);
    return () => clearInterval(timer);
  }, [fetchRoom]);

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
  const host = room.participants.find((p) => p.isHost);
  const ready = room.participants.length >= room.minParticipants;

  return (
    <div className="flex flex-1 flex-col px-6 py-10 max-w-md mx-auto w-full">
      <div className="mb-6 space-y-1.5">
        <p className="text-muted text-xs font-bold tracking-wider">STEP 2</p>
        <h1 className="text-xl font-black">친구들에게 링크를 공유하세요</h1>
        <p className="text-muted text-sm">
          최소 {room.minParticipants}명이 모이면 결과를 볼 수 있어요. (최대 {room.maxParticipants}명)
        </p>
      </div>

      <div className="rounded-2xl border border-border p-4 mb-4" style={{ background: 'var(--surface)' }}>
        <p className="text-xs text-muted mb-2 break-all">{shareUrl || '링크 생성 중…'}</p>
        <ShareButtons
          url={shareUrl}
          title="직관메이트 지도 만들기"
          description={`${host?.team ?? ''} 팬이 만든 직관메이트 지도에 참여해보세요!`}
        />
      </div>

      <div className="rounded-2xl border border-border p-4 mb-6 flex items-center justify-between" style={{ background: 'var(--surface)' }}>
        <div>
          <p className="text-sm font-bold">
            현재 {room.participants.length}/{room.maxParticipants}명 참여중
          </p>
          <p className="text-muted text-xs mt-0.5">
            {ready ? '결과를 볼 수 있어요!' : `${room.minParticipants - room.participants.length}명 더 모이면 결과가 열려요.`}
          </p>
        </div>
        <div className="flex -space-x-2">
          {room.participants.map((p) => (
            <span
              key={p.id}
              className="w-8 h-8 rounded-full border-2 border-background flex items-center justify-center text-[10px] font-black"
              style={{ background: teamColor(p.team), color: '#0b0b12' }}
              title={p.team}
            >
              {p.team.slice(0, 2)}
            </span>
          ))}
        </div>
      </div>

      <button
        onClick={() => router.push(`/result/${room.id}`)}
        disabled={!ready}
        className="w-full rounded-2xl py-3.5 font-black text-white transition-all disabled:opacity-40"
        style={{ background: 'var(--accent-gold)', color: '#191600' }}
      >
        {ready ? '결과 보기 🐸' : '더 모이면 결과 보기'}
      </button>
    </div>
  );
}
