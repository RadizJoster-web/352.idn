import { FiChevronLeft as ChevronLeft, FiChevronRight as ChevronRight } from 'react-icons/fi'
import { formatShortDate } from '../../lib/formatDate'

type MatchFiltersProps = {
  selectedDate: string
  onDateChange: (date: string) => void
}

export default function MatchFilters({ selectedDate, onDateChange }: MatchFiltersProps) {
  function shiftDate(days: number) {
    const date = new Date(selectedDate)
    date.setDate(date.getDate() + days)
    onDateChange(date.toISOString().split('T')[0])
  }

  return (
    <div className="mb-6 flex items-center justify-between">
      <button
        onClick={() => shiftDate(-1)}
        aria-label="Hari sebelumnya"
        className="flex h-10 w-10 items-center justify-center rounded-md border border-border hover:bg-surface"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>
      <span className="text-sm font-semibold text-text">{formatShortDate(selectedDate)}</span>
      <button
        onClick={() => shiftDate(1)}
        aria-label="Hari berikutnya"
        className="flex h-10 w-10 items-center justify-center rounded-md border border-border hover:bg-surface"
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  )
}
