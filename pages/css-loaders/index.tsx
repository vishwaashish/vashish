import { DEFAULT_SETTINGS, LOADER } from '@/common/loaders-constants'
import LoaderLoop from '@/components/projects/css-loaders'
import CustomizeLoader, {
  getColor,
} from '@/components/projects/css-loaders/CustomizeLoader'
import LoaderModel from '@/components/projects/css-loaders/LoaderModel'
import { DefaultLoaderType, LoaderType } from '@/types/css-loaders.model'
import { useRouter } from 'next/router'
import { Suspense, useEffect, useState } from 'react'

export default function CSSLoaders({ loaders }: { loaders: LoaderType[] }) {
  const router = useRouter()
  const { loaderId } = router.query
  // const [sourceCode, setSourceCode] = useState<any>([false])
  const [state, setState] = useState<DefaultLoaderType>(DEFAULT_SETTINGS)

  useEffect(() => {
    var style = getComputedStyle(document.body)
    setState(
      getColor({
        primaryColor: style.getPropertyValue('--loader-primary'),
        secondaryColor: style.getPropertyValue('--loader-secondary'),
        size: style.getPropertyValue('--loader-width'),
        border: style.getPropertyValue('--loader-border'),
        speed: style.getPropertyValue('--loader-speed'),
      }),
    )
  }, [])

  const onClose = () => {}

  // const onSourceCode = (element: LoaderType) => {
  //   setSourceCode((val: any) => {
  //     if (val[0] === false) {
  //       return [true, element]
  //     }
  //     return [false]
  //   })
  // }

  // const onSourceClose = () => {
  //   setSourceCode([false, {}])
  // }
  return (
    <article className="prose lg:prose-md  prose-h1:leading-none  prose-h1:mb-0  text-center   px-4 py-5 mt-7  max-w-full">
      <div className="max-w-[900px] mx-auto w-full  ">
        <div className="flex justify-center gap-1 items-center">
         

          <h1 className="antialiased ">CSS Loaders Gallery</h1>
        </div>

        <p>
          Enhance User Experience and Aesthetics with Our Range of Creative CSS
          Loaders for Seamless Loading Animations
        </p>
      </div>

      <CustomizeLoader state={state} setState={setState} />

      <br />
      <br />
      {/* {sourceCode[0] && (
        <SourceCodeModel
          open={sourceCode[0]}
          close={onSourceClose}
          loader={sourceCode[1]}
        />
      )} */}

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
                // onCode={onSourceCode}
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
