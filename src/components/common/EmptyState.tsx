import { HiOutlineDocumentMagnifyingGlass as FileSearch } from 'react-icons/hi2'
import { Link } from 'react-router-dom'

type EmptyStateProps = {
  title?: string
  description?: string
  showHomeLink?: boolean
}

export default function EmptyState({
  title = 'Tidak ada berita ditemukan',
  description = 'Belum ada berita yang tersedia saat ini.',
  showHomeLink = false,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <FileSearch className="h-12 w-12 text-text-muted mb-4" />
      <p className="text-lg font-medium text-text mb-2">{title}</p>
      <p className="text-sm text-text-muted mb-6">{description}</p>
      {showHomeLink && (
        <Link
          to="/"
          className="rounded-md bg-primary px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-hover"
        >
          Kembali ke Beranda
        </Link>
      )}
    </div>
  )
}
