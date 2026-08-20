'use client';

import { useEffect, useState, useCallback } from 'react';
import {
  TEAMS,
  FIXED_RIVALRIES,
  HEUNGCHAMDONG_PAIRS,
  pairKey,
  getTeamRelationship,
  isSameTeamError,
  type TeamCode,
} from '@/lib/teams';
import type { SeasonData, StandingsEntry, HeadToHeadEntry } from '@/lib/dynamicRelationship';

// ─── 동적 25쌍 목록 산출 ─────────────────────────────────────────────

function allPairs(): [TeamCode, TeamCode][] {
  const pairs: [TeamCode, TeamCode][] = [];
  for (let i = 0; i < TEAMS.length; i++) {
    for (let j = i + 1; j < TEAMS.length; j++) {
      pairs.push([TEAMS[i], TEAMS[j]]);
    }
  }
  return pairs;
}

function getDynamicPairs(): [TeamCode, TeamCode][] {
  return allPairs().filter(([a, b]) => {
    const key = pairKey(a, b);
    return !FIXED_RIVALRIES.has(key) && !HEUNGCHAMDONG_PAIRS.has(key);
  });
}

const DYNAMIC_PAIRS = getDynamicPairs();

// ─── 초기 상태 ───────────────────────────────────────────────────────

function emptyStandings(): StandingsEntry[] {
  return TEAMS.map((team, i) => ({ team, rank: i + 1 }));
}

function emptyH2H(): HeadToHeadEntry[] {
  return DYNAMIC_PAIRS.map(([a, b]) => ({
    teamA: a,
    teamB: b,
    wins: 0,
    draws: 0,
    losses: 0,
  }));
}

function todayStr(): string {
  return new Date().toISOString().slice(0, 10);
}

// ─── 컴포넌트 ────────────────────────────────────────────────────────

