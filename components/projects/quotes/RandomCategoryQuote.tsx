'use client'
import { HeadPara } from '@/components/style/Heading'
import { transition } from '@/components/utils/animation'
import { IQuote } from '@/types/quotes.model'
import { FC } from 'react'
import { QuoteCard, QuoteCards } from './StyledComponent'
interface ISingleQuote {
  item: IQuote[]
  category: string
}
const RandomCategoryQuote: FC<ISingleQuote> = ({ category, item }) => {
  return (
    <>
      <HeadPara title="Similar Quotes" titleDelay={0.19} />
      <br />
      <QuoteCards
      delay={0.49}
      >
        {item?.map((quote, index) => (
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

export default RandomCategoryQuote
