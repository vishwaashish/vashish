import { LOADER_PARAMS } from '@/common/loaders-constants'
import { cn } from '@/components/utils'
import { useAppSelector } from '@/store'
import { selectLoaderState } from '@/store/cssLoaders'
import { type LoaderType } from '@/types/css-loaders.model'
import dynamic from 'next/dynamic'
import { type FC } from 'react'

const Loader = dynamic(async () => import('./Loader'), {
  ssr: false,
  loading: () => (
    <div className="animate-pulse relative aspect-video  rounded-lg bg-muted h-full shadow-inner "></div>
  ),
})

interface LoadersProps {
  loaders: LoaderType[]
  loaderClass?: string
  className?: string
}

const Loaders: FC<LoadersProps> = ({ loaders, loaderClass, className }) => {
  const state = useAppSelector(selectLoaderState)
  return (
    <div
      className={cn(
        'transition-all grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full  mx-auto ',
        className,
      )}
    >
      {loaders.map(item => (
        <Loader
          key={item.id}
          html={item.html}
          id={item.id}
          css={item.css}
          className={loaderClass}
          href={`/css-loaders/${LOADER_PARAMS(state)}&loaderId=${item.id}`}
          as={`/css-loaders/${item.id}${LOADER_PARAMS(state)}`}
        />
      ))}
    </div>
  )
}

export default Loaders
