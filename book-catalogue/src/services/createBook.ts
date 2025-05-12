import type { Book } from '@/types'

const API_URL = `/api/books`

/**
 * Sends a POST request to create a new book entry on the server.
 *
 * @param {Book} book - The book object to be created.
 * @returns {Promise<Book>} - A promise that resolves with the created book.
 * @throws {Error} If the server response is not OK (e.g. network issue or server error).
 *
 * @example
 * const newBook = await createBook({ name: '', author: '', publishYear: 0, category: '', ratings: [] });
 */

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
