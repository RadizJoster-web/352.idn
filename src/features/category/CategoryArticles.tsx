import type { ArticleListItem } from '../../types/article';
import ArticleCard from '../../components/article/ArticleCard';

type CategoryArticlesProps = {
  articles: ArticleListItem[];
};

export default function CategoryArticles({ articles }: CategoryArticlesProps) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {articles.map((article) => (
        <ArticleCard key={article._id} article={article} />
      ))}
    </div>
  );
}
