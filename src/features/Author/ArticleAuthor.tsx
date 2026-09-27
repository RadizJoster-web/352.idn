import type { ArticleListItem as ArticleListItemProps } from '../../types/article';
import ArticleListItem from '../../components/article/ArticleListItem';

interface ArticleAuthorProps {
  articles: ArticleListItemProps[];
  isLoading: boolean;
  error: Error | null;
  currentPage: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
}

export default function ArticleAuthor({
  articles,
  isLoading,
  error,
  currentPage,
  totalPages,
  onPageChange,
}: ArticleAuthorProps) {
  return (
    <section id="articles-section" className="mt-12 scroll-mt-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold tracking-tight text-text">ARTIKEL</h2>

        {totalPages > 1 && (
          <span className="text-xs text-text-muted">
            Halaman {currentPage} dari {totalPages}
          </span>
        )}
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="h-64 rounded-xl border border-border bg-surface animate-pulse"
            />
          ))}
        </div>
      ) : error ? (
        <div className="p-8 text-center border border-border rounded-xl bg-surface">
          <p className="text-text-muted text-sm">Gagal memuat artikel.</p>
        </div>
      ) : articles.length === 0 ? (
        <div className="p-8 text-center border border-border rounded-xl bg-surface">
          <p className="text-text-muted text-sm">
            Belum ada artikel yang ditulis.
          </p>
        </div>
      ) : (
        <>
          {/* Komponen Grid Artikel Anda */}
          {articles.map((article, i) => (
            <ArticleListItem key={i} article={article} />
          ))}

          {/* Pagination */}
          {totalPages > 1 && (
            <nav
              className="mt-10 flex flex-wrap items-center justify-center gap-2 pt-6 border-t border-border"
              aria-label="Pagination"
            >
              <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="inline-flex items-center justify-center rounded-lg border border-border bg-surface px-3 py-2 text-xs font-medium text-text transition-colors hover:bg-primary-soft disabled:opacity-40 disabled:cursor-not-allowed"
              >
                ← Sebelumnya
              </button>

              <div className="flex items-center gap-1">
                {[...Array(totalPages)].map((_, index) => {
                  const pageNumber = index + 1;
                  const isActive = pageNumber === currentPage;

                  return (
                    <button
                      key={pageNumber}
                      onClick={() => onPageChange(pageNumber)}
                      className={`h-9 w-9 rounded-lg border text-xs font-semibold transition-colors ${
                        isActive
                          ? 'border-primary bg-primary text-text-on-primary'
                          : 'border-border bg-surface text-text hover:border-primary-hover hover:bg-primary-soft'
                      }`}
                    >
                      {pageNumber}
                    </button>
                  );
                })}
              </div>

              <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="inline-flex items-center justify-center rounded-lg border border-border bg-surface px-3 py-2 text-xs font-medium text-text transition-colors hover:bg-primary-soft disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Selanjutnya →
              </button>
            </nav>
          )}
        </>
      )}
    </section>
  );
}
