'use client'
import { DEFAULT_SETTINGS } from '@/common/loaders-constants'
import { HeadPara } from '@/components/shared/Heading'
import { type LoaderType } from '@/types/css-loaders.model'
import { type FC } from 'react'
// import Loader from './Loader'
import useWindowSize from '@/components/hooks/useWindowSize'
import dynamic from 'next/dynamic'
import Loaders from './Loaders'
import { CustomizeSkeleton } from './Skeleton'

const CustomizeLoader = dynamic(async () => import('./CustomizeLoader'), {
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
  const { breakpoint } = useWindowSize()
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

      <CustomizeLoader
        state={state}
        size={breakpoint === 'sm' ? 'sm' : 'default'}
      />
      <br />
      <br />

      <Loaders loaders={loaders} state={state} />
    </HeadPara>
  )
}

export default CSSLoaders
