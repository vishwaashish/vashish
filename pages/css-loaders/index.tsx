import { LOADER } from '@/common/constants'
import LoaderModel from '@/components/projects/css-loaders/LoaderModel'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
const Loaders = dynamic(() => import('@/components/projects/css-loaders'), {
  ssr: false,
})
export default function CSSLoaders({ loaders }: any) {
  const router = useRouter()
  const { loaderId } = router.query
  console.log(loaderId, loaders)

  const onClose = () => {
    console.log('close')
  }
  return (
    <article className="prose lg:prose-md  prose-h1:leading-none  prose-h1:mb-0  text-center   px-4 py-5 my-7  max-w-full">
      <div className="max-w-[900px] mx-auto w-full ">
        <h1 className="antialiased ">CSS Loaders Gallery</h1>
        <p>
          Enhance User Experience and Aesthetics with Our Range of Creative CSS
          Loaders for Seamless Loading Animations
        </p>
      </div>

      <br />
      <br />
      <br />

      {loaderId && <LoaderModel loaders={loaders} onClose={onClose} />}

      <Loaders />
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
