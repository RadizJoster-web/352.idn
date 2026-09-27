import { Helmet } from 'react-helmet-async';
import { SITE_NAME } from '../lib/constants';

export type SEOProps = {
  title?: string;
  description?: string;
  slug?: string;
  ogImage?: string;
  ogType?: string;
  publishedAt?: string;
  modifiedAt?: string;
  author?: string;
  section?: string;
};

export default function SEO({
  title,
  description = '352.IDN - Portal berita sepak bola terpercaya. Berita terkini, skor pertandingan, dan analisis mendalam.',
  slug = '',
  ogImage,
  ogType = 'website',
  publishedAt,
  modifiedAt,
  author,
  section,
}: SEOProps) {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME;
  // Get canonical URL based on slug
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://352.idn'; // Update domain as needed
  const canonicalUrl = slug ? `${baseUrl}/${slug.replace(/^\//, '')}` : baseUrl;

  // Use dynamic og:image if provided (for Sanity image URL or Netlify OG endpoint)
  const defaultImage = `${baseUrl}/default-og.jpg`; // A fallback image
  const finalImage = ogImage || defaultImage;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={finalImage} />
      <meta property="og:site_name" content={SITE_NAME} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={finalImage} />

      {/* Article specific Meta Tags */}
      {publishedAt && <meta property="article:published_time" content={publishedAt} />}
      {modifiedAt && <meta property="article:modified_time" content={modifiedAt} />}
      {author && <meta property="article:author" content={author} />}
      {section && <meta property="article:section" content={section} />}
    </Helmet>
  );
}
