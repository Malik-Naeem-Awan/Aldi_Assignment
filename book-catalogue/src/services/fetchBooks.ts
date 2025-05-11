import type { Book } from '@/types'

export async function fetchBooks(): Promise<Book[]> {
  try {
    const response = await fetch(`/api/books`)

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const books: Book[] = await response.json()
    return books
  } catch (error) {
    console.error('Failed to fetch books:', error)
    return []
  }
}
