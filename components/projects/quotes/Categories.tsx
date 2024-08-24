'use client'

import { HeadPara } from '@/components/shared/Heading'
import { type IQuoteCategory } from '@/types/quotes.model'
import Link from 'next/link'
import { QuoteCards } from './StyledComponent'
import { projectMeta } from '@/common/constants'

const Categories = ({ categories }: { categories: IQuoteCategory[] }) => {
  return (
    <>
      <HeadPara
        title={projectMeta.quotes.title}
        description={projectMeta.quotes.description}
        titleDelay={0.19}
        descriptionDelay={0.29}
      />

      <QuoteCards
        delay={0.29}
        className="grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
      >
        {categories.map(category => (
          <div key={category.name} className="">
            <Link
              className="flex flex-col h-full "
              href={`/quotes/${category.path}`}
            >
              <div className="flex hover:scale-105 justify-center shadow items-center border-muted-foreground rounded-xl transition-all  bg-muted hover:bg-primary   aspect-video">
                <p className="w-full font-semibold md:text-xl text-center capitalize">
                  {category.name}
                </p>
              </div>
            </Link>
          </div>
        ))}
      </QuoteCards>
    </>
  )
}

export default Categories
