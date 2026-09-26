import { useInfiniteArticles } from '../../hooks/useInfiniteArticles';
import LoadingSkeleton from '../../components/common/LoadingSkeleton';
import EmptyState from '../../components/common/EmptyState';
import ArticleListItemComponent from '../../components/article/ArticleListItem';
import { Sidebar } from '../../components/Sidebar';

export default function LatestFeature() {
  const { articles, loading, lastElementRef } = useInfiniteArticles(10);

  if (articles.length === 0 && loading)
    return <LoadingSkeleton variant="card" count={3} />;
  if (articles.length === 0 && !loading)
    return <EmptyState title="Artikel tidak ditemukan" showHomeLink />;

  return (
    <div className="mx-auto max-w-[var(--container-max)] px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold tracking-tight text-text-primary font-serif">
          Artikel Terbaru
        </h1>
        <p className="mt-2 text-text-muted">Berita terbaru dan terkini.</p>
      </div>

      <div className="grid gap-10 lg:grid-cols-[1fr_300px]">
        {/* Left Column (Article List) */}
        <div className="min-w-0 max-w-full lg:max-w-[760px] xl:max-w-[800px] mx-auto lg:mx-0">
          <div className="divide-y divide-border">
            {articles.map((article, index) => {
              if (index === articles.length - 2) {
                return (
                  <div ref={lastElementRef} key={article._id}>
                    <ArticleListItemComponent article={article} />
                  </div>
                );
              }
              return (
                <ArticleListItemComponent key={article._id} article={article} />
              );
            })}

            {loading && (
              <div className="py-4 text-center text-sm text-text-muted">
                Memuat berita...
              </div>
            )}
          </div>
        </div>

        {/* Right Sidebar — menggunakan Sidebar reusable */}
        <div className="hidden lg:block">
          <Sidebar />
        </div>
      </div>
    </div>
  );
}
