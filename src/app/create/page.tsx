'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import TeamGridPicker from '@/components/TeamGridPicker';
import type { TeamCode } from '@/lib/teams';

export default function CreatePage() {
  const router = useRouter();
  const [team, setTeam] = useState<TeamCode | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    if (!team || busy) return;
    setBusy(true);
    setError('');
    try {
      const res = await fetch('/api/rooms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ team }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || '방 생성에 실패했습니다.');
      router.push(`/map/${data.roomId}`);
    } catch (e) {
      setError(e instanceof Error ? e.message : '방 생성에 실패했습니다.');
      setBusy(false);
    }
  };

  return (
    <div className="flex flex-1 flex-col px-6 py-10 max-w-md mx-auto w-full">
      <div className="mb-6 space-y-1.5">
        <p className="text-muted text-xs font-bold tracking-wider">STEP 1</p>
        <h1 className="text-xl font-black">내 응원팀을 골라주세요</h1>
        <p className="text-muted text-sm">방장이 되어 친구들을 초대할 거예요.</p>
      </div>

      <TeamGridPicker value={team} onChange={setTeam} />

      {error && <p className="text-accent-red text-sm mt-3">⚠️ {error}</p>}

      <button
        onClick={handleSubmit}
        disabled={!team || busy}
        className="mt-8 w-full rounded-2xl py-3.5 font-black text-white transition-all disabled:opacity-40"
        style={{ background: 'var(--accent-red)' }}
      >
        {busy ? '만드는 중…' : '다음'}
      </button>
    </div>
  );
}
