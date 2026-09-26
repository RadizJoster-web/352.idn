import { useState, useEffect } from 'react'
import type { ArticleListItem } from '../types/article'
import type { Category } from '../types/category'
import { fetchCategoryArticles, fetchCategoryArticleCount } from '../queries/articleQueries'
import { fetchCategoryBySlug } from '../queries/categoryQueries'

const PAGE_SIZE = 10

export function useCategoryArticles(slug: string, page = 1) {
  const [category, setCategory] = useState<Category | null>(null)
  const [articles, setArticles] = useState<ArticleListItem[]>([])
  const [total, setTotal] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    let cancelled = false
    async function load() {
      try {
        setIsLoading(true)
        const start = (page - 1) * PAGE_SIZE
        const end = start + PAGE_SIZE
        const [cat, items, count] = await Promise.all([
          fetchCategoryBySlug(slug),
          fetchCategoryArticles(slug, start, end),
          fetchCategoryArticleCount(slug),
        ])
        if (!cancelled) {
          setCategory(cat)
          setArticles(items)
          setTotal(count)
        }
      } catch (err) {
        if (!cancelled) setError(err instanceof Error ? err : new Error('Gagal memuat kategori'))
      } finally {
        if (!cancelled) setIsLoading(false)
      }
    }
    load()
    return () => { cancelled = true }
  }, [slug, page])

  const totalPages = Math.ceil(total / PAGE_SIZE)
  return { category, articles, total, totalPages, isLoading, error }
}
