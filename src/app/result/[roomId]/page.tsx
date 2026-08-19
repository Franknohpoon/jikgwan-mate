'use client';

import { useEffect, useRef, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { toPng } from 'html-to-image';
import ResultCardCanvas from '@/components/ResultCardCanvas';
import type { TeamCode } from '@/lib/teams';

interface Participant {
  id: string;
  team: TeamCode;
  isHost: boolean;
}

interface Room {
  id: string;
  minParticipants: number;
  participants: Participant[];
}

export default function ResultPage() {
  const { roomId } = useParams<{ roomId: string }>();
  const [room, setRoom] = useState<Room | null>(null);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`/api/rooms/${roomId}`, { cache: 'no-store' });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || '방을 찾을 수 없습니다.');
        setRoom(data.room);
      } catch (e) {
        setError(e instanceof Error ? e.message : '방을 불러오지 못했습니다.');
      }
    })();
  }, [roomId]);

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

  if (room.participants.length < room.minParticipants) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center px-6 text-center gap-3">
        <p className="text-muted text-sm">
          아직 {room.minParticipants}명이 모이지 않았어요. ({room.participants.length}/{room.minParticipants})
        </p>
        <Link href={`/join/${room.id}`} className="text-accent-gold underline text-sm">
          참여 화면으로 이동
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col px-4 py-8 max-w-md mx-auto w-full gap-4">
      <ResultCardCanvas ref={cardRef} participants={room.participants} />

      <div className="flex gap-2">
        <button
          onClick={handleDownload}
          disabled={busy}
          className="flex-1 rounded-2xl py-3.5 font-black text-white transition-all disabled:opacity-40"
          style={{ background: 'var(--accent-red)' }}
        >
          {busy ? '저장 중…' : '이미지로 저장'}
        </button>
        <Link
          href="/create"
          className="flex-1 rounded-2xl py-3.5 font-black text-center border border-border"
          style={{ background: 'var(--surface)' }}
        >
          새로 만들기
        </Link>
      </div>
    </div>
  );
}
