'use client';

import { useEffect, useState, useCallback } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import TeamGridPicker from '@/components/TeamGridPicker';
import RelationshipCard from '@/components/RelationshipCard';
import { getTeamRelationship, isSameTeamError, type TeamCode, type SeasonData } from '@/lib/teams';
import { NICKNAME_MAX_LENGTH } from '@/lib/mapConfig';

interface Friend {
  id: string;
  team: TeamCode;
  nickname: string;
}

interface Room {
  id: string;
  ownerTeam: TeamCode;
  friends: Friend[];
  maxFriends: number;
}

export default function JoinPage() {
  const { roomId } = useParams<{ roomId: string }>();
  const [room, setRoom] = useState<Room | null>(null);
  const [team, setTeam] = useState<TeamCode | null>(null);
  const [nickname, setNickname] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [registered, setRegistered] = useState<Friend | null>(null);
  const [seasonData, setSeasonData] = useState<SeasonData | null>(null);

  // 시즌 데이터 1회 로드
  useEffect(() => {
    fetch('/api/season', { cache: 'no-store' })
      .then((r) => r.json())
      .then((json) => { if (json.data) setSeasonData(json.data); })
      .catch(() => {});
  }, []);

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
  }, [fetchRoom]);

  const handleSubmit = async () => {
    const trimmedNickname = nickname.trim();
    if (!team || !trimmedNickname || busy) return;
    setBusy(true);
    setError('');
    try {
      const res = await fetch(`/api/rooms/${roomId}/join`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ team, nickname: trimmedNickname }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || '참여에 실패했습니다.');
      // 대기 없이 즉시 "방장 vs 나" 관계를 보여준다.
      setRegistered(data.friend as Friend);
    } catch (e) {
      setError(e instanceof Error ? e.message : '참여에 실패했습니다.');
    } finally {
      setBusy(false);
    }
  };

  if (error && !room) {
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

  const isFull = !registered && room.friends.length >= room.maxFriends;

  if (isFull) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center px-6 text-center gap-3">
        <p className="text-muted text-sm">
          이 지도는 정원({room.maxFriends}명)이 가득 찼어요.
        </p>
        <Link href="/create" className="text-accent-gold underline text-sm">
          내 지도 새로 만들기
        </Link>
      </div>
    );
  }

  const relationship = registered
    ? getTeamRelationship(room.ownerTeam, registered.team, seasonData)
    : null;

  return (
    <div className="flex flex-1 flex-col px-6 py-10 max-w-md mx-auto w-full">
      {!registered ? (
        <>
          <div className="mb-6 space-y-1.5 text-center">
            <p className="text-muted text-xs font-bold tracking-wider">직관메이트 초대</p>
            <h1 className="text-xl font-black">
              {room.ownerTeam} 팬이 만든
              <br />
              직관메이트 지도에 참여해요
            </h1>
            <p className="text-muted text-sm">현재 {room.friends.length}명 참여중</p>
          </div>

          <p className="text-sm font-bold mb-2">닉네임</p>
          <input
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value.slice(0, NICKNAME_MAX_LENGTH))}
            placeholder="닉네임을 입력해주세요"
            maxLength={NICKNAME_MAX_LENGTH}
            className="w-full rounded-xl border border-border px-3.5 py-2.5 mb-5 text-sm"
            style={{ background: 'var(--surface)' }}
          />

          <p className="text-sm font-bold mb-2">내 응원팀은?</p>
          <TeamGridPicker value={team} onChange={setTeam} />

          {error && <p className="text-accent-red text-sm mt-3">⚠️ {error}</p>}

          <button
            onClick={handleSubmit}
            disabled={!team || !nickname.trim() || busy}
            className="mt-8 w-full rounded-2xl py-3.5 font-black text-white transition-all disabled:opacity-40"
            style={{ background: 'var(--accent-red)' }}
          >
            {busy ? '참여하는 중…' : '참여 완료'}
          </button>
        </>
      ) : (
        <>
          <div className="text-center space-y-1 mb-4">
            <p className="text-muted text-xs font-bold tracking-wider">등록 완료!</p>
            <h1 className="text-xl font-black">
              {registered.nickname}님과 {room.ownerTeam}의 관계는?
            </h1>
          </div>

          {relationship && !isSameTeamError(relationship) && (
            <RelationshipCard ownerTeam={room.ownerTeam} friend={registered} relationship={relationship} />
          )}

          <div className="flex flex-col gap-2 pt-4">
            <Link
              href="/create"
              className="w-full rounded-2xl py-3.5 font-black text-white text-center transition-all"
              style={{ background: 'var(--accent-red)' }}
            >
              너도 네 지도 만들어봐 🐸
            </Link>
            <Link
              href={`/map/${room.id}`}
              className="w-full rounded-2xl py-3.5 font-black text-center border border-border"
              style={{ background: 'var(--surface)' }}
            >
              지도 전체 보기
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
