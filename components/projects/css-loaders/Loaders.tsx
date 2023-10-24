import { ILoaderParams, LoaderType } from '@/types/css-loaders.model'
import React, { FC } from 'react'
import { LOADER_PARAMS } from '@/common/loaders-constants'
import dynamic from 'next/dynamic'

const Loader = dynamic(() => import('./Loader'), {
  ssr: false,
  loading: () => (
    <div className="animate-pulse relative aspect-video  rounded-lg bg-base-200 h-full shadow-inner "></div>
  ),
})

interface LoadersProps {
  loaders: LoaderType[]
  state: ILoaderParams
}

const Loaders: FC<LoadersProps> = ({ loaders, state }) => {
  return (
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
  )
}

export default Loaders
