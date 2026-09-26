export type MatchStatus = 'scheduled' | 'live' | 'finished' | 'postponed' | 'cancelled'

export type Team = {
  name: string
  logo?: string
}

export type Match = {
  id: string
  competition: string
  homeTeam: Team
  awayTeam: Team
  kickoffAt: string
  status: MatchStatus
  homeScore?: number
  awayScore?: number
}
