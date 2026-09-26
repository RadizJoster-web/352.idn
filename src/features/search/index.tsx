import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useSearchArticles } from '../../hooks/useSearchArticles';
import LoadingSkeleton from '../../components/common/LoadingSkeleton';
import ErrorState from '../../components/common/ErrorState';
import EmptyState from '../../components/common/EmptyState';
import Pagination from '../../components/common/Pagination';
import SearchHeader from './SearchHeader';
import SearchResults from './SearchResults';
import { Sidebar } from '../../components/Sidebar';

export default function SearchFeature() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [page, setPage] = useState(1);
  const { articles, total, totalPages, isLoading, error } = useSearchArticles(
    query,
    page
  );

  return (
    <div className="mx-auto max-w-[var(--container-max)] px-4 py-8">
      <div className="grid gap-10 lg:grid-cols-[1fr_300px]">
        {/* Left Column (Search Results) */}
        <div className="min-w-0 max-w-full lg:max-w-[760px] xl:max-w-[800px] mx-auto lg:mx-0">
          <SearchHeader query={query} total={total} />
          {isLoading && <LoadingSkeleton variant="list" count={5} />}
          {error && <ErrorState message="Pencarian gagal." />}
          {!isLoading && !error && articles.length === 0 && query && (
            <EmptyState
              title="Tidak ada hasil"
              description={`Tidak ditemukan berita untuk "${query}"`}
            />
          )}
          {articles.length > 0 && <SearchResults articles={articles} />}
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </div>

        {/* Right Sidebar */}
        <div className="hidden lg:block">
          <Sidebar />
        </div>
      </div>
    </div>
  );
}
