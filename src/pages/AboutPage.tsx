import { useEffect } from 'react'
import { setSeoMeta } from '../lib/seo'

export default function AboutPage() {
  useEffect(() => {
    setSeoMeta({ title: 'Tentang Kami', description: 'Profil dan informasi tentang 352.IDN.' })
  }, [])

  return (
    <div className="mx-auto max-w-[760px] px-4 py-12">
      <h1 className="text-3xl font-semibold text-text mb-6 font-serif">Tentang 352.IDN</h1>
      <div className="space-y-4 text-text-secondary leading-relaxed">
        <p>
          352.IDN adalah portal berita sepak bola Indonesia yang menyajikan berita terkini,
          analisis mendalam, dan liputan komprehensif seputar dunia sepak bola.
        </p>
        <h2 className="text-xl font-semibold text-text mt-8">Fokus Editorial</h2>
        <p>
          Kami fokus pada liputan Timnas Indonesia, Liga 1 Indonesia, Liga Inggris,
          Liga Champions UEFA, serta berita sepak bola internasional.
        </p>
        <h2 className="text-xl font-semibold text-text mt-8">Topik Liputan</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li>Timnas Indonesia — Kualifikasi, Pertandingan Persahabatan, Piala AFF</li>
          <li>Liga 1 Indonesia — Klasemen, Transfer, Berita Klub</li>
          <li>Liga Inggris — Premier League, Piala FA, Piala Liga</li>
          <li>Liga Champions — Fase Grup, Knockout, Final</li>
          <li>Internasional — Piala Dunia, Euro, Copa America</li>
        </ul>
      </div>
    </div>
  )
}
