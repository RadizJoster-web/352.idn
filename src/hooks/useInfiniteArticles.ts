import { useState, useEffect, useRef, useCallback } from 'react'
import type { ArticleListItem } from '../types/article'
import { fetchLatestArticles, fetchCategoryArticles } from '../queries/articleQueries'

export function useInfiniteArticles(initialLimit = 10, categorySlug?: string) {
  const [articles, setArticles] = useState<ArticleListItem[]>([])
  const [loading, setLoading] = useState(true)
  const [hasMore, setHasMore] = useState(true)
  const [page, setPage] = useState(1)
  
  const observer = useRef<IntersectionObserver | null>(null)

  const loadMore = useCallback(async () => {
    if (loading || !hasMore) return
    setLoading(true)
    try {
      const start = page * initialLimit
      const end = start + initialLimit
      
      const newArticles = categorySlug 
        ? await fetchCategoryArticles(categorySlug, start, end)
        : await fetchLatestArticles(start, end)
      
      if (newArticles.length < initialLimit) {
        setHasMore(false)
      }
      
      setArticles((prev) => [...prev, ...newArticles])
      setPage((prev) => prev + 1)
    } catch (error) {
      console.error('Failed to load more articles:', error)
    } finally {
      setLoading(false)
    }
  }, [page, loading, hasMore, initialLimit, categorySlug])

  useEffect(() => {
    let mounted = true
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLoading(true)
    setPage(1)
    
    const fetchFn = categorySlug 
      ? fetchCategoryArticles(categorySlug, 0, initialLimit)
      : fetchLatestArticles(0, initialLimit)
      
    fetchFn
      .then((data: ArticleListItem[]) => {
        if (mounted) {
          setArticles(data)
          if (data.length < initialLimit) setHasMore(false)
          setLoading(false)
        }
      })
      .catch((err: unknown) => {
        console.error(err)
        if (mounted) setLoading(false)
      })
      
    return () => { mounted = false }
  }, [initialLimit, categorySlug])

  // Call this ref on the 8th item (or whichever you want to trigger loading)
  const lastElementRef = useCallback((node: HTMLElement | null) => {
    if (loading) return
    if (observer.current) observer.current.disconnect()
    
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore) {
        loadMore()
      }
    })
    
    if (node) observer.current.observe(node)
  }, [loading, hasMore, loadMore])

  return { articles, loading, hasMore, lastElementRef }
}
