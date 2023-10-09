import ProjectLayout from '@/components/projects/ProjectLayout'
import { getQuotesByCategories } from '@/services/quotes'
import { IQuoteItem } from '@/types/quotes.model'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const Category = () => {
  const router = useRouter()
  const { category: routeArray } = router.query as { category: string[] }
  const [category] = routeArray || []
  console.log('category', category)

  const [quotes, setQuotes] = useState<IQuoteItem | null>(null)

  useEffect(() => {
    ;(async function data() {
      const response = await getQuotesByCategories(category)
      console.log('response', response)
      setQuotes(response.quotes)
    })()
  }, [category])
  return (
    <ProjectLayout title="" description="">
      <div className="px-4 lg:px-0 max-w-[1200px] mx-auto w-full">
        <div id="seo-hero" className="pt-12 px-8">
          <h1 className="text-center text-4xl md:text-5xl font-bold mb-6 capitalize">
            {quotes?.title}
          </h1>
          {quotes?.description && (
            <p className="mx-auto max-w-screen-md text-center text-lg">
              {quotes?.description}
            </p>
          )}
        </div>
        <br />

        <div className="grid py-12 grid-cols-1 md:grid-cols-3 lg:grid-cols-2  gap-4  lg:gap-6  mx-auto">
          {!!quotes &&
            quotes.content.map(quote => (
              <article
                key={quote.content}
                className="prose flex flex-col  my-auto h-full rounded-xl bg-base-200 hover:shadow-[0_0_2px_4px_#570df8] p-6 "
              >
                <Link
                  href={`/quotes/${category}/${quote.content}`}
                  className="p-6 no-underline"
                >
                  <div className="self-center flex flex-col gap-y-4">
                    <div className="  text-xl">
                      <q>{quote.content}</q>
                    </div>
                    <div className="font-normal">
                      <i>- {quote.author}</i>
                    </div>
                  </div>
                </Link>
              </article>
              // <div key={category}>{category}</div>
            ))}
        </div>
      </div>
    </ProjectLayout>
  )
}

export default Category
