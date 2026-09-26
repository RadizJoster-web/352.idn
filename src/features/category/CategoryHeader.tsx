import type { Category } from '../../types/category'
import Breadcrumb from '../../components/common/Breadcrumb'

type CategoryHeaderProps = {
  category: Category
}

export default function CategoryHeader({ category }: CategoryHeaderProps) {
  return (
    <div className="mb-8">
      <Breadcrumb items={[{ label: category.title }]} />
      <h1 className="text-3xl font-semibold font-serif text-text lg:text-4xl">{category.title}</h1>
      {category.description && (
        <p className="mt-2 text-base text-text-secondary">{category.description}</p>
      )}
    </div>
  )
}
