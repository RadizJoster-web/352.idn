import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function generateSitemap() {
  const SITEMAP_URL = 'https://352.idn'; // Sesuaikan dengan domain asli

  let projectId = process.env.VITE_SANITY_PROJECT_ID || process.env.SANITY_PROJECT_ID;
  let dataset = process.env.VITE_SANITY_DATASET || process.env.SANITY_DATASET;
  
  if (!projectId || !dataset) {
    try {
      const envFile = fs.readFileSync(path.join(__dirname, '..', '.env'), 'utf-8');
      const projectIdMatch = envFile.match(/(?:VITE_)?SANITY_PROJECT_ID=([^\r\n]+)/);
      const datasetMatch = envFile.match(/(?:VITE_)?SANITY_DATASET=([^\r\n]+)/);
      if (projectIdMatch) projectId = projectIdMatch[1];
      if (datasetMatch) dataset = datasetMatch[1];
    } catch (e) {
      // .env file might not exist, ignore
    }
  }
  
  if (!dataset) dataset = 'production';

  const staticRoutes = [
    '',
    '/jadwal',
    '/artikel-terbaru',
    '/tentang',
    '/redaksi',
    '/kontak',
    '/privacy-policy',
    '/terms-of-service',
    '/disclaimer',
    '/pedoman-media-siber'
  ];

  let sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

  for (const route of staticRoutes) {
    sitemapContent += `  <url>\n    <loc>${SITEMAP_URL}${route}</loc>\n    <changefreq>daily</changefreq>\n    <priority>${route === '' ? '1.0' : '0.8'}</priority>\n  </url>\n`;
  }
  
  if (projectId) {
    console.log('Fetching articles from Sanity for sitemap...');
    try {
      const query = encodeURIComponent('*[_type == "article"]{slug, _updatedAt}');
      const sanityUrl = `https://${projectId}.api.sanity.io/v2024-01-01/data/query/${dataset}?query=${query}`;
      
      const res = await fetch(sanityUrl);
      const data = await res.json();
      
      if (data.result && Array.isArray(data.result)) {
        data.result.forEach(article => {
          if (article.slug && article.slug.current) {
            sitemapContent += `  <url>\n    <loc>${SITEMAP_URL}/artikel/${article.slug.current}</loc>\n    <lastmod>${article._updatedAt}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.7</priority>\n  </url>\n`;
          }
        });
      }
    } catch (e) {
      console.error('Error fetching articles from Sanity:', e.message);
    }
  } else {
    console.warn('Sanity Project ID not found. Dynamic article routes will not be included in sitemap.');
  }

  sitemapContent += `</urlset>`;

  const publicDir = path.join(__dirname, '..', 'public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir);
  }
  
  fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemapContent);
  console.log('Sitemap generated successfully in public/sitemap.xml');
}

generateSitemap().catch(console.error);
