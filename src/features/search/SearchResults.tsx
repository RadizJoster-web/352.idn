import type { ArticleListItem } from '../../types/article'
import ArticleListItemComponent from '../../components/article/ArticleListItem'

type SearchResultsProps = {
  articles: ArticleListItem[]
}

export default function SearchResults({ articles }: SearchResultsProps) {
  return (
    <div className="divide-y divide-border">
      {articles.map((article) => (
        <ArticleListItemComponent key={article._id} article={article} />
      ))}
    </div>
  )
}
