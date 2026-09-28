import { useInfiniteArticles } from '../../hooks/useInfiniteArticles';
import PageSimpleSkeleton from '../../components/common/skeleton/pages/PageSimpleSkeleton';
import EmptyState from '../../components/common/EmptyState';
import ArticleListItemComponent from '../../components/article/ArticleListItem';
import { Sidebar } from '../../components/Sidebar';
import GoogleAd from '../../components/Ads/GoogleAd';

export default function LatestFeature() {
  const { articles, loading, lastElementRef } = useInfiniteArticles(10);

  if (articles.length === 0 && loading) return <PageSimpleSkeleton />;
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
              const isAdPosition = index === 4;
              const isSecondToLast = index === articles.length - 2;

              return (
                <div key={article._id}>
                  {/* Ads Display List — di index ke-4 */}
                  {isAdPosition && (
                    <div className="py-4">
                      <GoogleAd type="list" />
                    </div>
                  )}
                  <div ref={isSecondToLast ? lastElementRef : null}>
                    <ArticleListItemComponent article={article} />
                  </div>
                </div>
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
