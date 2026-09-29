import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import type { ArticleDetail } from '../../types/article';
import type { ArticleListItem } from '../../types/article';
import {
  fetchArticleBySlug,
  fetchRelatedArticles,
} from '../../queries/articleQueries';
import { urlFor } from '../../services/sanity/image';
import SEO from '../../components/SEO';
import NewsArticleSchema from '../../components/NewsArticleSchema';
import PageArticleSkeleton from '../../components/common/skeleton/pages/PageArticleSkeleton';
import ErrorState from '../../components/common/ErrorState';
import SanityImage from '../../components/media/SanityImage';
import ArticleHeader from './ArticleHeader';
import ArticleBody from './ArticleBody';
import ArticleSidebar from './ArticleSidebar';
import RelatedArticles from '../../components/article/RelatedArticles';
import { Sidebar } from '../../components/Sidebar';
import { AdUnit } from '../../components/AdsUnit';

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

  if (isLoading) return <PageArticleSkeleton />;
  if (error) return <ErrorState message="Gagal memuat artikel." />;
  if (!article) return <ErrorState message="Artikel tidak ditemukan." />;

  const mainImageAlt =
    (article.mainImage as { alt?: string } | undefined)?.alt || article.title;

  return (
    <>
      <SEO
        title={article.seoTitle || article.title}
        description={article.seoDescription || article.excerpt}
        slug={`artikel/${article.slug}`}
        ogType="article"
        ogImage={
          article.seoImage
            ? urlFor(article.seoImage).width(1200).url()
            : urlFor(article.mainImage).width(1200).url()
        }
        publishedAt={article.publishedAt}
        author={article.author.name}
        section={article.category.title}
      />
      <NewsArticleSchema
        headline={article.title}
        image={[urlFor(article.mainImage).width(1200).url()]}
        datePublished={article.publishedAt}
        author={{ name: article.author.name }}
        url={
          typeof window !== 'undefined'
            ? `${window.location.origin}/artikel/${article.slug}`
            : `https://352.idn/artikel/${article.slug}`
        }
      />
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
                priority={true}
                className="w-full object-cover"
              />

              <div className="p-4 bg-primary-soft">
                <p className="text-xs text-text-muted italic">{mainImageAlt}</p>
              </div>
            </div>

            <ArticleBody content={article.content} />

            {/* Ads Display Article — auto placement oleh Google */}
            <AdUnit
              adSlot="8209186098"
              adFormat="fluid"
              adLayout="in-article"
              style={{ display: 'block', textAlign: 'center' }}
            />
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
    </>
  );
}
