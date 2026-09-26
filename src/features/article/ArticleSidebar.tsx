import type { ArticleListItem } from '../../types/article'
import CompactArticleCard from '../../components/article/CompactArticleCard'

type ArticleSidebarProps = {
  related: ArticleListItem[]
}

export default function ArticleSidebar({ related }: ArticleSidebarProps) {
  if (related.length === 0) return null

  return (
    <aside className="space-y-4" aria-label="Berita terkait">
      <h3 className="text-lg font-semibold text-text">Berita Terkait</h3>
      <div className="space-y-4">
        {related.map((article) => (
          <CompactArticleCard key={article._id} article={article} />
        ))}
      </div>
    </aside>
  )
}
