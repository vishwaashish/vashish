import { cn } from '@/components/utils'
import React, { FC } from 'react'
import { motion } from 'framer-motion'
import dynamic from 'next/dynamic'
import { LoaderType } from '@/types/css-loaders.model'
const InnerHTML = dynamic(
  () => import('@/components/shared/element/InnerHtml'),
  {
    ssr: false,
  },
)

interface SharedModalLeftSide {
  activeLoader: LoaderType
  closeModal: () => void
  direction: number
  index: number
  navigation: boolean
  onLeft: () => void
  onRight: () => void
  onSourceCode: () => void
  sourceCode: boolean
  loadersLength: number
}
const SharedModalLeftSide: FC<SharedModalLeftSide> = ({
  closeModal,
  navigation,
  onSourceCode,
  sourceCode,
  index,
  onLeft,
  onRight,
  direction,
  activeLoader,
  loadersLength,
}) => {
  const buttonClass = 'btn btn-circle btn-md shadow'
  return (
    <>
      <div className="absolute top-0 left-0 flex items-center gap-2 p-3 ">
        <span className="tooltip tooltip-bottom" data-tip="Close">
          <button onClick={() => closeModal()} className={cn(buttonClass)}>
            {navigation ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"
                />
              </svg>
            )}
          </button>
        </span>
      </div>

      <span
        className="absolute animate-bounce bottom-0 tooltip flex items-center gap-2 p-3 block lg:hidden"
        data-tip="Scroll Down"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12.75l3 3m0 0l3-3m-3 3v-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </span>

      <div className="absolute top-0 right-0 flex items-center gap-2 p-3 hidden lg:block">
        <span
          className="tooltip tooltip-bottom"
          data-tip={sourceCode ? 'Close Menu' : 'Code'}
        >
          <button
            onClick={onSourceCode}
            className={cn(
              buttonClass,
              'swap swap-rotate',
              !sourceCode && 'swap-active',
            )}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 swap-on"
              aria-label="Source Code open"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5"
              />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 swap-off"
              aria-label="Source Code Close "
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
              />
            </svg>
          </button>
        </span>
      </div>
      {navigation && (
        <>
          {index > 0 && (
            <div
              className=" absolute left-3 top-[calc(50%-16px)] tooltip"
              data-tip="Left"
            >
              <button className={cn(buttonClass)} onClick={onLeft}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 19.5L8.25 12l7.5-7.5"
                  />
                </svg>
              </button>
            </div>
          )}
          {index + 1 < loadersLength && (
            <div
              className="absolute right-3 top-[calc(50%-16px)] tooltip "
              data-tip="Right"
            >
              <button className={cn(buttonClass)} onClick={onRight}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 4.5l7.5 7.5-7.5 7.5"
                  />
                </svg>
              </button>
            </div>
          )}
        </>
      )}

      <motion.div
        className=""
        key={index}
        custom={direction}
        variants={{
          enter: (direction: number) => {
            return {
              x: direction > 0 ? -1000 : -1000,
              opacity: 0,
              y: 0,
            }
          },
          center: {
            x: 0,
            opacity: 1,
            y: 0,
          },
          exit: (direction: number) => {
            return {
              x: direction < 0 ? -1000 : -1000,
              opacity: 0,
              y: 0,
            }
          },
        }}
        initial="enter"
        animate="center"
        exit="exit"
      >
        <InnerHTML html={activeLoader.html} css={activeLoader?.css} />
      </motion.div>
    </>
  )
}

export default SharedModalLeftSide
