// export interface Book {
//   title: string
//   author: string
//   publishedYear: number
//   genre: string
//   ratings?: { source: string; value: number }[]
// }

export interface Book {
  name: string
  author: string
  category: string
  publishYear: number
  ratings?: { source: string; value: number }[]
}
