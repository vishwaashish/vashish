import ProjectLayout from '@/components/projects/ProjectLayout'
import SingleQuote from '@/components/projects/quotes/SingleQuote'
import {
  getQuotesByCategories,
  getQuotesByCategoriesContent,
} from '@/services/quotes'
import { IQuote, IQuoteItem } from '@/types/quotes.model'
import { GetServerSideProps } from 'next'
import Link from 'next/link'
import { FC } from 'react'
import { motion } from 'framer-motion'

export interface ICategory {
  className: string
  quotes: IQuoteItem
  item: IQuote | null
  category: string
}

const Category: FC<ICategory> = ({ category, quotes, item }) => {
  const btn =
    'bg-gray-200 hover:bg-primary text-black hover:text-white font-semibold px-4 p-2 rounded-full mx-auto  max-w-screen-md text-center text-lg'

  const transition = (delay: number) => ({
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 },
    transition: {
      delay: delay,
      duration: 0.95,
      ease: [0.165, 0.84, 0.44, 1],
    },
  })
  return (
    <ProjectLayout title="" description="">
      <div className="px-4 lg:px-0 max-w-[1200px] mx-auto w-full">
        {item && <SingleQuote item={item} category={category} />}

        <div id="seo-hero" className="pt-12 px-8 text-center">
          <motion.h1
            {...transition(0.19)}
            className=" text-4xl md:text-5xl font-bold mb-6 capitalize"
          >
            {quotes?.title}
          </motion.h1>
          {quotes?.description && (
            <motion.p
              {...transition(0.29)}
              className="mx-auto max-w-screen-md  text-lg mb-6"
            >
              {quotes?.description}
            </motion.p>
          )}
          <motion.div {...transition(0.39)} className="pt-5">
            <Link href={`/quotes`} className={btn}>
              Quotes
            </Link>
          </motion.div>
        </div>
        <br />

        <motion.div
          {...transition(0.49)}
          className="grid py-12 grid-cols-1 md:grid-cols-3 lg:grid-cols-3  gap-4  lg:gap-6  mx-auto"
        >
          {!!quotes &&
            quotes.content.map((quote, index) => (
              <Link
                className="no-underline"
                href={`/quotes/${category}/${quote.content}/${quote.author}`}
                key={`${quote.content} ${index}`}
              >
                <article className=" prose  flex flex-col  my-auto h-full rounded-xl bg-base-200 hover:bg-primary hover:text-white  p-6 ">
                  <div className="self-center p-6 flex flex-col gap-y-4">
                    <div className=" font-semibold text-xl">
                      <q>{quote.content}</q>
                    </div>
                    <div className="font-normal">
                      <i>- {quote.author}</i>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
        </motion.div>
      </div>
    </ProjectLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { category: routeArray } = query as { category: string[] }
  const [category = '', content = ''] = routeArray || []

  var item = null

  const response = await getQuotesByCategories(category)

  if (content) {
    const response = await getQuotesByCategoriesContent(content)
    item = response?.quotes || null
  }

  return {
    props: {
      quotes: response.quotes,
      item,
      category,
    },
  }
}

export default Category
