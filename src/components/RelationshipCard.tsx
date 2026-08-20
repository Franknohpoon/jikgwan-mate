import type { TeamCode, TeamRelationship } from '@/lib/teams';
import { teamColor } from '@/lib/teamColors';

interface FriendView {
  team: TeamCode;
  nickname: string;
}

interface RelationshipCardProps {
  ownerTeam: TeamCode;
  friend: FriendView;
  relationship: TeamRelationship;
}

const TIER_STYLE: Record<string, { bg: string; label: string }> = {
  S: { bg: 'var(--accent-gold)', label: 'S급 라이벌' },
  A: { bg: 'var(--accent-red)', label: 'A급 라이벌' },
  B: { bg: '#38bdf8', label: 'B급 라이벌' },
  C: { bg: '#8b8b9e', label: 'C급 동맹' },
};

export default function RelationshipCard({ ownerTeam, friend, relationship }: RelationshipCardProps) {
  const ownerColor = teamColor(ownerTeam);
  const friendColor = teamColor(friend.team);
  const isPending = relationship.type === 'dynamic_pending';
  const tierStyle = relationship.tier ? TIER_STYLE[relationship.tier] : null;

  return (
    <div
      className="rounded-2xl border p-4 space-y-2.5"
      style={{
        borderColor: isPending ? 'var(--border)' : `${ownerColor}40`,
        background: 'var(--surface)',
      }}
    >
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 text-sm font-black">
          <span style={{ color: ownerColor }}>{ownerTeam}</span>
          <span className="text-muted font-normal">vs</span>
          <span style={{ color: friendColor }}>
            {friend.nickname} <span className="text-muted font-normal">({friend.team})</span>
          </span>
        </div>
        {tierStyle && (
          <span
            className="text-[10px] font-bold px-2 py-0.5 rounded-full text-black shrink-0"
            style={{ background: tierStyle.bg }}
          >
            {tierStyle.label}
          </span>
        )}
      </div>

      <p className="font-bold text-[15px]">
        {isPending ? '관계 분석 예정 🐸' : relationship.name}
      </p>

      <p className="text-[13px] text-muted leading-relaxed">{relationship.description}</p>

      {relationship.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 pt-0.5">
          {relationship.tags.map((tag) => (
            <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-surface-2 text-muted">
              #{tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
