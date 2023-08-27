import { LOADER } from '@/common/loaders-constants'
import { cn } from '@/components/utils'
import { LoaderType } from '@/types/css-loaders.model'
import { AnimatePresence, motion, MotionConfig } from 'framer-motion'
import _ from 'lodash'
import dynamic from 'next/dynamic'
import { Suspense, useCallback, useEffect, useState } from 'react'
import { useSwipeable } from 'react-swipeable'
import SourceCodeModel from './SourceCodeModel'
import { copyText } from '@/components/utils/text'
import SyntaxHighlighter from 'react-syntax-highlighter'
import CustomizeLoader from './CustomizeLoader'
const InnerHTML = dynamic(
  () => import('@/components/shared/element/InnerHtml'),
  {
    ssr: false,
  },
)

export const range = (start: number, end: number) => {
  let output = []
  if (typeof end === 'undefined') {
    end = start
    start = 0
  }
  for (let i = start; i < end; i += 1) {
    output.push(i)
  }
  return output
}

interface SharedModal {
  index: number
  changeLoaderId: (arg: number) => void
  closeModal: () => void
  navigation: boolean
  currentPhoto?: LoaderType
  // loaders?: LoaderType[],
  direction?: number
  loaders?: LoaderType[]
}
const visibeLoader = 10

