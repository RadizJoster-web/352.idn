import { Helmet } from 'react-helmet-async';
import { SITE_NAME } from '../lib/constants';

type AuthorSchema = {
  name: string;
};

type NewsArticleSchemaProps = {
  headline: string;
  image: string[];
  datePublished: string;
  dateModified?: string;
  author: AuthorSchema | AuthorSchema[];
  url: string;
  isMatchReport?: boolean;
  matchDetails?: {
    homeTeam: string;
    awayTeam: string;
    startDate: string;
    location: string;
  };
};

export default function NewsArticleSchema({
  headline,
  image,
  datePublished,
  dateModified,
  author,
  url,
  isMatchReport = false,
  matchDetails,
}: NewsArticleSchemaProps) {
  const jsonLd: any = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    headline,
    image,
    datePublished,
    dateModified: dateModified || datePublished,
    author: Array.isArray(author)
      ? author.map((a) => ({ '@type': 'Person', name: a.name }))
      : { '@type': 'Person', name: author.name },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      logo: {
        '@type': 'ImageObject',
        url: `${typeof window !== 'undefined' ? window.location.origin : 'https://352.idn'}/logo.png`, // Placeholder
      },
    },
  };

  const schemas = [jsonLd];

  if (isMatchReport && matchDetails) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'SportsEvent',
      name: `${matchDetails.homeTeam} vs ${matchDetails.awayTeam}`,
      startDate: matchDetails.startDate,
      location: {
        '@type': 'Place',
        name: matchDetails.location,
      },
      homeTeam: {
        '@type': 'SportsTeam',
        name: matchDetails.homeTeam,
      },
      awayTeam: {
        '@type': 'SportsTeam',
        name: matchDetails.awayTeam,
      },
      url,
    });
  }

  return (
    <Helmet>
      {schemas.map((schema, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
}
