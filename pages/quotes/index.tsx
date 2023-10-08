import ProjectLayout from '@/components/projects/ProjectLayout'
import { getCategories } from '@/services/quotes'
import { IQuoteCategory } from '@/types/quotes.model'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function Quotes() {
  const [categories, setCategories] = useState<IQuoteCategory[]>([])

  useEffect(() => {
    ;(async function data() {
      const result = await getCategories()
      setCategories(result.categories)
    })()
  }, [])
  return (
    <ProjectLayout title="" description="">
      <div className="px-4 lg:px-0 max-w-[1200px] mx-auto w-full">
        <div id="seo-hero" className="pt-12 px-8">
          <h1 className="text-center text-4xl md:text-5xl font-bold mb-2">
            Quote Categories
          </h1>
        </div>
        <div className="py-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4  lg:gap-6   mx-auto">
          {categories.map(category => (
            <div key={category.name} className="">
              <Link
                className="flex flex-col h-full"
                href={`/quotes/${category.path}`}
              >
                <div className="flex justify-center items-center rounded-xl bg-base-200 hover:shadow-[0_0_2px_4px_#570df8]  aspect-video">
                  <p className="w-full font-semibold md:text-xl text-center capitalize">
                    {category.name}
                  </p>
                </div>
              </Link>
            </div>
            // <div key={category}>{category}</div>
          ))}
        </div>
      </div>
    </ProjectLayout>
  )
}
