import type { ArticleListItem } from '../../types/article';
import CompactArticleCard from '../../components/article/CompactArticleCard';

type HotArticlesProps = {
  articles: ArticleListItem[];
};

export default function HotArticles({ articles }: HotArticlesProps) {
  if (articles.length === 0) return null;

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mt-6">
      {articles.map((article) => (
        <CompactArticleCard key={article._id} article={article} />
      ))}
    </div>
  );
}
