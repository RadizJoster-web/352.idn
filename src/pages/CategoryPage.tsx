import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { setSeoMeta } from '../lib/seo'
import CategoryFeature from '../features/category'

export default function CategoryPage() {
  const { slug = '' } = useParams<{ slug: string }>()

  useEffect(() => {
    setSeoMeta({
      title: slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
      description: `Berita ${slug.replace(/-/g, ' ')} terbaru di 352.IDN`,
      canonical: `${window.location.origin}/kategori/${slug}`,
    })
  }, [slug])

  return <CategoryFeature />
}
