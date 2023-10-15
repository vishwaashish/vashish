import ProjectLayout from '@/components/projects/ProjectLayout'
import DiscoverQuotes from '@/components/projects/quotes/DiscoverQuotes'
import RandomCategoryQuote from '@/components/projects/quotes/RandomCategoryQuote'
import SingleQuote from '@/components/projects/quotes/SingleQuote'
import { capatalize, removeHypen } from '@/components/utils/text'
import {
  getQuotesByCategoriesContent,
  randomQuotes,
  randomQuotesByCatagories,
} from '@/services/quotes'
import { PageProps } from '@/types/common.model'
import { Metadata } from 'next'

interface IPage {
  category: string
  content: string
}

const Page = async ({ params }: PageProps<IPage, any>) => {
  const { category, content } = params

  const response = await getQuotesByCategoriesContent(category, content)
  const randomResponse = await randomQuotesByCatagories(category, 6)
  const randomResult = await randomQuotes(6)

  const item = response?.quotes || null
  const randomQuote = randomResponse.quotes
  const randomCatQuote = randomResult.quotes
  return (
    <ProjectLayout className="py-0">
      {item && <SingleQuote item={item} category={category} />}

      <RandomCategoryQuote item={randomQuote} category={category} />

      <br />
      <DiscoverQuotes quotes={randomCatQuote} />
    </ProjectLayout>
  )
}

export async function generateMetadata({
  params,
}: PageProps<IPage, any>): Promise<Metadata> {
  const { category, content } = params

  const response = await getQuotesByCategoriesContent(category, content)

  if (!response.quotes) {
    return {}
  }
  const title = capatalize(response.quotes?.content)
    .slice(0, 20)
    .padEnd(23, '...')

  const cat = removeHypen(capatalize(category))

  return {
    title: `${title} | ${cat}`,
    description: response.quotes.content,
    openGraph: {
      description: response.quotes.content,
      title: `${title} | ${cat}`,
    },
  }
}

export default Page
