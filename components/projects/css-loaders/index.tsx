import { LoaderType } from '@/types/css-loaders.model'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { FC, memo } from 'react'

const InnerHTML = dynamic(
  () => import('@/components/shared/element/InnerHtml'),
  {
    ssr: false,
  },
)

interface LoaderLoop extends LoaderType {
  onCode: (str: LoaderType) => void
}

const LoadersLoop: FC<LoaderLoop> = ({ id, html, css, onCode }) => {
  const handleChange = (e: Event<HTMLButtonElement>) => {
    e.stopPropagation()
    e.preventDefault()
    onCode({
      id,
      html,
      css,
    })
  }
  return (
    <Link
      shallow
      href={`/css-loaders/?loaderId=${id}`}
      as={`/css-loaders/${id}`}
      key={String(id)}
      // className="aspect-video w-full flex justify-center items-center card  shadow-base-200 hover:bg-base-200 border border-base-300"
      // style={{
      //   boxShadow:
      //     'inset rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px',
      // }}

      className="group/item relative aspect-video w-full flex justify-center items-center btn btn-square rounded-lg bg-base-200 h-full shadow-inner"
    >
      <button
        className="group/edit invisible btn-outline btn-primary group-hover/item:visible btn btn-md btn-circle absolute right-2 top-2  "
        onClick={handleChange}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5"
          />
        </svg>
      </button>
      <InnerHTML html={html} css={css} />
    </Link>
  )
}

LoadersLoop.displayName = 'LoadersLoop'

export default memo(LoadersLoop)
