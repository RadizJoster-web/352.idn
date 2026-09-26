import SearchBar from '../../components/navigation/SearchBar'

type SearchHeaderProps = {
  query: string
  total: number
}

export default function SearchHeader({ query, total }: SearchHeaderProps) {
  return (
    <div className="mb-8">
      <h1 className="text-3xl font-semibold text-text mb-4 font-serif">Pencarian</h1>
      <SearchBar defaultValue={query} className="max-w-xl" />
      {query && (
        <p className="mt-4 text-sm text-text-muted">
          {total > 0
            ? `Ditemukan ${total} hasil untuk "${query}"`
            : `Tidak ada hasil untuk "${query}"`}
        </p>
      )}
    </div>
  )
}
