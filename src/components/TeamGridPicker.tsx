'use client';

import { TEAMS, TEAM_REGION, type TeamCode } from '@/lib/teams';
import { teamColor } from '@/lib/teamColors';

interface TeamGridPickerProps {
  value: TeamCode | null;
  onChange: (team: TeamCode) => void;
}

export default function TeamGridPicker({ value, onChange }: TeamGridPickerProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
      {TEAMS.map((team) => {
        const selected = value === team;
        const color = teamColor(team);
        return (
          <button
            key={team}
            type="button"
            onClick={() => onChange(team)}
            className="rounded-xl border py-4 px-2 flex flex-col items-center gap-1 transition-all"
            style={{
              borderColor: selected ? color : 'var(--border)',
              background: selected ? `${color}1a` : 'var(--surface)',
              boxShadow: selected ? `0 0 0 2px ${color}` : 'none',
            }}
          >
            <span className="font-black text-base" style={{ color: selected ? color : 'var(--foreground)' }}>
              {team}
            </span>
            <span className="text-[11px] text-muted">{TEAM_REGION[team]}</span>
          </button>
        );
      })}
    </div>
  );
}
