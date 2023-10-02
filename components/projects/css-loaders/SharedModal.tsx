import {
  DEFAULT_SETTINGS,
  LOADER,
  LOADER_PARAMS,
} from '@/common/loaders-constants'
import { cn } from '@/components/utils'
import { LoaderType } from '@/types/css-loaders.model'
import { AnimatePresence, MotionConfig, motion } from 'framer-motion'
import _ from 'lodash'
import { useEffect, useState } from 'react'
import { useSwipeable } from 'react-swipeable'
// import { getColor } from './CustomizeLoader'
import SharedModalLeftSide from './SharedModal-leftSide'
import SharedModalRightSide from './SharedModal-rightSide'
import { useRouter } from 'next/router'

//  const range = (start: number, end: number) => {
//   let output = []
//   if (typeof end === 'undefined') {
//     end = start
//     start = 0
//   }
//   for (let i = start; i < end; i += 1) {
//     output.push(i)
//   }
//   return output
// }

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

export default function SharedModal({
  index: indexProps,
  loaders = [],
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

  console.log('openSidebar', openSidebar, sourceCode)

  // const searchParam = useSearchParams()
  // const router = useRouter()

  // const size = searchParam.get('size') || DEFAULT_SETTINGS.size
  // const border = searchParam.get('border') || DEFAULT_SETTINGS.border
  // const speed = searchParam.get('speed') || DEFAULT_SETTINGS.speed
  // const primaryColor = searchParam.get('primaryColor') || '570df8'
  // const secondaryColor = searchParam.get('secondaryColor') || 'd8dde4'
  // // const sourceCode = JSON.parse(searchParam.get('sourceCode') || 'false')

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

  // const [sourceCode, setSourceCode] = useState<boolean>(true)
  const [loading, setLoading] = useState<boolean>(false)

  // const [setting, setSetting] = useState<DefaultLoaderType>(DEFAULT_SETTINGS)

  // useEffect(() => {
  //   var style = getComputedStyle(document.body)
  //   setSetting(
  //     getColor({
  //       primaryColor: style.getPropertyValue('--loader-primary'),
  //       secondaryColor: style.getPropertyValue('--loader-secondary'),
  //       size: style.getPropertyValue('--loader-width'),
  //       border: style.getPropertyValue('--loader-border'),
  //       speed: style.getPropertyValue('--loader-speed'),
  //     }),
  //   )
  // }, [])

  // useEffect(() => {
  //   loading &&
  //     setTimeout(() => {
  //       setLoading(false)
  //     }, 500)
  // }, [loading])

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      if (index < loaders?.length - 1) {
        changeLoaderId(indexProps + 1)
        // setLoading(true)
      }
    },
    onSwipedRight: () => {
      if (index > 0) {
        changeLoaderId(indexProps - 1)
        // setLoading(true)
      }
    },
    trackMouse: true,
  })

  const onSourceCode = () => {
    // setSourceCode(val => !val)
    // router.push('?' + LOADER_PARAMS(state))

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
    setLoading(true)
  }

  const onRight = () => {
    changeLoaderId(indexProps + 1)
    setLoading(true)
  }

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
            <SharedModalLeftSide
              {...{
                closeModal,
                navigation,
                onSourceCode,
                sourceCode: openSidebar,
                index,
                onLeft,
                loaders,
                onRight,
                direction,
                activeLoader,
              }}
            />
          </div>

          <div className="divider   lg:divider-horizontal lg:m-0 lg:w-0"></div>

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
