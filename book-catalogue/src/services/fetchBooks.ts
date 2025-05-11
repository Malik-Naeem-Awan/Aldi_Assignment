import type { Book, ApiBook } from '@/types'

export async function fetchBooks(): Promise<Book[]> {
  try {
    const response = await fetch(`/api/books`)

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const apiBooks: ApiBook[] = await response.json()

    // Transform API data to match `Book` interface
    const books: Book[] = apiBooks.map((apiBook) => ({
      title: apiBook.name,
      author: apiBook.author,
      publishedYear: apiBook.publishYear,
      genre: apiBook.category,
      ratings:
        apiBook.ratings?.map((r) => ({
          source: r.source || 'Unknown',
          value: r.value,
        })) || [],
    }))

    return books
  } catch (error) {
    console.error('Failed to fetch books:', error)
    return []
  }
}
