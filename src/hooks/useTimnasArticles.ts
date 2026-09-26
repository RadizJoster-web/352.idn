import { useState, useEffect } from 'react';
import type { ArticleListItem } from '../types/article';
import { fetchTimnasArticles } from '../queries/articleQueries';

/**
 * Hook untuk fetch artikel Timnas Indonesia secara independen.
 * Digunakan oleh Sidebar agar bisa tampil di semua halaman
 * tanpa bergantung pada data halaman tertentu.
 */
export function useTimnasArticles(limit = 4) {
  const [articles, setArticles] = useState<ArticleListItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        setIsLoading(true);
        const data = await fetchTimnasArticles(limit);
        if (!cancelled) setArticles(data);
      } catch (err) {
        console.error('Gagal memuat artikel timnas untuk sidebar:', err);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [limit]);

  return { articles, isLoading };
}
