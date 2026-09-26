import { Link } from 'react-router-dom';
import type { ArticleListItem as ArticleListItemType } from '../../types/article';
import SanityImage from '../media/SanityImage';
import CategoryBadge from '../common/CategoryBadge';
import { formatDate } from '../../lib/formatDate';

type ArticleListItemProps = {
  article: ArticleListItemType;
};

export default function ArticleListItem({ article }: ArticleListItemProps) {
  return (
    <article className="group flex gap-4 border-b border-border py-4 last:border-b-0">
      <Link
        to={`/artikel/${article.slug}`}
        className="relative h-24 w-36 shrink-0 overflow-hidden rounded-md lg:h-28 lg:w-44"
      >
        <SanityImage
          source={article.mainImage}
          alt={article.title}
          preset="compact"
          className="h-full w-full transition-transform duration-200 group-hover:scale-[1.03]"
        />
      </Link>
      <div className="flex-1 min-w-0">
        <div className="flex gap-2">
          <CategoryBadge
            title={article.category.title}
            slug={article.category.slug}
          />

          <time
            dateTime={article.publishedAt}
            className="text-xs text-text-muted"
          >
            {formatDate(article.publishedAt)}
          </time>
        </div>
        <Link to={`/artikel/${article.slug}`}>
          <h3 className="mt-1.5 text-base font-semibold leading-snug text-text line-clamp-2 transition-colors group-hover:text-primary lg:text-lg">
            {article.title}
          </h3>
          <p className="text-xs text-text-muted">{article.excerpt}</p>
        </Link>
      </div>
    </article>
  );
}
