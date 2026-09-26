export function formatTimeAgo(dateString: string): string {
  const now = Date.now()
  const then = new Date(dateString).getTime()
  const seconds = Math.floor((now - then) / 1000)

  if (seconds < 60) return 'Baru saja'

  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) return `${minutes} Menit yang lalu`

  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours} Jam yang lalu`

  const days = Math.floor(hours / 24)
  if (days < 7) return `${days} Hari yang lalu`

  const weeks = Math.floor(days / 7)
  if (weeks < 4) return `${weeks} Minggu yang lalu`

  const months = Math.floor(days / 30)
  if (months < 12) return `${months} Bulan yang lalu`

  const years = Math.floor(days / 365)
  return `${years} Tahun yang lalu`
}
