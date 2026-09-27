import { useState, useEffect } from 'react';
import type { ArticleListItem } from '../types/article';
import { fetchArticlesByAuthor } from '../queries/articleQueries';

export function useArticlesByAuthor(authorSlug: string) {
  const [articles, setArticles] = useState<ArticleListItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [start, setStart] = useState(0);
  const end = start + 3;

  useEffect(() => {
    const loadArticles = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const articles = await fetchArticlesByAuthor(authorSlug, start, end);
        setArticles(articles);
      } catch (err) {
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    };

    loadArticles();
  }, [authorSlug, start]);

  return { articles, isLoading, error, setStart };
}
