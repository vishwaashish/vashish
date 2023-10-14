import ProjectLayout from '@/components/projects/ProjectLayout'
import DiscoverQuotes from '@/components/projects/quotes/DiscoverQuotes'
import RandomCategoryQuote from '@/components/projects/quotes/RandomCategoryQuote'
import SingleQuote from '@/components/projects/quotes/SingleQuote'
import {
  getQuotesByCategoriesContent,
  randomQuotes,
  randomQuotesByCatagories,
} from '@/services/quotes'
import { PageProps } from '@/types/common.model'

interface IPage {
  category: string
  content: string
}

const Page = async ({ params }: PageProps<IPage, any>) => {
  const { category, content } = params

  const response = await getQuotesByCategoriesContent(category, content)
  //   const response = await randomQuotesByCatagories()
  const randomResponse = await randomQuotesByCatagories(category, 6)
  const randomResult = await randomQuotes(6)

  const item = response?.quotes || null
  const randomQuote = randomResponse.quotes
  const randomCatQuote = randomResult.quotes
  return (
    <ProjectLayout
      className="py-0"
      title={item?.content || ''}
      description={''}
    >
      {item && <SingleQuote item={item} category={category} />}

      <RandomCategoryQuote item={randomQuote} category={category} />

      <br />
      <DiscoverQuotes quotes={randomCatQuote} />
    </ProjectLayout>
  )
}

export default Page
