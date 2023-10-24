// 'use client'
import { DEFAULT_SETTINGS } from '@/common/loaders-constants'
import { HeadPara } from '@/components/shared/Heading'
import { LoaderType } from '@/types/css-loaders.model'
import { FC } from 'react'
// import Loader from './Loader'
import dynamic from 'next/dynamic'
import Loaders from './Loaders'
import { CustomizeSkeleton } from './Skeleton'

const CustomizeLoader = dynamic(() => import('./CustomizeLoader'), {
  ssr: false,
  loading: () => <CustomizeSkeleton />,
})

interface CSSLoadersProps {
  loaders: LoaderType[]
  query: any
}
const CSSLoaders: FC<CSSLoadersProps> = ({ loaders, query }) => {
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

      <CustomizeLoader state={state} />
      <br />
      <br />

      <Loaders loaders={loaders} state={state} />
    </HeadPara>
  )
}

export default CSSLoaders
