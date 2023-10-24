import InnerHTML from '@/components/shared/element/InnerHtml'
import { LoaderType } from '@/types/css-loaders.model'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { FC, memo } from 'react'

// const InnerHTML = dynamic(
//   () => import('@/components/shared/element/InnerHtml'),
//   {
//     ssr: false,
//   },
// )

interface LoaderLoop extends LoaderType {
  href?: string
  as?: string
}

const LoadersLoop: FC<LoaderLoop> = ({ id, html, css, href = '', as = '' }) => {
  return (
    <Link
      shallow
      href={href || `/css-loaders/?loaderId=${id}`}
      as={as || `/css-loaders/${id}`}
      key={'Loader' + id}
      className=" group/item transition-all relative aspect-video w-full flex justify-center items-center  rounded-lg bg-base-200 h-full shadow-inner  hover:shadow-[0_0_2px_4px_#570df8]"
      aria-label={'Loader' + id}
    >
      <InnerHTML html={html} css={css} />
    </Link>
  )
}

LoadersLoop.displayName = 'LoadersLoop'

export default memo(LoadersLoop)
