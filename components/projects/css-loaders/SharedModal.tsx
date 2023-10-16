'use client'
import { LOADER } from '@/common/loaders-constants'
import InnerHTML from '@/components/shared/element/InnerHtml'
import { ILoaderParams, LoaderType } from '@/types/css-loaders.model'
import { MotionConfig, motion } from 'framer-motion'
import { memo } from 'react'
import SharedModalLeftSide from './SharedModal-leftSide'
import SharedModalRightSide from './SharedModal-rightSide'
import { cn } from '@/components/utils'

interface SharedModal {
  index: number
  closeModal: () => void
  onRight: () => void
  onLeft: () => void
  currentLoader: LoaderType
  direction?: number
  handlers: any
  state: ILoaderParams
}

function SharedModal({
  index: indexProps,
  closeModal,
  currentLoader,
  direction = 0, //
  state,
  onLeft,
  onRight,
  handlers,
}: SharedModal) {
  const index = indexProps - 1

  return (
    <MotionConfig
      transition={{
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 },
      }}
    >
      <div className="w-full h-full">
        <div className="w-full h-full ">
          <motion.div className="w-full relative h-full   ">
            <div
              className="grow h-full min-h-[400px] md:min-h-screen-header   shadow-xl rounded-2xl flex justify-center items-center overflow-hidden "
              {...handlers}
            >
              <SharedModalLeftSide
                {...{
                  closeModal,
                  index,
                  onLeft,
                  loadersLength: LOADER?.length,
                  onRight,
                  direction,
                  activeLoader: currentLoader,
                  setting: state,
                }}
              />

              <motion.div
                className="w-full h-full grid place-content-center"
                custom={direction}
                variants={{
                  enter: (direction: number) => {
                    return {
                      x: direction <= 0 ? -500 : 500,
                      opacity: 0,
                    }
                  },
                  center: {
                    x: 0,
                    opacity: 1,
                  },
                  exit: (direction: number) => {
                    return {
                      x: direction >= 0 ? -500 : 500,
                      opacity: 0,
                    }
                  },
                }}
                initial="enter"
                animate="center"
                exit="exit"
              >
                <InnerHTML html={currentLoader.html} css={currentLoader?.css} />
              </motion.div>
            </div>
          </motion.div>
        </div>
        <div
          className={cn('prose transition-all max-w-full duration-300  p-0  ')}
        >
          <SharedModalRightSide
            {...{
              indexProps,
              activeLoader: currentLoader,
              setting: state,
            }}
          />
        </div>
      </div>
    </MotionConfig>
  )
}
export default memo(SharedModal)
