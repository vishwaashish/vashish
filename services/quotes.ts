// const quote = require('./../assets/json/quotes.json')
import {
  IQuoteItem,
  IQuoteCategoriesResponse,
  IQuoteResponse,
  IQuotesCollection,
  IQuoteCategory,
  IQuote,
} from '@/types/quotes.model'
import quotes from './../assets/json/quotes.json'

const quotesCollection: IQuotesCollection = quotes

export async function getAllQuotes(): Promise<
  IQuoteResponse<IQuotesCollection>
> {
  return { quotes: quotesCollection }
}

export async function getCategories(): Promise<
  IQuoteCategoriesResponse<IQuoteCategory[]>
> {
  const categories: IQuoteCategory[] = quotesCollection.map(item => ({
    name: item.name,
    title: item.title,
    path: item.path,
  }))
  return { categories }
}
export async function getQuotesByCategories(
  category: string,
): Promise<IQuoteResponse<IQuoteItem>> {
  const quotes: IQuoteItem | undefined = quotesCollection.find(
    cat => cat.path === category,
  )

  if (quotes) {
    return { quotes }
  } else {
    return Promise.reject('Category does not exist')
  }
}
export async function getQuotesByCategoriesContent(
  category: string,
): Promise<IQuoteResponse<IQuote | null>> {
  const allQuotes: IQuote[] = quotesCollection.reduce((prev: any, next) => {
    return prev.concat(next.content)
  }, [])
  const quotes = allQuotes.find(val => val.content === category)
  return { quotes: quotes || null }
}

export async function randomQuotes(
  n: number = 5,
): Promise<IQuoteResponse<IQuoteItem[]>> {
  const quotes = quotesCollection
  // const newArray: IQuoteItem[] = Array.from({ length: n }, () => {
  //   const index = Math.floor(Math.random() * quotes.length)
  //   const len = Math.floor(Math.random() * quotes[index].length)
  //   return quotes[index][len]
  // })
  // return { quotes: newArray }
  return { quotes: [] }
}
export async function randomQuotesByCatagories(
  category: string,
  n: number = 5,
): Promise<IQuoteResponse<IQuoteItem[]>> {
  try {
    // const response = await getQuotesByCategories(category)
    // const randomQuotes = response.quotes
    //   .sort(() => Math.random() - 0.5)
    //   .slice(0, n)

    // return { quotes: randomQuotes }
    // return { quotes:  }
    return Promise.reject('empty')
  } catch (error) {
    return Promise.reject(error)
  }
}
