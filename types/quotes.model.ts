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
  path: string
}

export type IQuotesCollection = IQuoteItem[]
export type IQuoteCategory = Omit<IQuoteItem, "content" | "description">

export interface IQuoteCategoriesResponse<T> { categories: T }
export interface IQuoteResponse<T> { quotes: T }
