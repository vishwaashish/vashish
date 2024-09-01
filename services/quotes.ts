// const quote = require('./../assets/json/quotes.json')
import {
    type IQuoteItem,
    type IQuoteCategoriesResponse,
    type IQuoteResponse,
    type IQuotesCollection,
    type IQuoteCategory,
    type IQuote,
} from "@/types/quotes.model";
import quotes from "./../assets/json/quotes.json";
import _ from "lodash";

const quotesCollection: IQuotesCollection = quotes;

export async function getAllQuotes(): Promise<
  IQuoteResponse<IQuotesCollection>
  > {
    return { quotes: quotesCollection };
}

export async function getCategories(): Promise<
  IQuoteCategoriesResponse<IQuoteCategory[]>
  > {
    const categories: IQuoteCategory[] = quotesCollection.map(item => ({
        name: item.name,
        title: item.title,
        path: item.path,
    }));
    return { categories };
}
export async function getQuotesByCategories(
    category: string,
): Promise<IQuoteResponse<IQuoteItem>> {
    const quotes = _.find(quotesCollection, { path: category });

    if (quotes) {
        return { quotes };
    } else {
        return Promise.reject("Category does not exist");
    }
}

export async function getQuotesByCategoriesContent(
    category: string,
    path: string,
): Promise<IQuoteResponse<IQuote | null>> {
    const quoteItem = _.find(quotesCollection, { path: category });

    const quotes =
    (quoteItem?.content.find(val => val.path === path)) || null;

    return { quotes };
}

export async function randomQuotes(
    n: number = 5,
): Promise<IQuoteResponse<IQuoteItem[]>> {
    const quotes = _.cloneDeep(quotesCollection);

    const randomItem = _.sampleSize(_.shuffle(quotes), n);

    const data = _.map(randomItem, item => ({
        ...item,
        content: _.slice(_.shuffle(item.content), 0, 1),
    }));

    return { quotes: data };
}
export async function randomQuotesByCatagories(
    category: string,
    n: number = 5,
): Promise<IQuoteResponse<IQuote[]>> {
    const response = await getQuotesByCategories(category);

    const randomQuotes = _.sampleSize(
        _.shuffle(response.quotes.content || []),
        n,
    );

    return { quotes: randomQuotes || [] };
}