export default function AdminPage() {
  const [standings, setStandings] = useState<StandingsEntry[]>(emptyStandings);
  const [standingsDate, setStandingsDate] = useState(todayStr);
  const [h2h, setH2H] = useState<HeadToHeadEntry[]>(emptyH2H);
  const [h2hDate, setH2HDate] = useState(todayStr);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');
  const [loaded, setLoaded] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  // ── 기존 데이터 로드 ──
  const loadData = useCallback(async () => {
    try {
      const res = await fetch('/api/season', { cache: 'no-store' });
      const json = await res.json();
      if (json.data) {
        const data = json.data as SeasonData;
        if (data.standings?.entries?.length) {
          setStandings(data.standings.entries);
          setStandingsDate(data.standings.updatedAt || todayStr());
        }
        if (data.headToHead?.entries?.length) {
          // 기존 데이터를 동적 쌍 기준으로 매핑
          const saved = new Map(
            data.headToHead.entries.map((e) => [pairKey(e.teamA, e.teamB), e]),
          );
          setH2H(
            DYNAMIC_PAIRS.map(([a, b]) => {
              const key = pairKey(a, b);
              const existing = saved.get(key);
              if (existing) {
                // 저장된 데이터의 teamA/teamB 순서를 DYNAMIC_PAIRS 기준으로 정규화
                if (existing.teamA === a) return existing;
                return {
                  teamA: a,
                  teamB: b,
                  wins: existing.losses,
                  draws: existing.draws,
                  losses: existing.wins,
                };
              }
              return { teamA: a, teamB: b, wins: 0, draws: 0, losses: 0 };
            }),
          );
          setH2HDate(data.headToHead.updatedAt || todayStr());
        }
      }
    } catch {
      // Redis 미연결 시 빈 폼으로 시작
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // ── 순위 변경 ──
  const updateRank = (team: TeamCode, rank: number) => {
    setStandings((prev) => prev.map((e) => (e.team === team ? { ...e, rank } : e)));
  };

  // ── 상대전적 변경 ──
  const updateH2H = (
    idx: number,
    field: 'wins' | 'draws' | 'losses',
    value: number,
  ) => {
    setH2H((prev) => {
      const next = [...prev];
      next[idx] = { ...next[idx], [field]: value };
      return next;
    });
  };

  // ── 저장 ──
  const handleSave = async () => {
    setBusy(true);
    setMessage('');
    try {
      const seasonData: SeasonData = {
        standings: { entries: standings, updatedAt: standingsDate },
        headToHead: { entries: h2h, updatedAt: h2hDate },
      };
      const res = await fetch('/api/season', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(seasonData),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || '저장 실패');
      setMessage('✅ 저장 완료');
    } catch (e) {
      setMessage(`❌ ${e instanceof Error ? e.message : '저장 실패'}`);
    } finally {
      setBusy(false);
    }
  };

  // ── 미리보기용 시즌 데이터 ──
  const previewSeasonData: SeasonData = {
    standings: { entries: standings, updatedAt: standingsDate },
    headToHead: { entries: h2h, updatedAt: h2hDate },
  };

  if (!loaded) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <p className="text-muted text-sm">불러오는 중…</p>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col px-4 py-8 max-w-2xl mx-auto w-full gap-6">
      <div>
        <h1 className="text-xl font-black">⚙️ 시즌 데이터 관리</h1>
        <p className="text-muted text-sm mt-1">
          순위표와 상대전적을 입력하면 동적 관계 25쌍이 자동으로 계산됩니다.
        </p>
      </div>

      {/* ── 순위표 ── */}
      <section className="rounded-2xl border border-border p-4 space-y-3" style={{ background: 'var(--surface)' }}>
        <div className="flex items-center justify-between">
          <h2 className="font-black">📊 순위표</h2>
          <label className="text-xs text-muted flex items-center gap-1.5">
            기준일
            <input
              type="date"
              value={standingsDate}
              onChange={(e) => setStandingsDate(e.target.value)}
              className="rounded border border-border px-2 py-1 text-xs"
              style={{ background: 'var(--background)' }}
            />
          </label>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {standings
            .sort((a, b) => a.rank - b.rank)
            .map((entry) => (
              <div key={entry.team} className="flex items-center gap-2">
                <input
                  type="number"
                  min={1}
                  max={10}
                  value={entry.rank}
                  onChange={(e) => updateRank(entry.team, parseInt(e.target.value) || 1)}
                  className="w-12 rounded border border-border px-2 py-1 text-center text-sm"
                  style={{ background: 'var(--background)' }}
                />
                <span className="text-sm font-bold">{entry.team}</span>
                {entry.rank <= 5 && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded-full text-black font-bold" style={{ background: 'var(--accent-gold)' }}>
                    가을야구
                  </span>
                )}
              </div>
            ))}
        </div>
      </section>

      {/* ── 상대전적 ── */}
      <section className="rounded-2xl border border-border p-4 space-y-3" style={{ background: 'var(--surface)' }}>
        <div className="flex items-center justify-between">
          <h2 className="font-black">⚾ 상대전적 ({DYNAMIC_PAIRS.length}쌍)</h2>
          <label className="text-xs text-muted flex items-center gap-1.5">
            기준일
            <input
              type="date"
              value={h2hDate}
              onChange={(e) => setH2HDate(e.target.value)}
              className="rounded border border-border px-2 py-1 text-xs"
              style={{ background: 'var(--background)' }}
            />
          </label>
        </div>
        <div className="space-y-2">
          {h2h.map((entry, idx) => (
            <div key={`${entry.teamA}-${entry.teamB}`} className="flex items-center gap-2 text-sm">
              <span className="w-20 font-bold shrink-0">{entry.teamA}-{entry.teamB}</span>
              <input
                type="number"
                min={0}
                value={entry.wins}
                onChange={(e) => updateH2H(idx, 'wins', parseInt(e.target.value) || 0)}
                className="w-12 rounded border border-border px-2 py-1 text-center text-xs"
                style={{ background: 'var(--background)' }}
                placeholder="승"
              />
              <input
                type="number"
                min={0}
                value={entry.draws}
                onChange={(e) => updateH2H(idx, 'draws', parseInt(e.target.value) || 0)}
                className="w-12 rounded border border-border px-2 py-1 text-center text-xs"
                style={{ background: 'var(--background)' }}
                placeholder="무"
              />
              <input
                type="number"
                min={0}
                value={entry.losses}
                onChange={(e) => updateH2H(idx, 'losses', parseInt(e.target.value) || 0)}
                className="w-12 rounded border border-border px-2 py-1 text-center text-xs"
                style={{ background: 'var(--background)' }}
                placeholder="패"
              />
              <span className="text-muted text-xs shrink-0">
                {entry.wins + entry.losses > 0
                  ? `${Math.round((Math.max(entry.wins, entry.losses) / (entry.wins + entry.losses)) * 100)}%`
                  : '-'}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ── 저장 버튼 ── */}
      <div className="flex items-center gap-3">
        <button
          onClick={handleSave}
          disabled={busy}
          className="rounded-2xl px-8 py-3.5 font-black text-white transition-all disabled:opacity-40"
          style={{ background: 'var(--accent-red)' }}
        >
          {busy ? '저장 중…' : '💾 저장'}
        </button>
        <button
          onClick={() => setShowPreview(!showPreview)}
          className="rounded-2xl px-6 py-3.5 font-black border border-border"
          style={{ background: 'var(--surface)' }}
        >
          {showPreview ? '미리보기 닫기' : '🔍 미리보기'}
        </button>
        {message && <p className="text-sm">{message}</p>}
      </div>

      {/* ── 미리보기 ── */}
      {showPreview && (
        <section className="rounded-2xl border border-border p-4 space-y-3" style={{ background: 'var(--surface)' }}>
          <h2 className="font-black">🔍 동적 관계 미리보기</h2>
          <p className="text-muted text-xs">저장 전 입력값 기준으로 계산한 결과입니다.</p>
          <div className="space-y-2">
            {DYNAMIC_PAIRS.map(([a, b]) => {
              const result = getTeamRelationship(a, b, previewSeasonData);
              if (isSameTeamError(result)) return null;
              const isDynamic = result.type === 'dynamic';
              return (
                <div
                  key={`${a}-${b}`}
                  className="flex items-center justify-between gap-2 text-sm py-1.5 border-b border-border last:border-0"
                >
                  <span className="font-bold">{a} vs {b}</span>
                  {isDynamic ? (
                    <div className="flex items-center gap-2 text-right">
                      <span>{result.name}</span>
                      <span className="text-muted text-xs">케미 {result.chemistry_score}</span>
                    </div>
                  ) : (
                    <span className="text-muted text-xs">데이터 없음</span>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}
