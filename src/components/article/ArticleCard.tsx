import { Link } from 'react-router-dom';
import type { ArticleListItem } from '../../types/article';
import SanityImage from '../media/SanityImage';
import CategoryBadge from '../common/CategoryBadge';
import TimeAgo from '../common/TimeAgo';

type ArticleCardProps = {
  article: ArticleListItem;
  priority?: boolean;
};

export default function ArticleCard({
  article,
  priority = false,
}: ArticleCardProps) {
  return (
    <article className="group overflow-hidden rounded-lg bg-surface-elevated shadow-[0_1px_2px_rgb(15_23_42/0.05)] transition-shadow duration-200 hover:shadow-[0_10px_30px_rgb(15_23_42/0.08)]">
      <Link to={`/artikel/${article.slug}`} className="block">
        <div className="relative aspect-video overflow-hidden">
          <SanityImage
            source={article.mainImage}
            alt={article.title}
            preset="card"
            priority={priority}
            className="h-full w-full transition-transform duration-200 group-hover:scale-[1.03]"
          />
          <div className="absolute bottom-3 left-3">
            <CategoryBadge title={article.category.title} />
          </div>
        </div>
      </Link>
      <div className="p-4">
        <Link to={`/artikel/${article.slug}`}>
          <h3 className="text-lg font-semibold leading-snug text-text line-clamp-2 transition-colors group-hover:text-primary">
            {article.title}
          </h3>
        </Link>
        <div className="mt-2 flex items-center gap-2 text-xs">
          <TimeAgo date={article.publishedAt} className="text-xs" />
        </div>
      </div>
    </article>
  );
}
