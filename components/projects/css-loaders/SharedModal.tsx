'use client'
import {
  DEFAULT_SETTINGS,
  LOADER,
  LOADER_PARAMS,
} from '@/common/loaders-constants'
import { ILoaderParams, LoaderType } from '@/types/css-loaders.model'
import { MotionConfig, motion } from 'framer-motion'
import _ from 'lodash'
import { useRouter } from 'next/navigation'
import { memo, useEffect, useState } from 'react'
import { useSwipeable } from 'react-swipeable'
import SharedModalLeftSide from './SharedModal-leftSide'
import { cn } from '@/components/utils'
import SharedModalRightSide from './SharedModal-rightSide'

interface SharedModal {
  index: number
  changeLoaderId: (arg: number) => void
  closeModal: () => void
  currentLoader: LoaderType
  direction?: number
  // state: ILoaderParams
}

function SharedModal({
  index: indexProps,
  // loaders = [],
  changeLoaderId,
  closeModal,
  currentLoader,
  direction = 0, // state,
}: SharedModal) {
  const router = useRouter()

  // const {
  //   size = DEFAULT_SETTINGS.size,
  //   border = DEFAULT_SETTINGS.border,
  //   speed = DEFAULT_SETTINGS.speed,
  //   primaryColor = '570df8',
  //   secondaryColor = 'd8dde4',
  //   sourceCode = 'false',
  // }: any = state

  const index = indexProps - 1

  // const [activeLoader, setActiveLoader] = useState<LoaderType>(LOADER[0])

  // const [loading, setLoading] = useState<boolean>(false)

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      if (index < LOADER?.length - 1) {
        changeLoaderId(indexProps + 1)
      }
    },
    onSwipedRight: () => {
      if (index > 0) {
        changeLoaderId(indexProps - 1)
      }
    },
    trackMouse: true,
  })

  const onLeft = () => {
    changeLoaderId(indexProps - 1)
  }

  const onRight = () => {
    changeLoaderId(indexProps + 1)
  }

  // useEffect(() => {
  //   if (LOADER.length) {
  //     const loader = _.find(LOADER, val => val.id === indexProps)
  //     loader && setActiveLoader(loader)
  //   } else if (currentLoader) {
  //     currentLoader && setActiveLoader(currentLoader)
  //   }
  // }, [currentLoader, indexProps])

  return (
    <MotionConfig
      transition={{
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 },
      }}
    >
      <div className="w-full h-full">
        <div
          className="w-full h-full "
          // className="transition-all relative   max-w-7xl mx-auto flex justify-center items-center z-50 overflow-y-auto overflow-x-hidden bg-base-100 shadow-2xl md:rounded-2xl"
          {...handlers}
        >
          <motion.div className="w-full relative h-full   ">
            <div className="grow h-full min-h-[400px] md:min-h-screen-header   shadow-xl rounded-2xl flex justify-center items-center overflow-hidden ">
              <SharedModalLeftSide
                {...{
                  closeModal,
                  index,
                  onLeft,
                  loadersLength: LOADER?.length,
                  onRight,
                  direction,
                  activeLoader: currentLoader,
                  // setting: state,
                }}
              />
            </div>

            {/* <div className="divider lg:divider-horizontal lg:m-0 lg:w-0"></div> */}
          </motion.div>
        </div>
        <div
          className={cn(
            'prose transition-all max-w-full duration-300  p-0  ',
            // !openSidebar ? 'lg:max-w-0' : 'lg:max-w-md',
          )}
        >
          <SharedModalRightSide
            {...{
              indexProps,
              activeLoader: currentLoader,
              // setting: state,
            }}
          />
        </div>
      </div>
    </MotionConfig>
  )
}
export default memo(SharedModal)
