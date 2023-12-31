'use client'

import { HeadPara } from '@/components/shared/Heading'
import { IQuoteCategory } from '@/types/quotes.model'
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
              <div className="flex justify-center items-center rounded-xl bg-base-200 hover:bg-primary hover:text-white  aspect-video">
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
