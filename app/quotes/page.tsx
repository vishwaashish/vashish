import { projectMeta } from '@/common/constants'
import ProjectLayout from '@/components/projects/ProjectLayout'
import Categories from '@/components/projects/quotes/Categories'
import DiscoverQuotes from '@/components/projects/quotes/DiscoverQuotes'
import { getCategories, randomQuotes } from '@/services/quotes'
import { Metadata } from 'next'

export const metadata: Metadata = {
title: projectMeta.quotes.title,
description: projectMeta.quotes.description,
openGraph: {
  title: projectMeta.quotes.title,
  description: projectMeta.quotes.description,
},
}

export default async function Quotes() {
  const result = await getCategories()
  const randomResult = await randomQuotes(6)

  const categories = result.categories
  const randomCatQuote = randomResult.quotes

  return (
    <ProjectLayout>
      <Categories categories={categories} />
      <br />
      <DiscoverQuotes quotes={randomCatQuote} />
    </ProjectLayout>
  )
}
