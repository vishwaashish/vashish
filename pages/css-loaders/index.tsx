import { LOADER } from '@/common/loaders-constants'
import CustomizeLoader from '@/components/projects/css-loaders/CustomizeLoader'
import LoaderModel from '@/components/projects/css-loaders/LoaderModel'
import { useRouter } from 'next/router'
import { lazy, Suspense } from 'react'
const LoaderLoop = lazy(() => import('@/components/projects/css-loaders'))
export default function CSSLoaders({ loaders }: any) {
  const router = useRouter()
  const { loaderId } = router.query

  const onClose = () => {}
  return (
    <article className="prose lg:prose-md  prose-h1:leading-none  prose-h1:mb-0  text-center   px-4 py-5 mt-7  max-w-full">
      <div className="max-w-[900px] mx-auto w-full ">
        <h1 className="antialiased ">CSS Loaders Gallery</h1>
        <p>
          Enhance User Experience and Aesthetics with Our Range of Creative CSS
          Loaders for Seamless Loading Animations
        </p>
      </div>

      <CustomizeLoader />

      <br />

      {loaderId && <LoaderModel loaders={loaders} onClose={onClose} />}

      <div className="transition-all grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full  mx-auto">
        <Suspense fallback="Loader...">
          {LOADER.map(item => (
            <LoaderLoop
              key={item.id}
              html={item.html}
              id={item.id}
              css={item.css}
            />
          ))}
        </Suspense>
      </div>
    </article>
  )
}

export async function getStaticProps() {
  return {
    props: {
      loaders: LOADER,
    },
  }
}
