import InnerHTML from '@/components/shared/InnerHtml'
import { cn } from '@/components/utils'
import { type LoaderType } from '@/types/css-loaders.model'
import Link from 'next/link'
import { type FC, memo } from 'react'

// const InnerHTML = dynamic(
//   () => import('@/components/shared/element/InnerHtml'),
//   {
//     ssr: false,
//   },
// )

interface LoaderLoop extends LoaderType {
  href?: string
  as?: string
  className?: string
}

const LoadersLoop: FC<LoaderLoop> = ({
  id,
  html,
  css,
  href = '',
  as = '',
  className,
}) => {
  return (
    <Link
      shallow
      href={href || `/css-loaders/?loaderId=${id}`}
      as={as || `/css-loaders/${id}`}
      key={'Loader' + id}
      className={cn(
        ' group/item transition-all hover:scale-105 relative  aspect-video w-full flex justify-center items-center rounded-lg bg-muted h-full shadow-inner hover:shadow-[0_0_2px_4px_#570df8]',
        className,
      )}
      aria-label={'Loader' + id}
    >
      <span className="absolute text-muted-foreground top-0 left-0 bg-popover/40 rounded-tl-lg px-2 py-1 rounded-br-lg drop-shadow">
        #{id}
      </span>
      <InnerHTML html={html} css={css} />
    </Link>
  )
}

LoadersLoop.displayName = 'LoadersLoop'

export default memo(LoadersLoop)
