import { LoaderType } from '@/types/css-loaders.model'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { forwardRef, memo } from 'react'

const InnerHTML = dynamic(
  () => import('@/components/shared/element/InnerHtml'),
  {
    ssr: false,
  },
)
export type Ref = HTMLAnchorElement

const LoadersLoop = forwardRef<Ref, LoaderType>(({ id, html, css }, ref) => {
  return (
    <Link
      ref={ref}
      shallow
      href={`/css-loaders/?loaderId=${id}`}
      as={`/css-loaders/${id}`}
      key={String(id)}
      className="aspect-video w-full flex justify-center items-center card  shadow-base-200 hover:bg-base-200 border border-base-300"
      style={{
        boxShadow:
          'inset rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px',
      }}
    >
      <InnerHTML html={html} css={css} />
    </Link>
  )
})

LoadersLoop.displayName = 'LoadersLoop'

export default memo(LoadersLoop)
