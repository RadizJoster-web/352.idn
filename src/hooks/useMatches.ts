import { useState, useEffect } from 'react'
import type { Match } from '../types/match'
import { fetchMatches } from '../services/football/client'

export function useMatches(date?: string) {
  const [matches, setMatches] = useState<Match[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    let cancelled = false
    async function load() {
      try {
        setIsLoading(true)
        const data = await fetchMatches(date)
        if (!cancelled) setMatches(data)
      } catch (err) {
        if (!cancelled) setError(err instanceof Error ? err : new Error('Gagal memuat jadwal'))
      } finally {
        if (!cancelled) setIsLoading(false)
      }
    }
    load()
    return () => { cancelled = true }
  }, [date])

  return { matches, isLoading, error }
}
