import type { Match, MatchStatus } from '../../types/match'
import type { RawMatchResponse } from './types'

function normalizeStatus(status: string): MatchStatus {
  const map: Record<string, MatchStatus> = {
    SCHEDULED: 'scheduled',
    TIMED: 'scheduled',
    IN_PLAY: 'live',
    PAUSED: 'live',
    FINISHED: 'finished',
    POSTPONED: 'postponed',
    CANCELLED: 'cancelled',
  }
  return map[status] || 'scheduled'
}

export function normalizeMatch(raw: RawMatchResponse): Match {
  return {
    id: String(raw.id),
    competition: raw.competition.name,
    homeTeam: { name: raw.homeTeam.name, logo: raw.homeTeam.crest },
    awayTeam: { name: raw.awayTeam.name, logo: raw.awayTeam.crest },
    kickoffAt: raw.utcDate,
    status: normalizeStatus(raw.status),
    homeScore: raw.score.fullTime.home ?? undefined,
    awayScore: raw.score.fullTime.away ?? undefined,
  }
}
