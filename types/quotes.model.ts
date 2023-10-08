export interface IQuoteItem {
  name: string
  title: string
  description: string
  path: string
  content: IQuote[]
}

export interface IQuote {
  id: number
  content: string
  author: string
  tags: string[]
  authorSlug: string
  categories: string[]
}

export type IQuotesCollection = IQuoteItem[]
export type IQuoteCategory = Omit<IQuoteItem, 'content' | 'description'>

export type IQuoteCategoriesResponse<T> = { categories: T }
export type IQuoteResponse<T> = { quotes: T }
