import { useState, useEffect } from 'react'
import type { ArticleListItem } from '../types/article'
import { fetchSearchArticles, fetchSearchCount } from '../queries/articleQueries'
import { useDebounce } from './useDebounce'

const PAGE_SIZE = 10

export function useSearchArticles(query: string, page = 1) {
  const debouncedQuery = useDebounce(query, 400)
  const [articles, setArticles] = useState<ArticleListItem[]>([])
  const [total, setTotal] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    if (!debouncedQuery.trim()) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setArticles([])
       
      setTotal(0)
      return
    }

    let cancelled = false
    async function search() {
      try {
        setIsLoading(true)
        const start = (page - 1) * PAGE_SIZE
        const end = start + PAGE_SIZE
        const [items, count] = await Promise.all([
          fetchSearchArticles(debouncedQuery, start, end),
          fetchSearchCount(debouncedQuery),
        ])
        if (!cancelled) {
          setArticles(items)
          setTotal(count)
        }
      } catch (err) {
        if (!cancelled) setError(err instanceof Error ? err : new Error('Pencarian gagal'))
      } finally {
        if (!cancelled) setIsLoading(false)
      }
    }
    search()
    return () => { cancelled = true }
  }, [debouncedQuery, page])

  const totalPages = Math.ceil(total / PAGE_SIZE)
  return { articles, total, totalPages, isLoading, error, searchQuery: debouncedQuery }
}
