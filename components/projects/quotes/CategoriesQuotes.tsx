'use client'

import { transition } from '@/components/utils/animation'
import { IQuoteItem } from '@/types/quotes.model'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { QuoteCard, QuoteCards } from './StyledComponent'
import { HeadPara } from '@/components/style/Heading'

const CategoriesQuotes = ({
  quotes,
  category,
}: {
  quotes: IQuoteItem
  category: string
}) => {
  const btn =
    'bg-gray-200 hover:bg-primary text-black hover:text-white font-semibold px-4 p-2 rounded-full mx-auto  max-w-screen-md text-center text-lg'

  return (
    <>
      <HeadPara
        title={quotes.title}
        description={quotes?.description}
        titleDelay={0.19}
        descriptionDelay={0.29}
      >
        <motion.div {...transition(0.39)}>
          <Link href={`/quotes`} className={btn}>
            Quotes
          </Link>
        </motion.div>
      </HeadPara>

      {/* <div id="seo-hero" className="pt-12 px-8 text-center">
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
      </div> */}
      <br />

      <QuoteCards delay={0.49}>
        {!!quotes &&
          quotes.content.map((quote, index) => (
            <QuoteCard
              key={`${quote.content} ${index}`}
              path={`/quotes/${category}/${quote.path}`}
              content={quote.content}
              author={quote.author}
            />
          ))}
      </QuoteCards>
    </>
  )
}

export default CategoriesQuotes
