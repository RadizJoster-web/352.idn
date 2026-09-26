import { useEffect } from 'react'
import { setSeoMeta } from '../lib/seo'
import LatestFeature from '../features/latest'

export default function LatestArticlesPage() {
  useEffect(() => {
    setSeoMeta({
      title: 'Artikel Terbaru',
      description: `Berita terbaru dan terkini di 352.IDN`,
      canonical: `${window.location.origin}/artikel-terbaru`,
    })
  }, [])

  return <LatestFeature />
}
