import type { ArticleListItem } from '../../types/article';
import SectionHeader from '../../components/common/SectionHeader';
import CompactArticleCard from '../../components/article/CompactArticleCard';

type TimnasSectionProps = {
  articles: ArticleListItem[];
};

export default function TimnasSection({ articles }: TimnasSectionProps) {
  if (articles.length === 0) return null;

  return (
    <section>
      <SectionHeader
        title="Timnas Indonesia"
        href="/kategori/timnas-indonesia"
      />
      <div className="flex flex-col gap-4">
        {articles.map((article) => (
          <CompactArticleCard key={article._id} article={article} />
        ))}
      </div>
    </section>
  );
}
