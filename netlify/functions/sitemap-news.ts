import { createClient } from '@sanity/client';
import type { Handler } from '@netlify/functions';

// We use process.env here as it runs in Node.js on Netlify
const sanity = createClient({
  projectId: process.env.VITE_SANITY_PROJECT_ID || process.env.SANITY_PROJECT_ID || '',
  dataset: process.env.VITE_SANITY_DATASET || process.env.SANITY_DATASET || 'production',
  apiVersion: process.env.VITE_SANITY_API_VERSION || '2024-01-01',
  useCdn: false, // Don't use CDN for sitemaps to get the freshest data
});

const SITE_URL = process.env.URL || 'https://352.idn'; // Update to the real production URL
const SITE_NAME = '352.IDN';
const SITE_LANGUAGE = 'id';

export const handler: Handler = async (event, context) => {
  try {
    // 48 hours ago in ISO string
    const fortyEightHoursAgo = new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString();

    const query = `*[_type == "article" && publishedAt > $fortyEightHoursAgo] | order(publishedAt desc) {
      slug,
      title,
      publishedAt,
      "authorName": author->name
    }`;

    const articles = await sanity.fetch(query, { fortyEightHoursAgo });

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
  ${articles
    .map(
      (article: any) => `
  <url>
    <loc>${SITE_URL}/artikel/${article.slug.current}</loc>
    <news:news>
      <news:publication>
        <news:name>${SITE_NAME}</news:name>
        <news:language>${SITE_LANGUAGE}</news:language>
      </news:publication>
      <news:publication_date>${article.publishedAt}</news:publication_date>
      <news:title><![CDATA[${article.title}]]></news:title>
    </news:news>
  </url>`
    )
    .join('')}
</urlset>`;

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=0, must-revalidate', // No cache or minimal cache for news sitemap
      },
      body: sitemap,
    };
  } catch (error) {
    console.error('Error generating sitemap-news.xml:', error);
    return {
      statusCode: 500,
      body: 'Error generating sitemap-news.xml',
    };
  }
};
