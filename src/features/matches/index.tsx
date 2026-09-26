import { useState } from 'react'
import { useMatches } from '../../hooks/useMatches'
import LoadingSkeleton from '../../components/common/LoadingSkeleton'
import ErrorState from '../../components/common/ErrorState'
import EmptyState from '../../components/common/EmptyState'
import MatchFilters from './MatchFilters'
import MatchList from './MatchList'

export default function MatchesFeature() {
  const [date, setDate] = useState(() => new Date().toISOString().split('T')[0])
  const { matches, isLoading, error } = useMatches(date)

  return (
    <div className="mx-auto max-w-[var(--container-max)] px-4 py-8">
      <h1 className="mb-6 text-3xl font-semibold text-text font-serif">Jadwal Pertandingan</h1>
      <MatchFilters selectedDate={date} onDateChange={setDate} />
      {isLoading && <LoadingSkeleton variant="list" count={5} />}
      {error && <ErrorState message="Gagal memuat jadwal pertandingan." />}
      {!isLoading && !error && matches.length === 0 && (
        <EmptyState title="Tidak ada pertandingan" description="Tidak ada pertandingan pada tanggal ini." />
      )}
      {matches.length > 0 && <MatchList matches={matches} />}
    </div>
  )
}
