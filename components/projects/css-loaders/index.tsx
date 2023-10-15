'use client'
import { HeadPara } from '@/components/shared/Heading'
import { LoaderType } from '@/types/css-loaders.model'
import { FC } from 'react'
import Loader from './Loader'
import CustomizeLoader from './CustomizeLoader'
import { DEFAULT_SETTINGS, LOADER_PARAMS } from '@/common/loaders-constants'

interface CSSLoadersProps {
  loaders: LoaderType[]
  query: any
}
const CSSLoaders: FC<CSSLoadersProps> = ({ loaders, query }) => {
  console.log('query', query)
  const {
    size = DEFAULT_SETTINGS.size,
    border = DEFAULT_SETTINGS.border,
    speed = DEFAULT_SETTINGS.speed,
    primaryColor = '570df8',
    secondaryColor = 'd8dde4',
    sourceCode = 'false',
  }: any = query

  const state = {
    size,
    speed,
    border,
    primaryColor,
    secondaryColor,
    sourceCode,
  }
  return (
    <HeadPara
      title="CSS Loaders Gallery"
      className="prose lg:prose-md  prose-h1:leading-none  prose-h1:mb-0  text-center max-w-full"
    >
      <p>
        Enhance User Experience and Aesthetics with Our Range of Creative CSS
        Loaders for Seamless Loading Animations
      </p>
      <p>
        📌 To bookmark this page, simply press <kbd className="kbd">Ctrl+D</kbd>
        .
      </p>
      <br />
      {/* <Suspense fallback="Loadiing"> */}
      <CustomizeLoader state={state} />
      <br />
      {/* </Suspense> */}
      <br />
      {/* <br /> */}
      {/* <AnimatePresence> */}
      {/* {loaderId && <LoaderModel state={state} onClose={onClose} />} */}
      {/* </AnimatePresence> */}
      <div className="transition-all grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full  mx-auto ">
        {loaders.map(item => (
          <Loader
            key={item.id}
            html={item.html}
            id={item.id}
            css={item.css}
            href={`/css-loaders/?loaderId=${item.id}&${LOADER_PARAMS(state)}`}
            as={`/css-loaders/${item.id}?${LOADER_PARAMS(state)}`}
          />
        ))}
      </div>
    </HeadPara>
  )
}

export default CSSLoaders
