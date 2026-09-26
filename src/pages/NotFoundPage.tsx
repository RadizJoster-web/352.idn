import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { setSeoMeta } from '../lib/seo'
import SearchBar from '../components/navigation/SearchBar'

export default function NotFoundPage() {
  useEffect(() => {
    setSeoMeta({ title: 'Halaman Tidak Ditemukan' })
  }, [])

  return (
    <div className="mx-auto max-w-[var(--container-max)] px-4 py-20 text-center">
      <h1 className="text-8xl font-semibold text-primary font-serif">404</h1>
      <p className="mt-4 text-2xl font-medium text-text">Halaman Tidak Ditemukan</p>
      <p className="mt-2 text-text-muted">Halaman yang Anda cari tidak ada atau telah dipindahkan.</p>
      <div className="mt-8 flex flex-col items-center gap-4">
        <Link
          to="/"
          className="rounded-md bg-primary px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-hover"
        >
          Kembali ke Beranda
        </Link>
        <SearchBar className="w-full max-w-md" />
      </div>
    </div>
  )
}
