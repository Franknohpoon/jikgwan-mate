'use client';

import { useEffect, useState, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import TeamGridPicker from '@/components/TeamGridPicker';
import type { TeamCode } from '@/lib/teams';

interface Participant {
  id: string;
  team: TeamCode;
  isHost: boolean;
}

interface Room {
  id: string;
  minParticipants: number;
  maxParticipants: number;
  participants: Participant[];
}

export default function JoinPage() {
  const { roomId } = useParams<{ roomId: string }>();
  const router = useRouter();
  const [room, setRoom] = useState<Room | null>(null);
  const [team, setTeam] = useState<TeamCode | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [joined, setJoined] = useState<Room | null>(null);

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
    // fetchRoom 내부 setState는 비동기 fetch 완료 콜백에서만 일어난다.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchRoom();
  }, [fetchRoom]);

  // 참여 완료 후 정원이 찰 때까지 대기하는 화면에서는 5초마다 방 상태를 갱신해
  // 조건 충족 시 자동으로 결과 화면으로 넘어간다.
  useEffect(() => {
    if (!joined) return;
    const timer = setInterval(async () => {
      const res = await fetch(`/api/rooms/${roomId}`, { cache: 'no-store' });
      const data = await res.json();
      if (res.ok) {
        setJoined(data.room);
        if (data.room.participants.length >= data.room.minParticipants) {
          router.push(`/result/${roomId}`);
        }
      }
    }, 5000);
    return () => clearInterval(timer);
  }, [joined, roomId, router]);

  const handleSubmit = async () => {
    if (!team || busy) return;
    setBusy(true);
    setError('');
    try {
      const res = await fetch(`/api/rooms/${roomId}/join`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ team }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || '참여에 실패했습니다.');
      const updatedRoom: Room = data.room;
      if (updatedRoom.participants.length >= updatedRoom.minParticipants) {
        router.push(`/result/${roomId}`);
      } else {
        setJoined(updatedRoom);
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : '참여에 실패했습니다.');
      setBusy(false);
    }
  };

  if (error) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center px-6 text-center gap-4">
        <p className="text-accent-red">⚠️ {error}</p>
        <Link href="/create" className="text-muted underline text-sm">
          새로 직관메이트 지도 만들기
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

  if (joined) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center px-6 text-center gap-3">
        <div className="text-4xl">⏳</div>
        <p className="font-black text-lg">참여 완료!</p>
        <p className="text-muted text-sm">
          현재 {joined.participants.length}/{joined.maxParticipants}명 · {joined.minParticipants}명이 모이면 결과가
          자동으로 열려요.
        </p>
      </div>
    );
  }

  const host = room.participants.find((p) => p.isHost);

  return (
    <div className="flex flex-1 flex-col px-6 py-10 max-w-md mx-auto w-full">
      <div className="mb-6 space-y-1.5 text-center">
        <p className="text-muted text-xs font-bold tracking-wider">직관메이트 초대</p>
        <h1 className="text-xl font-black">
          {host?.team ?? '친구'} 팬이 만든
          <br />
          직관메이트 지도에 참여해요
        </h1>
        <p className="text-muted text-sm">
          현재 {room.participants.length}/{room.maxParticipants}명 참여중
        </p>
      </div>

      <p className="text-sm font-bold mb-2">내 응원팀은?</p>
      <TeamGridPicker value={team} onChange={setTeam} />

      {error && <p className="text-accent-red text-sm mt-3">⚠️ {error}</p>}

      <button
        onClick={handleSubmit}
        disabled={!team || busy}
        className="mt-8 w-full rounded-2xl py-3.5 font-black text-white transition-all disabled:opacity-40"
        style={{ background: 'var(--accent-red)' }}
      >
        {busy ? '참여하는 중…' : '참여 완료'}
      </button>
    </div>
  );
}
