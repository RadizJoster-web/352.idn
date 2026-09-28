import { createClient } from '@sanity/client';
import type { Handler } from '@netlify/functions';

const sanity = createClient({
  projectId: process.env.VITE_SANITY_PROJECT_ID || process.env.SANITY_PROJECT_ID || '',
  dataset: process.env.VITE_SANITY_DATASET || process.env.SANITY_DATASET || 'production',
  apiVersion: process.env.VITE_SANITY_API_VERSION || '2024-01-01',
  useCdn: false,
});

const SITE_URL = process.env.URL || 'https://352idn';

export const handler: Handler = async (event, context) => {
  try {
    // Fetch all articles and categories for sitemap
    const query = `{
      "articles": *[_type == "article"]{ slug, _updatedAt, publishedAt },
      "categories": *[_type == "category"]{ slug, _updatedAt }
    }`;

    const data = await sanity.fetch(query);

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Static Pages -->
  <url>
    <loc>${SITE_URL}/</loc>
    <changefreq>hourly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${SITE_URL}/kontak</loc>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>
  <url>
    <loc>${SITE_URL}/redaksi</loc>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>
  
  <!-- Categories -->
  ${data.categories
    .map(
      (cat: any) => `
  <url>
    <loc>${SITE_URL}/kategori/${cat.slug.current}</loc>
    <lastmod>${cat._updatedAt || new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>`
    )
    .join('')}

  <!-- Articles -->
  ${data.articles
    .map(
      (article: any) => `
  <url>
    <loc>${SITE_URL}/artikel/${article.slug.current}</loc>
    <lastmod>${article._updatedAt || article.publishedAt}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`
    )
    .join('')}
</urlset>`;

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600', // Cache for 1 hour
      },
      body: sitemap,
    };
  } catch (error) {
    console.error('Error generating sitemap.xml:', error);
    return {
      statusCode: 500,
      body: 'Error generating sitemap.xml',
    };
  }
};
