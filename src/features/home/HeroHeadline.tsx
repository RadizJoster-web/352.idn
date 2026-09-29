import { Link } from 'react-router-dom';
import type { ArticleListItem } from '../../types/article';
import SanityImage from '../../components/media/SanityImage';
import TimeAgo from '../../components/common/TimeAgo';
import CategoryBadge from '../../components/common/CategoryBadge';

type HeroHeadlineProps = {
  article: ArticleListItem;
};

export default function HeroHeadline({ article }: HeroHeadlineProps) {
  return (
    <Link
      to={`/artikel/${article.slug}`}
      className="group bg-dark text-white flex flex-col"
    >
      {/* 1. Container Gambar dengan aspect ratio yang konsisten di mobile & desktop (contoh: 16/9) */}
      <div className="relative w-full lg:h-100 aspect-[16/9] overflow-hidden rounded-xl">
        <SanityImage
          source={article.mainImage}
          alt={article.title}
          preset="hero"
          priority={true}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>

      {/* 2. Container Teks (Badge Kategori, Judul, Deskripsi, Tanggal) di BAWAH gambar */}
      <div className="flex flex-col py-4 gap-2">
        {/* Badge / Link Kategori */}
        <div>
          <CategoryBadge
            title={article.category.title}
            slug={article.category.slug}
          />
        </div>

        {/* Judul Artikel */}
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold leading-tight transition-colors group-hover:text-primary text-text ">
          {article.title}
        </h1>

        {/* Deskripsi / Excerpt */}
        <p className="line-clamp-2 text-sm text-text-muted lg:max-w-3xl">
          {article.excerpt}
        </p>

        {/* Waktu Publish */}
        <div className="mt-2 flex items-center gap-2">
          <TimeAgo
            date={article.publishedAt}
            className="text-xs text-gray-400 font-medium"
          />
        </div>
      </div>
    </Link>
  );
}
