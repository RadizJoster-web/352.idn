import { useState, useEffect } from 'react'
import type { ArticleListItem } from '../types/article'
import { fetchHeroArticle, fetchHotArticles, fetchTimnasArticles } from '../queries/articleQueries'

type HomeData = {
  hero: ArticleListItem | null
  hot: ArticleListItem[]
  timnas: ArticleListItem[]
}

export function useHomeArticles() {
  const [data, setData] = useState<HomeData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    let cancelled = false
    async function load() {
      try {
        setIsLoading(true)
        const [hero, hot, timnas] = await Promise.all([
          fetchHeroArticle(),
          fetchHotArticles(4),
          fetchTimnasArticles(4),
        ])
        if (!cancelled) setData({ hero, hot, timnas })
      } catch (err) {
        if (!cancelled) setError(err instanceof Error ? err : new Error('Gagal memuat data'))
      } finally {
        if (!cancelled) setIsLoading(false)
      }
    }
    load()
    return () => { cancelled = true }
  }, [])

  return { data, isLoading, error }
}
