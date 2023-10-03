import {
  DEFAULT_SETTINGS,
  LOADER,
  LOADER_PARAMS,
} from '@/common/loaders-constants'
import { cn } from '@/components/utils'
import { LoaderType } from '@/types/css-loaders.model'
import { MotionConfig, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useSwipeable } from 'react-swipeable'
import { useRouter } from 'next/router'
import SharedModalLeftSide from './SharedModal-leftSide'
import SharedModalRightSide from './SharedModal-rightSide'

interface SharedModal {
  index: number
  changeLoaderId: (arg: number) => void
  closeModal: () => void
  navigation: boolean
  currentPhoto?: LoaderType
  direction?: number
}

export default function SharedModal({
  index: indexProps,
  // loaders = [],
  changeLoaderId,
  closeModal,
  navigation,
  currentPhoto,
  direction = 0,
}: SharedModal) {
  const router = useRouter()

  const {
    size = DEFAULT_SETTINGS.size,
    border = DEFAULT_SETTINGS.border,
    speed = DEFAULT_SETTINGS.speed,
    primaryColor = '570df8',
    secondaryColor = 'd8dde4',
    sourceCode = 'false',
  }: any = router.query

  const openSidebar: boolean = JSON.parse(sourceCode)

  const setting = {
    size,
    speed,
    border,
    primaryColor,
    secondaryColor,
    sourceCode,
  }

  const index = indexProps - 1

  const [activeLoader, setActiveLoader] = useState<LoaderType>(LOADER[0])

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

  const onSourceCode = () => {
    router.push(
      {
        query: {
          loaderId: indexProps,
          size,
          border,
          speed,
          primaryColor,
          secondaryColor,
          sourceCode: String(!openSidebar),
        },
      },
      `/css-loaders/${indexProps}?${LOADER_PARAMS({
        size,
        border,
        speed,
        primaryColor,
        secondaryColor,
        sourceCode: String(!openSidebar),
      })}`,
      { shallow: false },
    )
  }

  const onLeft = () => {
    changeLoaderId(indexProps - 1)
    // setLoading(true)
  }

  const onRight = () => {
    changeLoaderId(indexProps + 1)
    // setLoading(true)
  }

  useEffect(() => {
    // if (loaders.length) {
    //   const loader = _.find(loaders, val => val.id === indexProps)
    //   loader && setActiveLoader(loader)
    // } else
    if (currentPhoto) {
      currentPhoto && setActiveLoader(currentPhoto)
    }
  }, [currentPhoto, indexProps])

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
            <SharedModalLeftSide
              {...{
                closeModal,
                navigation,
                onSourceCode,
                sourceCode: openSidebar,
                index,
                onLeft,
                loadersLength: LOADER?.length,
                onRight,
                direction,
                activeLoader,
              }}
            />
          </div>

          <div className="divider lg:divider-horizontal lg:m-0 lg:w-0"></div>

          <div
            className={cn(
              'prose transition-all max-w-full duration-300  p-0 overflow-y-auto overflow-x-hidden ',
              !openSidebar ? 'lg:max-w-0' : 'lg:max-w-md',
            )}
          >
            <SharedModalRightSide
              {...{
                indexProps,
                activeLoader,
                sourceCode: openSidebar,
                setting,
              }}
            />
          </div>
        </motion.div>
      </div>
    </MotionConfig>
  )
}
