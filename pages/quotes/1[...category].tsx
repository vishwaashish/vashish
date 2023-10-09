import ProjectLayout from '@/components/projects/ProjectLayout'
import Link from 'next/link'
import { useRouter } from 'next/router'

const CategoryContent = () => {
  const router = useRouter()
  const {
    category: [category, content],
  } = router.query as { category: string[] }
  // console.log('router', router, content)

  // useEffect(() => {
  //   ;(async function data() {
  //     const response = await getQuotesByCategoriesContent(content)
  //     console.log('response', response)
  //     // setQuotes(response.quotes)
  //   })()
  // }, [content])
  return (
    <ProjectLayout title="" description="">
      <div className="max-w-[1200px] mx-auto w-full">
        <div className="flex px-8 h-screen">
          <div className="flex flex-col my-auto gap-y-4 w-full mx-auto">
            <h1 className="text-center text-4xl md:text-7xl font-bold w-full">
              No friendship is an accident
            </h1>
            <p className="mx-auto text-2xl max-w-screen-md text-center ">
              - O Henry
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

        {/* <div id="seo-hero" className="pt-12 px-8">
          <h1 className="text-center text-4xl md:text-5xl font-bold mb-2">
            Quote Categories
          </h1>
        </div> */}
      </div>
    </ProjectLayout>
  )
}

export default CategoryContent
