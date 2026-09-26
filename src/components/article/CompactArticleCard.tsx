import { Link } from 'react-router-dom';
import type { ArticleListItem } from '../../types/article';
import SanityImage from '../media/SanityImage';

type CompactArticleCardProps = {
  article: ArticleListItem;
};

export default function CompactArticleCard({
  article,
}: CompactArticleCardProps) {
  return (
    <article className="group">
      <Link to={`/artikel/${article.slug}`} className="flex items-center gap-3">
        <div className="relative h-20 w-20 aspect-square shrink-0 overflow-hidden rounded-sm">
          <SanityImage
            source={article.mainImage}
            alt={article.title}
            preset="compact"
            className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-[1.03]"
          />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold leading-snug text-text line-clamp-2 transition-colors group-hover:text-primary">
            {article.title}
          </h3>
        </div>
      </Link>
    </article>
  );
}
