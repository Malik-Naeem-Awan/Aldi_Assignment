import type { Book } from '@/types'

const API_URL = `/api/books`

export async function createBook(book: Book): Promise<Book> {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(book),
  })

  if (!response.ok) {
    throw new Error('Failed to save book')
  }

  return response.json()
}
