import type { ArticleListItem } from '../../types/article'
import ArticleCard from '../../components/article/ArticleCard'

type CategoryFeaturedProps = {
  article: ArticleListItem
}

export default function CategoryFeatured({ article }: CategoryFeaturedProps) {
  return (
    <section className="mb-8">
      <ArticleCard article={article} priority />
    </section>
  )
}
