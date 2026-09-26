import { Link } from 'react-router-dom';
import type { ArticleListItem } from '../../types/article';
import SanityImage from '../media/SanityImage';
import { formatDate } from '../../lib/formatDate';

type ArticleSquareCardType = {
  article: ArticleListItem;
};

export default function ArticleSquareCard({ article }: ArticleSquareCardType) {
  return (
    <article className="group">
      <Link to={`/artikel/${article.slug}`} className="flex flex-col gap-3">
        {/* Kontainer Gambar */}
        <div className="relative w-full aspect-[4/3] overflow-hidden rounded-sm">
          <SanityImage
            source={article.mainImage}
            alt={article.title}
            preset="compact"
            className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-[1.03]"
          />
        </div>

        {/* Informasi Artikel */}
        <div className="flex flex-col gap-1">
          {/* Tanggal / Waktu Rilis */}
          <time
            dateTime={article.publishedAt}
            className="text-xs text-text-muted"
          >
            {formatDate(article.publishedAt)}
          </time>

          {/* Judul Artikel */}
          <h3 className="text-base font-semibold leading-snug text-text line-clamp-3 transition-colors group-hover:text-primary">
            {article.title}
          </h3>
        </div>
      </Link>
    </article>
  );
}
