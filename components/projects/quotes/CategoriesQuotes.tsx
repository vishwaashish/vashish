'use client'

import { transition } from '@/components/utils/animation'
import { type IQuoteItem } from '@/types/quotes.model'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { QuoteCard, QuoteCards } from './StyledComponent'
import { HeadPara } from '@/components/shared/Heading'
import { Button } from '@/components/ui/button'

const CategoriesQuotes = ({
  quotes,
  category,
}: {
  quotes: IQuoteItem
  category: string
}) => {
  return (
    <>
      <HeadPara
        title={quotes.title}
        description={quotes.description}
        titleDelay={0.19}
        descriptionDelay={0.29}
      >
        <motion.div {...transition(0.39)}>
          <Button variant="outline" asChild>
            <Link href={'/quotes'}>Quotes</Link>
          </Button>
        </motion.div>
      </HeadPara>

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
