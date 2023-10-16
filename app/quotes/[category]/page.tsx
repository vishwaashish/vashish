import ProjectLayout from '@/components/projects/ProjectLayout'
import CategoriesQuotes from '@/components/projects/quotes/CategoriesQuotes'
import DiscoverQuotes from '@/components/projects/quotes/DiscoverQuotes'
import { capatalize, removeHypen } from '@/components/utils/text'
import { getQuotesByCategories, randomQuotes } from '@/services/quotes'
import { PageProps } from '@/types/common.model'
import { Metadata, ResolvingMetadata } from 'next'

interface IPage {
  category: string
  content: string
}

const Page = async ({ params }: PageProps<IPage, any>) => {
  const { category } = params
  const response = await getQuotesByCategories(category)
  const randomResult = await randomQuotes(6)
  const quotes = response.quotes
  const randomCatQuote = randomResult.quotes

  return (
    <>
      <ProjectLayout>
        <CategoriesQuotes quotes={quotes} category={category} />
        <br />
        <DiscoverQuotes quotes={randomCatQuote} />
      </ProjectLayout>
    </>
  )
}

export async function generateMetadata({
  params,
}: PageProps<IPage, any>): Promise<Metadata> {
  const category = params.category

  const response = await getQuotesByCategories(category)

  if (!response.quotes) {
    return {}
  }

  const title = removeHypen(capatalize(response.quotes.path))

  return {
    title: title,
    description: response.quotes.description,
    openGraph: {
      description: response.quotes.description,
      title: response.quotes.path,
    },
  }
}

export default Page
