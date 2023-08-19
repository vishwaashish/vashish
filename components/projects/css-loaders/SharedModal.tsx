import { AnimatePresence, motion, MotionConfig } from 'framer-motion'
import Image from 'next/image'
import { useState } from 'react'
import { useSwipeable } from 'react-swipeable'
import Loader from './Loader'
import _ from 'lodash'
// import { variants } from '../utils/animationVariants'
// import downloadPhoto from '../utils/downloadPhoto'
// import { range } from '../utils/range'
// import type { ImageProps, SharedModalProps } from '../utils/types'
// import Twitter from './Icons/Twitter'

export default function SharedModal({
  index,
  loaders,
  changePhotoId,
  closeModal,
  navigation,
  currentPhoto,
  direction,
}: any) {
  const [loaded, setLoaded] = useState(true)
  let filteredImages = loaders

  //   let filteredImages = images?.filter((img: ImageProps) =>
  //     range(index - 15, index + 15).includes(img.id),
  //   )

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      if (index < loaders?.length - 1) {
        changePhotoId(index + 1)
      }
    },
    onSwipedRight: () => {
      if (index > 0) {
        changePhotoId(index - 1)
      }
    },
    trackMouse: true,
  })

  //   let currentLoader = loaders ? loaders[index] : currentPhoto
  let currentLoader = loaders
    ? _.find(loaders, val => val.id === index)
    : currentPhoto
  console.log(currentLoader, 'currentLoader')
  return (
    <MotionConfig
      transition={{
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 },
      }}
    >
      <div
        className="relative z-50 flex aspect-[3/2] w-full max-w-7xl items-center wide:h-full xl:taller-than-854:h-auto mx-auto"
        {...handlers}
      >
        {/* Main image */}
        <div className="w-full overflow-hidden">
          <div className="relative flex aspect-[3/2] items-center justify-center">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={index}
                custom={direction}
                variants={{
                  enter: (direction: number) => {
                    return {
                      x: direction > 0 ? 1000 : -1000,
                      opacity: 0,
                    }
                  },
                  center: {
                    x: 0,
                    opacity: 1,
                  },
                  exit: (direction: number) => {
                    return {
                      x: direction < 0 ? 1000 : -1000,
                      opacity: 0,
                    }
                  },
                }}
                initial="enter"
                animate="center"
                exit="exit"
                className="absolute"
              >
                <Loader html={currentLoader.html} css={currentLoader.css} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Buttons + bottom nav bar */}
        <div className="absolute inset-0 mx-auto flex max-w-7xl items-center justify-center">
          {/* Buttons */}
          {
            <div className="relative aspect-[3/2] max-h-full w-full">
              {navigation && (
                <>
                  {index > 0 && (
                    <button
                      className="absolute left-3 top-[calc(50%-16px)] rounded-full bg-black/50 p-3 text-white/75 backdrop-blur-lg transition hover:bg-black/75 hover:text-white focus:outline-none"
                      style={{ transform: 'translate3d(0, 0, 0)' }}
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

                      {/* <ChevronLeftIcon className="h-6 w-6" /> */}
                    </button>
                  )}
                  {index + 1 < loaders.length && (
                    <button
                      className="absolute right-3 top-[calc(50%-16px)] rounded-full bg-black/50 p-3 text-white/75 backdrop-blur-lg transition hover:bg-black/75 hover:text-white focus:outline-none"
                      style={{ transform: 'translate3d(0, 0, 0)' }}
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

                      {/* <ChevronRightIcon className="h-6 w-6" /> */}
                    </button>
                  )}
                </>
              )}
              <div className="absolute top-0 right-0 flex items-center gap-2 p-3 text-white">
                {navigation ? (
                  <a
                    href={`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/${currentLoader.public_id}.${currentLoader.format}`}
                    className="rounded-full bg-black/50 p-2 text-white/75 backdrop-blur-lg transition hover:bg-black/75 hover:text-white"
                    target="_blank"
                    title="Open fullsize version"
                    rel="noreferrer"
                  >
                    Square
                    {/* <ArrowTopRightOnSquareIcon className="h-5 w-5" /> */}
                  </a>
                ) : (
                  <a
                    href={`https://twitter.com/intent/tweet?text=Check%20out%20this%20pic%20from%20Next.js%20Conf!%0A%0Ahttps://nextjsconf-pics.vercel.app/p/${index}`}
                    className="rounded-full bg-black/50 p-2 text-white/75 backdrop-blur-lg transition hover:bg-black/75 hover:text-white"
                    target="_blank"
                    title="Open fullsize version"
                    rel="noreferrer"
                  >
                    twitter
                    {/* <Twitter className="h-5 w-5" /> */}
                  </a>
                )}
                <button
                  onClick={
                    () => {}
                    // downloadPhoto(
                    //   `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/${currentImage.public_id}.${currentImage.format}`,
                    //   `${index}.jpg`,
                    // )
                  }
                  className="rounded-full bg-black/50 p-2 text-white/75 backdrop-blur-lg transition hover:bg-black/75 hover:text-white"
                  title="Download fullsize version"
                >
                  down
                  {/* <ArrowDownTrayIcon className="h-5 w-5" /> */}
                </button>
              </div>
              <div className="absolute top-0 left-0 flex items-center gap-2 p-3 text-white">
                <button
                  onClick={() => closeModal()}
                  className="rounded-full bg-black/50 p-2 text-white/75 backdrop-blur-lg transition hover:bg-black/75 hover:text-white"
                >
                  {
                    navigation ? (
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
                      // <XMarkIcon className="h-5 w-5" />
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
                    )
                    // <ArrowUturnLeftIcon className="h-5 w-5" />
                  }
                </button>
              </div>
            </div>
          }
          {/* Bottom Nav bar */}
          {navigation && (
            <div className="fixed inset-x-0 bottom-0 z-40 overflow-hidden bg-gradient-to-b from-black/0 to-black/60">
              <motion.div
                initial={false}
                className="mx-auto mt-6 mb-6 flex aspect-[3/2] h-[70px]"
              >
                <AnimatePresence initial={false}>
                  {filteredImages.map(({ id, html, css }: any) => (
                    <motion.button
                      initial={{
                        width: '0%',
                        x: `${Math.max((index - 1) * -100, 15 * -100)}%`,
                      }}
                      animate={{
                        scale: id === index ? 1.2 : 1,
                        width: '100%',
                        x: `${Math.max(index * -100, 15 * -100)}%`,
                      }}
                      exit={{ width: '0%' }}
                      onClick={() => changePhotoId(id)}
                      key={id}
                      className={`${
                        id === index
                          ? 'z-20 rounded-md shadow shadow-black/50 '
                          : 'z-10'
                      } ${id === 0 ? 'rounded-l-md' : ''} ${
                        id === loaders.length - 1 ? 'rounded-r-md' : ''
                      } aspect-[3/2]  flex justify-center items-center overflow-hidden focus:outline-none`}
                    >
                      <div
                        //   className="p-1 scale-75"

                        className={`${
                          id === index
                            ? 'brightness-110 hover:brightness-110'
                            : 'brightness-50 contrast-125 hover:brightness-75'
                        }  transform object-cover scale-75 transition`}
                      >
                        <Loader html={html} css={css} />
                      </div>
                      {/* <Image
                        alt="small photos on the bottom"
                        width={180}
                        height={120}
                        className={`${
                          id === index
                            ? 'brightness-110 hover:brightness-110'
                            : 'brightness-50 contrast-125 hover:brightness-75'
                        } h-full transform object-cover transition`}
                        src={`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/c_scale,w_180/${public_id}.${format}`}
                      /> */}
                    </motion.button>
                  ))}
                </AnimatePresence>
              </motion.div>
            </div>
          )}
        </div>
      </div>
    </MotionConfig>
  )
}
