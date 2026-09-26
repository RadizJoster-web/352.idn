import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { setSeoMeta } from '../lib/seo'
import SearchFeature from '../features/search'

export default function SearchPage() {
  const [searchParams] = useSearchParams()
  const query = searchParams.get('q') || ''

  useEffect(() => {
    setSeoMeta({
      title: query ? `Hasil pencarian: ${query}` : 'Pencarian',
      description: `Cari berita sepak bola di 352.IDN`,
    })
  }, [query])

  return <SearchFeature />
}
