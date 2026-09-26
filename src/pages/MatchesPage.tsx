import { useEffect } from 'react'
import { setSeoMeta } from '../lib/seo'
import MatchesFeature from '../features/matches'

export default function MatchesPage() {
  useEffect(() => {
    setSeoMeta({
      title: 'Jadwal Pertandingan',
      description: 'Jadwal dan skor pertandingan sepak bola terkini.',
    })
  }, [])

  return <MatchesFeature />
}
