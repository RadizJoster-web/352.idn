import { useState, useEffect } from 'react';
import type { Author } from '../types/author';
import { fetchAuthorBySlug } from '../queries/authorQueries';

export function useAuthor(slug: string) {
  const [author, setAuthor] = useState<Author | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function loadAuthor() {
      try {
        setIsLoading(true);
        const fetchedAuthor = await fetchAuthorBySlug(slug);
        setAuthor(fetchedAuthor);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Gagal memuat data'));
      } finally {
        setIsLoading(false);
      }
    }
    loadAuthor();
  }, [slug]);

  return { author, isLoading, error };
}
