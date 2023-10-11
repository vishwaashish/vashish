import ProjectLayout from '@/components/projects/ProjectLayout'
import { getCategories } from '@/services/quotes'
import { IQuoteCategory } from '@/types/quotes.model'
import { GetServerSideProps } from 'next'
import Link from 'next/link'
import { motion } from 'framer-motion'
export default function Quotes({
  categories,
}: {
  categories: IQuoteCategory[]
}) {
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
      <div id="seo-hero" className="pt-12 px-8">
        <motion.h1
          {...transition(0.19)}
          className="text-center text-4xl md:text-5xl font-bold mb-2"
        >
          Quote Categories
        </motion.h1>
      </div>
      <motion.div
        {...transition(0.29)}
        className="py-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4  lg:gap-6   mx-auto"
      >
        {categories.map(category => (
          <div key={category.name} className="">
            <Link
              className="flex flex-col h-full"
              href={`/quotes/${category.path}`}
            >
              <div className="flex justify-center items-center rounded-xl bg-base-200 hover:bg-primary hover:text-white  aspect-video">
                <p className="w-full font-semibold md:text-xl text-center capitalize">
                  {category.name}
                </p>
              </div>
            </Link>
          </div>
          // <div key={category}>{category}</div>
        ))}
      </motion.div>
    </ProjectLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async ctx => {
  const result = await getCategories()

  return {
    props: {
      categories: result.categories,
    },
  }
}
