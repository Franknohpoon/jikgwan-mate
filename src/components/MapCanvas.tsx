import { forwardRef, useState } from 'react';
import type { TeamCode, SeasonData } from '@/lib/teams';
import { getTeamRelationship, isSameTeamError } from '@/lib/teams';
import { teamColor } from '@/lib/teamColors';
import { RADIAL_VIEW_MAX } from '@/lib/mapConfig';
import RelationshipCard from './RelationshipCard';

export interface FriendEntry {
  id: string;
  team: TeamCode;
  nickname: string;
  joinedAt: number;
}

interface MapCanvasProps {
  ownerTeam: TeamCode;
  friends: FriendEntry[];
  seasonData?: SeasonData | null;
}

export type SortMode = 'recent'; // 추후 'tier' 등 추가 여지를 남겨둔 유니언 타입

// 정렬 기준을 함수로 분리 — 지금은 최신 등록순만 지원하지만, 기준이 늘어나도
// 호출부(MapCanvas)는 바뀌지 않는다.
export function sortFriends(friends: FriendEntry[], mode: SortMode = 'recent'): FriendEntry[] {
  switch (mode) {
    case 'recent':
    default:
      return [...friends].sort((a, b) => b.joinedAt - a.joinedAt);
  }
}

function RadialDiagram({
  ownerTeam,
  friends,
  selectedId,
  onSelect,
}: {
  ownerTeam: TeamCode;
  friends: FriendEntry[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}) {
  const n = friends.length;
  const radiusPct = 30;

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[300px]">
      {/* 중심: 방장 */}
      <div
        className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full text-xs font-black"
        style={{ background: teamColor(ownerTeam), color: '#0b0b12' }}
      >
        <span>👑</span>
        <span>{ownerTeam}</span>
      </div>

      {friends.map((friend, i) => {
        const angle = (2 * Math.PI * i) / n - Math.PI / 2;
        const left = 50 + radiusPct * Math.cos(angle);
        const top = 50 + radiusPct * Math.sin(angle);
        const selected = friend.id === selectedId;
        return (
          <button
            key={friend.id}
            type="button"
            onClick={() => onSelect(friend.id)}
            className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center transition-transform"
            style={{
              left: `${left}%`,
              top: `${top}%`,
              transform: `translate(-50%, -50%) scale(${selected ? 1.1 : 1})`,
            }}
            title={`${friend.nickname} (${friend.team})`}
          >
            <span
              className="flex h-10 w-10 flex-col items-center justify-center rounded-full text-[10px] font-black shrink-0"
              style={{
                background: `${teamColor(friend.team)}${selected ? '' : '33'}`,
                color: selected ? '#0b0b12' : teamColor(friend.team),
                boxShadow: selected ? `0 0 0 2px ${teamColor(friend.team)}` : 'none',
              }}
            >
              {friend.team}
            </span>
            <span
              className="text-[9px] font-bold max-w-[56px] truncate text-center leading-tight mt-0.5"
              style={{ color: teamColor(friend.team) }}
            >
              {friend.nickname}
            </span>
          </button>
        );
      })}
    </div>
  );
}

const MapCanvas = forwardRef<HTMLDivElement, MapCanvasProps>(({ ownerTeam, friends, seasonData }, ref) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const isRadial = friends.length <= RADIAL_VIEW_MAX;
  const sorted = sortFriends(friends, 'recent');

  return (
    <div
      ref={ref}
      className="rounded-3xl p-6 space-y-5"
      style={{ background: 'linear-gradient(160deg, var(--surface-2) 0%, var(--background) 100%)' }}
    >
      <div className="text-center space-y-1">
        <p className="font-black text-lg" style={{ color: 'var(--accent-gold)' }}>
          🐸 {ownerTeam} 팬의 직관메이트 지도
        </p>
        <p className="text-muted text-sm">
          {friends.length === 0 ? '아직 등록된 친구가 없어요' : `친구 ${friends.length}명이 등록됐어요`}
        </p>
      </div>

      {isRadial && friends.length > 0 && (
        <RadialDiagram ownerTeam={ownerTeam} friends={friends} selectedId={selectedId} onSelect={setSelectedId} />
      )}

      {friends.length === 0 ? (
        <p className="text-center text-muted text-sm py-6">링크를 공유해서 첫 친구를 초대해보세요!</p>
      ) : (
        <div className="space-y-3">
          {sorted.map((friend) => {
            const relationship = getTeamRelationship(ownerTeam, friend.team, seasonData);
            if (isSameTeamError(relationship)) return null;
            return (
              <div key={friend.id} id={`friend-${friend.id}`}>
                <RelationshipCard ownerTeam={ownerTeam} friend={friend} relationship={relationship} />
              </div>
            );
          })}
        </div>
      )}

      <div className="flex items-center justify-between pt-2 border-t border-border">
        <span className="text-muted text-[11px] font-bold tracking-wider">FACTPEPE · 직관메이트</span>
        <span className="text-accent-red text-xs font-black">@factpepe_</span>
      </div>
    </div>
  );
});

MapCanvas.displayName = 'MapCanvas';

export default MapCanvas;
