import type { Book } from '@/types'

export function categorizeBooksByDecade(books: Book[]): Record<string, Book[] | 'No publications'> {
  const sorted = [...books].sort((a, b) => b.publishYear - a.publishYear)

  let maxYear = sorted[0]?.publishYear ?? new Date().getFullYear()
  let minYear = sorted[sorted.length - 1]?.publishYear ?? 1900

  minYear = Math.floor(minYear / 10) * 10
  maxYear = Math.ceil(maxYear / 10) * 10

  const categories: { [key: string]: Book[] | 'No publications' } = {}

  for (let year = maxYear; year >= minYear; year -= 10) {
    const label = `${year - 9} - ${year}`
    const decadeBooks = sorted.filter((b) => b.publishYear >= year - 9 && b.publishYear <= year)
    categories[label] = decadeBooks.length ? decadeBooks : 'No publications'
  }

  // Merge consecutive "No publications"
  const merged: typeof categories = {}
  let skip = false
  let tempRange = ''
  for (const [range, value] of Object.entries(categories)) {
    if (value === 'No publications') {
      if (!skip) {
        tempRange = range
        skip = true
      } else if (skip) {
        tempRange = `${range.split(' - ')[0]} - ${tempRange.split(' - ')[1]}`
      }
    } else {
      if (skip) {
        const combined = `${tempRange.split(' - ')[0]} - ${tempRange.split(' - ')[1]}`
        merged[combined] = 'No publications'
        skip = false
      }
      merged[range] = value
    }
  }

  return merged
}
