import type { Match } from '../../types/match'
import type { RawMatchResponse } from './types'
import { normalizeMatch } from './normalizer'

const PROXY_BASE = '/api/football'

export async function fetchMatches(date?: string): Promise<Match[]> {
  try {
    const params = date ? `?date=${date}` : ''
    const res = await fetch(`${PROXY_BASE}/matches${params}`)
    if (!res.ok) throw new Error(`Football API error: ${res.status}`)
    const data: { matches: RawMatchResponse[] } = await res.json()
    return data.matches.map(normalizeMatch)
  } catch (error) {
    console.error('Failed to fetch matches:', error)
    return []
  }
}
