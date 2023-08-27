import { LOADER } from '@/common/loaders-constants'
import CustomizeLoader from '@/components/projects/css-loaders/CustomizeLoader'
import LoaderModel from '@/components/projects/css-loaders/LoaderModel'
import { LoaderType } from '@/types/css-loaders.model'
import { useRouter } from 'next/router'
import { lazy, Suspense, useState } from 'react'
import LoaderLoop from '@/components/projects/css-loaders'
import SourceCodeModel from '@/components/projects/css-loaders/SourceCodeModel'

export default function CSSLoaders({ loaders }: { loaders: LoaderType[] }) {
  const router = useRouter()
  const { loaderId } = router.query
  const [sourceCode, setSourceCode] = useState<any>([false])

  const onClose = () => {}
  const onSourceCode = (element: LoaderType) => {
    setSourceCode((val: any) => {
      if (val[0] === false) {
        return [true, element]
      }
      return [false]
    })
  }

  const onSourceClose = () => {
    setSourceCode([false, {}])
  }
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
      <br />
      {sourceCode[0] && (
        <SourceCodeModel
          open={sourceCode[0]}
          close={onSourceClose}
          loader={sourceCode[1]}
        />
      )}

      {loaderId && <LoaderModel loaders={loaders} onClose={onClose} />}

      <Suspense fallback="Loading...">
        <div className="transition-all grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full  mx-auto">
          {loaders.map(item => (
            <Suspense fallback="Loading..." key={item.id}>
              <LoaderLoop
                key={item.id}
                html={item.html}
                id={item.id}
                css={item.css}
                onCode={onSourceCode}
              />
            </Suspense>
          ))}
        </div>
      </Suspense>
    </article>
  )
}

export async function getStaticProps() {
  const response = LOADER
  return {
    props: {
      loaders: response,
    },
  }
}
