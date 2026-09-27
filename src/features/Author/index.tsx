import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuthor } from '../../hooks/useAuthor';
import { useArticlesByAuthor } from '../../hooks/useArticlesByAuthor';

import Header from './Header';
import ArticleAuthor from './ArticleAuthor';

export default function AuthorProfile() {
  const { slug = 'anonymous' } = useParams<{ slug: string }>();

  // 1. Fetching Data
  const {
    author,
    isLoading: isAuthorLoading,
    error: authorError,
  } = useAuthor(slug);
  const {
    articles = [],
    isLoading: isArticlesLoading,
    error: articlesError,
    setStart,
  } = useArticlesByAuthor(slug);

  // 2. State Management (Pagination)
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 3;

  // Counting how many author wrote article
  const totalPosts = articles.length;
  const totalPages = Math.ceil(totalPosts / ITEMS_PER_PAGE);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      setStart((newPage - 1) * ITEMS_PER_PAGE);

      // Smooth scroll ke ID yang ada di ArticleAuthor.tsx
      const articleSection = document.getElementById('articles-section');
      if (articleSection) {
        articleSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  // 3. Layout Management: Loading & Error States
  if (isAuthorLoading) {
    return (
      <main className="mx-auto min-h-screen max-w-[var(--container-max)] px-4 py-12">
        <div className="animate-pulse rounded-2xl border border-border bg-surface p-8">
          <div className="flex flex-col items-center sm:flex-row sm:items-start gap-6">
            <div className="h-24 w-24 rounded-full bg-border" />
            <div className="flex-1 space-y-3 w-full">
              <div className="h-8 w-48 rounded bg-border" />
              <div className="h-4 w-24 rounded bg-border" />
              <div className="h-16 w-full rounded bg-border mt-4" />
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (authorError || !author) {
    return (
      <main className="mx-auto min-h-screen max-w-[var(--container-max)] px-4 py-12">
        <div className="rounded-2xl border border-border bg-surface p-12 text-center">
          <h1 className="text-xl font-bold text-text">
            Penulis tidak ditemukan
          </h1>
          <p className="mt-2 text-sm text-text-muted">
            Profil yang Anda cari mungkin telah dihapus atau tidak tersedia.
          </p>
        </div>
      </main>
    );
  }

  // 4. Layout Management: Main UI Rendering
  return (
    <main className="mx-auto min-h-screen max-w-[var(--container-max)] px-4 py-8 sm:py-12">
      <Header author={author} totalPosts={totalPosts} />

      <ArticleAuthor
        articles={articles}
        isLoading={isArticlesLoading}
        error={articlesError}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </main>
  );
}
