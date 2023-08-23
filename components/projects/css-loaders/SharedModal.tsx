import { cn } from '@/components/utils'
import { AnimatePresence, motion, MotionConfig } from 'framer-motion'
import _ from 'lodash'
import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import { useSwipeable } from 'react-swipeable'
import SourceCodeModel from './SourceCodeModel'

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

const visibeLoader = 15

export default function SharedModal({
  index,
  loaders,
  changePhotoId,
  closeModal,
  navigation,
  currentPhoto,
  direction,
}: any) {
  // let filteredImages = loaders
  let filteredImages = loaders?.filter((img: any) =>
    range(index - visibeLoader, index + visibeLoader).includes(img.id),
  )

  console.log(
    loaders?.filter((img: any) =>
      range(index - visibeLoader, index + visibeLoader).includes(img.id),
    ),
  )

  const [sourceCode, setSourceCode] = useState(false)
  const [copyed, setCopyed] = useState('')

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      if (index < loaders?.length - 1) {
        changePhotoId(index + 1)
      }
    },
    onSwipedRight: () => {
      if (index > 1) {
        changePhotoId(index - 1)
      }
    },
    trackMouse: true,
  })

  const buttonClass = 'btn btn-circle btn-md'

  let currentLoader = loaders
    ? _.find(loaders, val => val.id === index)
    : currentPhoto

  const onSourceCode = () => {
    setSourceCode(val => !val)
  }

  useEffect(() => {
    if (copyed) {
      setTimeout(() => {
        setCopyed('')
      }, 3000)
    }
  }, [copyed])

  return (
    <MotionConfig
      transition={{
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 },
      }}
    >
      <div
        className="transition-all fixed inset-0 md:inset-5 max-w-7xl mx-auto flex justify-center items-center z-50  bg-base-100 shadow-2xl md:rounded-2xl"
        {...handlers}
      >
        <div className="">
          <motion.div
            key={index}
            custom={direction}
            variants={{
              enter: (direction: number) => {
                return {
                  x: direction > 0 ? 1000 : -1000,
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
                  x: direction < 0 ? 1000 : -1000,
                  opacity: 0,
                  y: 0,
                }
              },
            }}
            initial="enter"
            animate="center"
            exit="exit"
          >
            <InnerHTML html={currentLoader.html} css={currentLoader.css} />
          </motion.div>
        </div>

        <div className="absolute top-0 right-0 flex items-center gap-2 p-3 ">
          <span className="tooltip tooltip-bottom" data-tip="Source Code">
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
          </span>
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

        {navigation && (
          <>
            {index > 1 && (
              <div
                className=" absolute left-3 top-[calc(50%-16px)] tooltip"
                data-tip="Left"
              >
                <button
                  className={cn(buttonClass)}
                  onClick={() => changePhotoId(index - 1)}
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
                      d="M15.75 19.5L8.25 12l7.5-7.5"
                    />
                  </svg>
                </button>
              </div>
            )}
            {index < loaders.length && (
              <div
                className="absolute right-3 top-[calc(50%-16px)] tooltip "
                data-tip="Right"
              >
                <button
                  className={cn(buttonClass)}
                  onClick={() => changePhotoId(index + 1)}
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
                      d="M8.25 4.5l7.5 7.5-7.5 7.5"
                    />
                  </svg>
                </button>
              </div>
            )}
          </>
        )}

        {!!loaders?.length && (
          <div
            className="absolute inset-x-0 bottom-0 z-40 overflow-hidden 
        md:rounded-2xl bg-gradient-to-b from-black/0 to-black/30"
          >
            <motion.div
              initial={false}
              className=" transition-all translate-x-1/3 mx-auto mt-6 mb-6 flex aspect-[3/2] h-[70px] "
              // style={{
              //   transform: 'translateX(30%)',
              // }}
            >
              <AnimatePresence initial={true}>
                {filteredImages.map(({ id, html, css }: any) => {
                  const initialLeft = (index - 1) * -100
                  const initialRight = visibeLoader * -100

                  const aLeft = index * -100
                  const aRight = visibeLoader * -100

                  const initialX = Math.max(initialLeft, initialRight)
                  const animateX = Math.max(aLeft, aRight)

                  if (index === id) {
                    console.log({
                      initialX,
                      initialXP: [initialLeft, initialRight],
                      animateX,
                      animateXp: [aLeft, aRight],
                      valid: index === id,
                    })
                  }

                  return (
                    <motion.button
                      initial={{
                        // width: '0%',
                        x: `${Math.max((index - 1) * -100, 10 * -100)}%`,
                        // x: `${initialX}%`,
                      }}
                      animate={{
                        scale: id === index ? 1.2 : 1,
                        // width: '100%',
                        x: `${Math.max(index * -100, 10 * -100)}%`,
                        // x: `${animateX}%`,
                      }}
                      exit={{ width: '0%' }}
                      onClick={() => changePhotoId(id)}
                      key={id}
                      className={cn(
                        'aspect-[3/2]  flex justify-center items-center overflow-hidden focus:outline-none z-10',
                        id === index &&
                          'z-20 rounded-md shadow shadow-black/50',
                        id === 0 && 'rounded-l-md',
                      )}
                    >
                      <div
                        className={cn(
                          'scale-50 transition-all brightness-50 contrast-125  ',
                          index === id && 'scale-75 ',
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
        )}
      </div>

      {sourceCode && (
        <SourceCodeModel
          open={sourceCode}
          close={onSourceCode}
          loader={currentLoader}
        />
      )}
    </MotionConfig>
  )
}
