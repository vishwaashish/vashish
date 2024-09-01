'use client'
import { HeadPara } from '@/components/shared/Heading'
import { type LoaderType } from '@/types/css-loaders.model'
import { useEffect, type FC } from 'react'
// import Loader from './Loader'
import useWindowSize from '@/components/hooks/useWindowSize'
import { useAppDispatch } from '@/store'
import { setLoader } from '@/store/cssLoaders'
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
  const dispatch = useAppDispatch()
  useEffect(() => {
    if (Object.keys(query).length) dispatch(setLoader(query))
  }, [dispatch, query])

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

      <CustomizeLoader size={breakpoint === 'sm' ? 'sm' : 'default'} />
      <br />
      <br />

      <Loaders loaders={loaders} />
    </HeadPara>
  )
}

export default CSSLoaders
