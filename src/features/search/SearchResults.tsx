import type { ArticleListItem } from '../../types/article';
import ArticleListItemComponent from '../../components/article/ArticleListItem';
import { AdUnit } from '../../components/AdsUnit';

type SearchResultsProps = {
  articles: ArticleListItem[];
};

export default function SearchResults({ articles }: SearchResultsProps) {
  return (
    <div className="divide-y divide-border">
      {articles.map((article, index) => (
        <div key={article._id}>
          {/* Ads Display List — di index ke-4 */}
          {index === 4 && (
            <div className="py-4">
              <AdUnit
                adSlot="6840264105"
                adFormat="fluid"
                adLayoutKey="-ez+5q+5e-d4+4m"
              />
            </div>
          )}
          <ArticleListItemComponent article={article} />
        </div>
      ))}
    </div>
  );
}
