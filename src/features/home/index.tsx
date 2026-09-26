import { useHomeArticles } from '../../hooks/useArticles';
import { useMatches } from '../../hooks/useMatches';
import LoadingSkeleton from '../../components/common/LoadingSkeleton';
import ErrorState from '../../components/common/ErrorState';
import HeroHeadline from './HeroHeadline';
import HotArticles from './HotArticles';
import LatestNews from './LatestNews';
import MatchSidebar from './MatchSidebar';
import { Sidebar } from '../../components/Sidebar';

export default function HomeFeature() {
  const { data, isLoading, error } = useHomeArticles();
  const { matches } = useMatches();

  if (isLoading) return <LoadingSkeleton variant="hero" />;
  if (error)
    return (
      <ErrorState
        message="Gagal memuat halaman beranda."
        onRetry={() => window.location.reload()}
      />
    );
  if (!data) return null;

  return (
    <div className="mx-auto max-w-[var(--container-max)] px-4">
      <div className="grid gap-6 py-6 lg:grid-cols-[1fr_320px]">
        <div className="flex flex-col space-y-10 min-w-0">
          <div>
            {data.hero && <HeroHeadline article={data.hero} />}
            {data.hot && data.hot.length > 0 && (
              <HotArticles articles={data.hot} />
            )}
          </div>

          {/* Sidebar Mobile: Tampil di bawah Support headline */}
          <aside className="block lg:hidden">
            <Sidebar showTimnas={true}>
              <MatchSidebar matches={matches} />
            </Sidebar>
          </aside>

          <LatestNews />
        </div>

        {/* Sidebar Desktop */}
        <aside className="hidden lg:block">
          <Sidebar showTimnas={true}>
            <MatchSidebar matches={matches} />
          </Sidebar>
        </aside>
      </div>
    </div>
  );
}