export default function SharedModal({
  index: indexProps,
  loaders = [],
  changeLoaderId,
  closeModal,
  navigation,
  currentPhoto,
  direction = 0,
}: SharedModal) {
  const [activeLoader, setActiveLoader] = useState<LoaderType>(LOADER[0])

  const index = indexProps - 1
  // let filteredImages = loaders
  // let filteredImages = loaders?.filter((img: any) =>
  //   range(index - 15, index + 15).includes(img.id),
  // )

  const [sourceCode, setSourceCode] = useState<boolean>(false)
  const [copyed, setCopyed] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  console.log(loading, 'loading')
  const [rootString, setRootString] = useState('')

  useEffect(() => {
    const style = getComputedStyle(document.body)
    const root = `:root {
      --loader-primary: ${style.getPropertyValue('--loader-primary')};
      --loader-secondary: ${style.getPropertyValue('--loader-secondary')};
      --loader-border: ${style.getPropertyValue('--loader-width')};
      --loader-width: ${style.getPropertyValue('--loader-border')};
    }
  `
    if (root) {
      setRootString(root)
    }
  }, [])

  useEffect(() => {
    loading &&
      setTimeout(() => {
        setLoading(false)
      }, 1000)
  }, [loading])

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      if (index < loaders?.length - 1) {
        changeLoaderId(indexProps + 1)
        setLoading(true)
      }
    },
    onSwipedRight: () => {
      if (index > 0) {
        changeLoaderId(indexProps - 1)
        setLoading(true)
      }
    },
    trackMouse: true,
  })

  const buttonClass = 'btn btn-circle btn-md shadow'

  const onSourceCode = () => {
    setSourceCode(val => !val)
  }

  const onLeft = useCallback(() => {
    changeLoaderId(indexProps - 1)
    setLoading(true)
  }, [changeLoaderId, indexProps])

  const onRight = useCallback(() => {
    changeLoaderId(indexProps + 1)
    setLoading(true)
  }, [changeLoaderId, indexProps])

  useEffect(() => {
    if (copyed) {
      setTimeout(() => {
        setCopyed('')
      }, 3000)
    }
  }, [copyed])

  useEffect(() => {
    if (loaders.length) {
      const loader = _.find(loaders, val => val.id === indexProps)
      loader && setActiveLoader(loader)
    } else if (currentPhoto) {
      currentPhoto && setActiveLoader(currentPhoto)
    }
  }, [currentPhoto, loaders, indexProps])

  return (
    <MotionConfig
      transition={{
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 },
      }}
    >
      <div
        className="transition-all fixed inset-0 md:inset-5 max-w-7xl mx-auto flex justify-center items-center z-50 overflow-y-auto overflow-x-hidden bg-base-100 shadow-2xl md:rounded-2xl"
        {...handlers}
      >
        <motion.div className=" lg:flex w-full h-full">
          <div className="relative bg-base-100 grow h-full flex justify-center items-center ">
            <div className="absolute top-0 left-0 flex items-center gap-2 p-3 ">
              <span className="tooltip tooltip-bottom" data-tip="Close">
                <button
                  onClick={() => closeModal()}
                  className={cn(buttonClass)}
                >
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

            <div className="absolute top-0 right-0 flex items-center gap-2 p-3 ">
              <span className="tooltip tooltip-bottom" data-tip="Source Code">
                <button
                  onClick={onSourceCode}
                  className={cn(
                    buttonClass,
                    'swap swap-rotate',
                    sourceCode && 'swap-active',
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
                {index + 1 < loaders.length && (
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
          </div>
          <div className="divider   lg:divider-horizontal lg:m-0 lg:w-0"></div>

          <motion.div
            className={cn(
              'prose transition-all max-w-full duration-300   p-0 overflow-y-auto overflow-x-hidden ',
              sourceCode ? 'lg:max-w-0' : 'lg:max-w-md',
            )}
            key={index + '1'}
          >
            <Suspense fallback="Loading..">
              <h1 className="flex justify-between items-center mb-3 mt-5 px-3">
                Loader {indexProps}
              </h1>
              <div className="divider my-2 "></div>
              <div>
                {/* {loading && 'Loading...'} */}
                <CustomizeLoader size="btn-sm" />
                <div className="divider "></div>
                <div className="">
                  <CopyCard
                    title="HTML"
                    titleProps={
                      <CopyButton
                        className="btn btn-sm btn-circle "
                        onClick={() => copyText(activeLoader.html)}
                      />
                    }
                  >
                    <SyntaxHighlighter
                      language="html"
                      showLineNumbers
                      customStyle={{
                        margin: 0,
                        borderRadius: 0,
                      }}
                    >
                      {activeLoader.html}
                    </SyntaxHighlighter>
                  </CopyCard>
                  <br />
                  <CopyCard
                    title="CSS"
                    titleProps={
                      <CopyButton
                        className="btn btn-sm btn-circle "
                        onClick={() => copyText(rootString + activeLoader.css)}
                      />
                    }
                  >
                    <SyntaxHighlighter
                      language="css"
                      showLineNumbers
                      wrapLines
                      customStyle={{ margin: 0, borderRadius: 0 }}
                    >
                      {rootString + activeLoader.css}
                    </SyntaxHighlighter>
                  </CopyCard>
                </div>
              </div>
            </Suspense>
          </motion.div>
        </motion.div>

        <div className="absolute top-0 right-0 flex items-center gap-2 p-3 ">
          {/* <span className="tooltip tooltip-bottom" data-tip="Source Code">
            <button onClick={onSourceCode} className={cn(buttonClass, '')}>
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
                  d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5"
                />
              </svg>
            </button>
          </span> */}
          {/* <span className="tooltip tooltip-bottom" data-tip="Close">
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
          </span> */}
        </div>

        {/* {!!loaders?.length && (
          <div
            className="absolute inset-x-0 bottom-0 z-40 overflow-hidden 
        md:rounded-2xl "
            //     className="absolute inset-x-0 bottom-0 z-40 overflow-hidden
            // md:rounded-2xl bg-gradient-to-b from-black/0 to-black/30"
          >
            <motion.div
              initial={false}
              className="mx-auto mt-6 mb-6 flex gap-3 aspect-[3/2] h-14 "
            >
              <AnimatePresence initial={true}>
                {filteredImages.map(({ id, html, css }: any) => {
                  const left = index * -100
                  const right = 12 * -100
                  id === index &&
                    console.log(left, right, Math.max(left, right))
                  return (
                    <motion.button
                      initial={{
                        width: '0%',
                        // x: `${Math.max((index - 1) * -100)}%`,
                        x: `${Math.max((index - 1) * -100, 12 * -100)}%`,
                      }}
                      animate={{
                        scale: id === index ? 1.1 : 1,
                        width: '100%',
                        // x: `${Math.max(index * -100, 10 * -100)}%`,
                        x: `${Math.max(left, right)}%`,
                      }}
                      exit={{ width: '0%' }}
                      onClick={() => changeLoaderId(id)}
                      key={id}
                      // className={cn(
                      //   'aspect-[3/2]  flex justify-center items-center overflow-hidden focus:outline-none z-10',
                      //   id === index &&
                      //     'z-20 rounded-md shadow shadow-black/50',
                      //   id === 0 && 'rounded-l-md',
                      // )}
                      className={cn(
                        'transform-gpu transition-all relative aspect-video w-full flex justify-center items-center  rounded-lg bg-base-200 h-full shadow-inner  hover:shadow-[0_0_0_2px_#570df850]',
                        indexProps === id && 'shadow-[0_0_0_2px_#570df8]',
                      )}
                    >
                      <div
                        className={cn(
                          'scale-50 transition-all brightness-50 contrast-125  ',
                          // index === id && 'scale-50 ',
                        )}
                      >
                        <InnerHTML html={html} css={css} />
                      </div>
                    </motion.button>
                  )
                })}
              </AnimatePresence>
            </motion.div>
          </div>
        )} */}
      </div>

      {/* {sourceCode && (
        <SourceCodeModel
          open={sourceCode}
          close={onSourceCode}
          loader={activeLoader}
        />
      )} */}
    </MotionConfig>
  )
}

export const CopyCard = ({
  titleProps,
  title,
  children,
}: {
  title: string
  children?: React.ReactNode
  titleProps?: any
  isCopy?: boolean
}) => {
  return (
    <div className="">
      <div className="flex justify-between item-center mb-2 px-3">
        <p className="m-0">{title}</p>
        {titleProps}
      </div>
      <div className="border-2 border-x-0 ">{children}</div>
    </div>
  )
}
export const CopyButton = ({ onClick, className }: any) => {
  return (
    <button className={className} onClick={onClick}>
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
          d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75"
        />
      </svg>
    </button>
  )
}
