export type RawMatchResponse = {
  id: string | number
  competition: { name: string }
  homeTeam: { name: string; crest?: string }
  awayTeam: { name: string; crest?: string }
  utcDate: string
  status: string
  score: {
    fullTime: { home: number | null; away: number | null }
  }
}
