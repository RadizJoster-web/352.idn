import type { ArticleListItem } from '../../types/article';
import SectionHeader from '../common/SectionHeader';
import ArticleCard from './ArticleCard';

type RelatedArticlesProps = {
  articles: ArticleListItem[];
};

export default function RelatedArticles({ articles }: RelatedArticlesProps) {
  if (articles.length === 0) return null;

  return (
    <section className="mt-12">
      <SectionHeader title="Berita Terkait" />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {articles.map((article) => (
          <ArticleCard key={article._id} article={article} />
        ))}
      </div>
    </section>
  );
}
