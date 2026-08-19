import { forwardRef } from 'react';
import type { TeamCode } from '@/lib/teams';
import { getTeamRelationship, isSameTeamError } from '@/lib/teams';
import { teamColor } from '@/lib/teamColors';
import RelationshipCard from './RelationshipCard';

interface ParticipantView {
  id: string;
  team: TeamCode;
  isHost: boolean;
}

interface ResultCardCanvasProps {
  participants: ParticipantView[];
}

function allPairs(participants: ParticipantView[]) {
  const pairs: [ParticipantView, ParticipantView][] = [];
  for (let i = 0; i < participants.length; i++) {
    for (let j = i + 1; j < participants.length; j++) {
      pairs.push([participants[i], participants[j]]);
    }
  }
  return pairs;
}

const ResultCardCanvas = forwardRef<HTMLDivElement, ResultCardCanvasProps>(({ participants }, ref) => {
  const pairs = allPairs(participants);

  return (
    <div
      ref={ref}
      className="rounded-3xl p-6 space-y-5"
      style={{ background: 'linear-gradient(160deg, var(--surface-2) 0%, var(--background) 100%)' }}
    >
      <div className="text-center space-y-1">
        <p className="font-black text-lg" style={{ color: 'var(--accent-gold)' }}>
          🐸 직관메이트 지도
        </p>
        <p className="text-muted text-sm">{participants.length}명이 완성한 우리 팀 지도</p>
      </div>

      <div className="flex flex-wrap justify-center gap-2">
        {participants.map((p) => (
          <span
            key={p.id}
            className="text-xs font-bold px-3 py-1.5 rounded-full"
            style={{ background: `${teamColor(p.team)}22`, color: teamColor(p.team) }}
          >
            {p.isHost ? '👑 ' : ''}
            {p.team}
          </span>
        ))}
      </div>

      <div className="space-y-3">
        {pairs.map(([a, b]) => {
          const relationship = getTeamRelationship(a.team, b.team);
          if (isSameTeamError(relationship)) return null;
          return (
            <RelationshipCard key={`${a.id}-${b.id}`} teamA={a.team} teamB={b.team} relationship={relationship} />
          );
        })}
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-border">
        <span className="text-muted text-[11px] font-bold tracking-wider">FACTPEPE · 직관메이트</span>
        <span className="text-accent-red text-xs font-black">@factpepe_</span>
      </div>
    </div>
  );
});

ResultCardCanvas.displayName = 'ResultCardCanvas';

export default ResultCardCanvas;
