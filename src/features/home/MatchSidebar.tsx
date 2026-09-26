import type { Match } from '../../types/match'
import { formatTime } from '../../lib/formatDate'

type MatchSidebarProps = {
  matches: Match[]
}

export default function MatchSidebar({ matches }: MatchSidebarProps) {
  if (matches.length === 0) return null

  return (
    <aside className="rounded-lg bg-dark p-4" aria-label="Jadwal Pertandingan">
      <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-text-on-dark">Pertandingan</h3>
      <div className="space-y-3">
        {matches.slice(0, 5).map((match) => (
          <div key={match.id} className="rounded-md bg-dark-soft p-3">
            <div className="text-[10px] font-medium uppercase tracking-wide text-primary">
              {match.competition}
            </div>
            <div className="mt-2 flex items-center justify-between text-sm text-text-on-dark">
              <span className="flex-1 truncate font-medium">{match.homeTeam.name}</span>
              <span className="mx-2 rounded bg-dark px-2 py-0.5 text-xs font-medium">
                {match.status === 'finished' || match.status === 'live'
                  ? `${match.homeScore ?? 0} - ${match.awayScore ?? 0}`
                  : formatTime(match.kickoffAt)}
              </span>
              <span className="flex-1 truncate text-right font-medium">{match.awayTeam.name}</span>
            </div>
            <div className="mt-1 text-center">
              <StatusBadge status={match.status} />
            </div>
          </div>
        ))}
      </div>
    </aside>
  )
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    live: 'text-alert font-medium',
    finished: 'text-text-on-dark/50',
    scheduled: 'text-primary',
    postponed: 'text-text-on-dark/40',
    cancelled: 'text-text-on-dark/40',
  }
  const labels: Record<string, string> = {
    live: '● LIVE',
    finished: 'Selesai',
    scheduled: 'Akan Datang',
    postponed: 'Ditunda',
    cancelled: 'Dibatalkan',
  }
  return <span className={`text-[10px] uppercase ${styles[status] || ''}`}>{labels[status] || status}</span>
}
