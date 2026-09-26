import type { Match } from '../../types/match'
import { formatTime } from '../../lib/formatDate'

type MatchListProps = {
  matches: Match[]
}

export default function MatchList({ matches }: MatchListProps) {
  const grouped = matches.reduce<Record<string, Match[]>>((acc, match) => {
    const key = match.competition
    if (!acc[key]) acc[key] = []
    acc[key].push(match)
    return acc
  }, {})

  return (
    <div className="space-y-6">
      {Object.entries(grouped).map(([competition, items]) => (
        <div key={competition}>
          <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-primary">{competition}</h3>
          <div className="space-y-2">
            {items.map((match) => (
              <div key={match.id} className="flex items-center rounded-md border border-border p-3">
                <span className="flex-1 truncate text-sm font-medium text-text">{match.homeTeam.name}</span>
                <span className="mx-3 rounded bg-surface px-3 py-1 text-sm font-medium text-text">
                  {match.status === 'finished' || match.status === 'live'
                    ? `${match.homeScore ?? 0} - ${match.awayScore ?? 0}`
                    : formatTime(match.kickoffAt)}
                </span>
                <span className="flex-1 truncate text-right text-sm font-medium text-text">{match.awayTeam.name}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
