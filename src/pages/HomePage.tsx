import { useEffect } from 'react'
import { setSeoMeta } from '../lib/seo'
import HomeFeature from '../features/home'

export default function HomePage() {
  useEffect(() => {
    setSeoMeta({
      title: 'Berita Sepak Bola Terkini',
      description: '352.IDN - Portal berita sepak bola terpercaya. Berita terkini, skor pertandingan, dan analisis mendalam.',
    })
  }, [])

  return <HomeFeature />
}
