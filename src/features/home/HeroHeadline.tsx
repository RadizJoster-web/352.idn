import { Link } from 'react-router-dom';
import type { ArticleListItem } from '../../types/article';
import SanityImage from '../../components/media/SanityImage';
import CategoryBadge from '../../components/common/CategoryBadge';
import TimeAgo from '../../components/common/TimeAgo';

type HeroHeadlineProps = {
  article: ArticleListItem;
};

export default function HeroHeadline({ article }: HeroHeadlineProps) {
  return (
    <section className="group relative overflow-hidden rounded-xl bg-dark text-white aspect-square md:aspect-[21/9] lg:aspect-[2.5/1]">
      <div className="absolute inset-0">
        <SanityImage
          source={article.mainImage}
          alt={article.title}
          preset="hero"
          priority
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {/* Lapiskan background hitam di depan gambar posisi 30% dari bawah gradasi */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent top-[30%]" />
      </div>

      <div className="absolute inset-x-0 bottom-0 p-6 md:p-8 flex flex-col justify-end">
        <CategoryBadge
          title={article.category.title}
          slug={article.category.slug}
          size="sm"
          className="mb-3 self-start"
        />

        <Link to={`/artikel/${article.slug}`} className="block">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold font-serif leading-tight text-white hover:text-primary-soft transition-colors">
            {article.title}
          </h1>
        </Link>

        <p className="mt-3 line-clamp-2 text-sm text-gray-200 lg:max-w-3xl">
          {article.excerpt}
        </p>

        <div className="mt-4 flex items-center gap-2">
          <TimeAgo
            date={article.publishedAt}
            className="text-xs text-gray-300 font-medium"
          />
        </div>
      </div>
    </section>
  );
}
