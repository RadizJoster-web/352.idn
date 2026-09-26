import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import type { ArticleDetail } from '../../types/article';
import type { ArticleListItem } from '../../types/article';
import {
  fetchArticleBySlug,
  fetchRelatedArticles,
} from '../../queries/articleQueries';
import { setSeoMeta, setJsonLd } from '../../lib/seo';
import { urlFor } from '../../services/sanity/image';
import LoadingSkeleton from '../../components/common/LoadingSkeleton';
import ErrorState from '../../components/common/ErrorState';
import SanityImage from '../../components/media/SanityImage';
import ArticleHeader from './ArticleHeader';
import ArticleBody from './ArticleBody';
import ArticleSidebar from './ArticleSidebar';
import RelatedArticles from '../../components/article/RelatedArticles';
import { Sidebar } from '../../components/Sidebar';

export default function ArticleFeature() {
  const { slug = '' } = useParams<{ slug: string }>();
  const [article, setArticle] = useState<ArticleDetail | null>(null);
  const [related, setRelated] = useState<ArticleListItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        setIsLoading(true);
        const data = await fetchArticleBySlug(slug);
        if (cancelled) return;
        setArticle(data);
        if (data) {
          const rel = await fetchRelatedArticles(
            data.category.slug,
            data._id,
            4,
          );
          if (!cancelled) setRelated(rel);
          setSeoMeta({
            title: data.seoTitle || data.title,
            description: data.seoDescription || data.excerpt,
            ogType: 'article',
            ogImage: data.seoImage
              ? urlFor(data.seoImage).width(1200).url()
              : urlFor(data.mainImage).width(1200).url(),
            publishedTime: data.publishedAt,
            author: data.author.name,
            section: data.category.title,
            canonical: `${window.location.origin}/artikel/${data.slug}`,
          });
          setJsonLd({
            '@context': 'https://schema.org',
            '@type': 'NewsArticle',
            headline: data.title,
            image: urlFor(data.mainImage).width(1200).url(),
            datePublished: data.publishedAt,
            author: { '@type': 'Person', name: data.author.name },
            publisher: { '@type': 'Organization', name: '352.IDN' },
            mainEntityOfPage: `${window.location.origin}/artikel/${data.slug}`,
          });
        }
      } catch (err) {
        if (!cancelled)
          setError(
            err instanceof Error ? err : new Error('Gagal memuat artikel'),
          );
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [slug]);

  if (isLoading) return <LoadingSkeleton variant="body" />;
  if (error) return <ErrorState message="Gagal memuat artikel." />;
  if (!article) return <ErrorState message="Artikel tidak ditemukan." />;

  return (
    <article className="mx-auto max-w-[var(--container-max)] px-4 py-8">
      <div className="grid gap-10 lg:grid-cols-[1fr_300px] ">
        {/* Konten Kiri (Header, Gambar, Body) */}
        <div className="min-w-0 max-w-full lg:max-w-[760px] xl:max-w-[800px] mx-auto lg:mx-0">
          <ArticleHeader article={article} />

          <div className="relative mb-8 overflow-hidden rounded-lg">
            <SanityImage
              source={article.mainImage}
              alt={article.title}
              preset="featured"
              priority
              className="w-full object-cover"
            />
          </div>

          <ArticleBody content={article.content} />
        </div>

        {/* Sidebar Kanan — menggunakan Sidebar reusable */}
        <div className="hidden lg:block">
          <Sidebar>
            {/* Berita terkait sebagai konten khusus halaman artikel */}
            <ArticleSidebar related={related} />
          </Sidebar>
        </div>
      </div>

      <RelatedArticles articles={related} />
    </article>
  );
}
