import { Link } from 'react-router-dom';

import type { ArticleDetail } from '../../types/article';
import Breadcrumb from '../../components/common/Breadcrumb';
import { formatDate } from '../../lib/formatDate';
import { urlFor } from '../../services/sanity/image';

type ArticleHeaderProps = {
  article: ArticleDetail;
};

const truncateWords = (text: string, maxWords: number) => {
  const words = text.split(' ');
  if (words.length > maxWords) {
    return words.slice(0, maxWords).join(' ') + '...';
  }
  return text;
};

export default function ArticleHeader({ article }: ArticleHeaderProps) {
  return (
    <header className="mb-6">
      <Breadcrumb
        items={[
          {
            label: article.category.title,
            href: `/kategori/${article.category.slug}`,
          },
          { label: truncateWords(article.title, 6) },
        ]}
      />

      <h1 className="mt-4 text-2xl font-semibold font-serif leading-tight text-text sm:text-3xl lg:text-4xl">
        {article.title}
      </h1>
      <p className="mt-4 text-md text-text-secondary leading-relaxed">
        {article.excerpt}
      </p>

      <div className="mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-y border-border py-4 text-sm text-text-muted">
        {/* Author & Date Section (Left) */}
        <div className="flex items-center gap-3">
          {article.author.avatar ? (
            <img
              src={urlFor(article.author.avatar).width(80).height(80).url()}
              alt={article.author.name}
              className="w-10 h-10 rounded-full object-cover bg-surface"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-surface flex items-center justify-center text-text-muted font-medium font-serif text-lg">
              {article.author.name.charAt(0)}
            </div>
          )}

          <div className="flex flex-col">
            <Link
              to={`/penulis/${article.author.slug}`}
              className="font-semibold text-text hover:underline"
            >
              {article.author.name}
            </Link>
            <time
              dateTime={article.publishedAt}
              className="text-xs text-text-muted"
            >
              Diterbitkan {formatDate(article.publishedAt)}
            </time>
          </div>
        </div>
      </div>
    </header>
  );
}
