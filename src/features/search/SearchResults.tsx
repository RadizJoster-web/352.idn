import type { ArticleListItem } from '../../types/article'
import ArticleListItemComponent from '../../components/article/ArticleListItem'
import GoogleAd from '../../components/Ads/GoogleAd'

type SearchResultsProps = {
  articles: ArticleListItem[]
}

export default function SearchResults({ articles }: SearchResultsProps) {
  return (
    <div className="divide-y divide-border">
      {articles.map((article, index) => (
        <div key={article._id}>
          {/* Ads Display List — di index ke-4 */}
          {index === 4 && (
            <div className="py-4">
              <GoogleAd type="list" />
            </div>
          )}
          <ArticleListItemComponent article={article} />
        </div>
      ))}
    </div>
  )
}
