import type { Book } from '@/types'

/**
 * Fetches a list of books from the server.
 *
 * @returns {Promise<Book[]>} - A promise that resolves with an array of books.
 * If the fetch fails, it returns an empty array and logs the error.
 *
 * @throws {Error} Only internally for debugging; function always resolves with Book[].
 *
 * @example
 * const books = await fetchBooks();
 */

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
