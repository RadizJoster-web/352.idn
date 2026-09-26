import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchCategoryBySlug } from '../../queries/categoryQueries';
import type { Category } from '../../types/category';
import { useInfiniteArticles } from '../../hooks/useInfiniteArticles';
import LoadingSkeleton from '../../components/common/LoadingSkeleton';
import EmptyState from '../../components/common/EmptyState';
import CategoryHeader from './CategoryHeader';
import ArticleListItemComponent from '../../components/article/ArticleListItem';
import { Sidebar } from '../../components/Sidebar';

export default function CategoryFeature() {
  const { slug = '' } = useParams<{ slug: string }>();
  const [category, setCategory] = useState<Category | null>(null);
  const [catLoading, setCatLoading] = useState(true);
  const { articles, loading, lastElementRef } = useInfiniteArticles(10, slug);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCatLoading(true);
    fetchCategoryBySlug(slug)
      .then((cat) => setCategory(cat))
      .catch(console.error)
      .finally(() => setCatLoading(false));
  }, [slug]);

  if (catLoading && loading)
    return <LoadingSkeleton variant="card" count={3} />;
  if (!catLoading && !category)
    return <EmptyState title="Kategori tidak ditemukan" showHomeLink />;

  return (
    <div className="mx-auto max-w-[var(--container-max)] px-4 py-8">
      {category && <CategoryHeader category={category} />}

      <div className="grid gap-10 lg:grid-cols-[1fr_300px]">
        {/* Left Column (Article List) */}
        <div className="min-w-0 max-w-full lg:max-w-[760px] xl:max-w-[800px] mx-auto lg:mx-0">
          {articles.length > 0 ? (
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
                  <ArticleListItemComponent
                    key={article._id}
                    article={article}
                  />
                );
              })}

              {loading && (
                <div className="py-4 text-center text-sm text-text-muted">
                  Memuat berita...
                </div>
              )}
            </div>
          ) : (
            !loading && <EmptyState />
          )}
        </div>

        {/* Right Sidebar — menggunakan Sidebar reusable */}
        <div className="hidden lg:block">
          <Sidebar />
        </div>
      </div>
    </div>
  );
}
