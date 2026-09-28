import { useTimnasArticles } from '../../hooks/useTimnasArticles';
import SectionHeader from '../common/SectionHeader';
import CompactArticleCard from '../article/CompactArticleCard';
import GoogleAd from '../Ads/GoogleAd';

/**
 * Sidebar — Komponen reusable yang muncul di berbagai halaman.
 *
 * Sifat:
 * - Layout vertikal
 * - Sticky mengikuti scroll window
 *
 * Isi:
 * 1. Ads Display Square (atas section Timnas)
 * 2. Artikel Timnas Indonesia
 * 3. Ads Display Vertikal (bawah section Timnas)
 *
 * Penggunaan:
 * ```tsx
 * <aside className="hidden lg:block">
 *   <Sidebar />
 * </aside>
 * ```
 */

type SidebarProps = {
  /** Konten khusus halaman yang ditampilkan di atas konten default */
  children?: React.ReactNode;
  /** Jumlah artikel timnas yang ditampilkan */
  timnasLimit?: number;
  /** Tampilkan/sembunyikan section Timnas */
  showTimnas?: boolean;
  /** Tampilkan/sembunyikan iklan */
  showAds?: boolean;
  /** CSS class tambahan */
  className?: string;
};

export default function Sidebar({
  children,
  timnasLimit = 4,
  showTimnas = true,
  showAds = true,
  className = '',
}: SidebarProps) {
  const { articles: timnasArticles, isLoading } =
    useTimnasArticles(timnasLimit);

  return (
    <div
      className={`sticky top-24 space-y-8 ${className}`}
      role="complementary"
      aria-label="Sidebar"
    >
      {/* Konten khusus halaman (e.g., berita terkait) */}
      {children}

      {/* Ads Display Square — di atas section Timnas */}
      {showAds && (
        <div className="flex justify-center">
          <GoogleAd type="square" />
        </div>
      )}

      {/* Section Timnas Indonesia */}
      {showTimnas && (
        <section>
          <SectionHeader
            title="Timnas Indonesia"
            href="/kategori/timnas-indonesia"
          />
          {isLoading ? (
            <TimnasSkeleton />
          ) : timnasArticles.length > 0 ? (
            <div className="flex flex-col gap-4">
              {timnasArticles.map((article) => (
                <CompactArticleCard key={article._id} article={article} />
              ))}
            </div>
          ) : null}
        </section>
      )}

      {/* Ads Display Vertikal — di bawah section Timnas */}
      {showAds && (
        <div className="flex justify-center">
          <GoogleAd type="vertikal" />
        </div>
      )}
    </div>
  );
}

/** Loading skeleton untuk section Timnas */
function TimnasSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="flex gap-3 animate-pulse">
          <div className="h-16 w-24 flex-shrink-0 rounded-md bg-surface" />
          <div className="flex-1 space-y-2 py-1">
            <div className="h-3 w-full rounded bg-surface" />
            <div className="h-3 w-2/3 rounded bg-surface" />
          </div>
        </div>
      ))}
    </div>
  );
}
