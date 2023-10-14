import ProjectLayout from '@/components/projects/ProjectLayout'
import CategoriesQuotes from '@/components/projects/quotes/CategoriesQuotes'
import DiscoverQuotes from '@/components/projects/quotes/DiscoverQuotes'
import { getQuotesByCategories, randomQuotes } from '@/services/quotes'
import { PageProps } from '@/types/common.model'

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
      <ProjectLayout title={quotes?.title} description={quotes?.description}>
        <CategoriesQuotes quotes={quotes} category={category} />
        <br />
        <DiscoverQuotes quotes={randomCatQuote} />
      </ProjectLayout>
    </>
  )
}

export default Page
