import ProjectLayout from '@/components/projects/ProjectLayout'
import { getQuotesByCategories } from '@/services/quotes'
import { IQuoteItem } from '@/types/quotes.model'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const Category = () => {
  const router = useRouter()
  const { category: routeArray } = router.query as { category: string[] }
  const [category = '', content = '', author = ''] = routeArray || []

  const [quotes, setQuotes] = useState<IQuoteItem | null>(null)

  useEffect(() => {
    ;(async function data() {
      const response = await getQuotesByCategories(category)
      setQuotes(response.quotes)
    })()
  }, [category])
  return (
    <ProjectLayout title="" description="">
      <div className="px-4 lg:px-0 max-w-[1200px] mx-auto w-full">
        {content && (
          <div className="flex px-8 min-h-screen">
            <div className="flex flex-col my-auto gap-y-4 w-full mx-auto">
              <h1 className="text-center text-4xl md:text-7xl font-bold w-full">
                {content}
              </h1>
              <p className="mx-auto text-2xl max-w-screen-md text-center ">
                - {author}
              </p>
              <div className="text-center md:text-right ">
                <Link
                  href={`/quotes/${category}`}
                  className="bg-gray-200 hover:bg-black text-black hover:text-white font-semibold px-4 p-2 rounded-full mx-auto  max-w-screen-md text-center text-lg"
                >
                  {category}
                </Link>
              </div>
            </div>
          </div>
        )}
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

        <div className="grid py-12 grid-cols-1 md:grid-cols-3 lg:grid-cols-3  gap-4  lg:gap-6  mx-auto">
          {!!quotes &&
            quotes.content.map(quote => (
              <Link
                className="no-underline"
                href={`/quotes/${category}/${quote.content}/${quote.author}`}
                key={quote.content}
              >
                <article className="prose  flex flex-col  my-auto h-full rounded-xl bg-base-200 hover:shadow-[0_0_2px_4px_#570df8] p-6 ">
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
              // <div key={category}>{category}</div>
            ))}
        </div>
      </div>
    </ProjectLayout>
  )
}

export default Category
