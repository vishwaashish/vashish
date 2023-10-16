'use client'
import { ILoaderParams, LoaderType } from '@/types/css-loaders.model'
import { useRouter } from 'next/navigation'
import { FC, useEffect, useState } from 'react'
import SharedModal from './SharedModal'
import { LOADER, LOADER_PARAMS } from '@/common/loaders-constants'
import { motion } from 'framer-motion'
import { useSwipeable } from 'react-swipeable'
interface Carousel {
  index: number
  element: LoaderType
  state: ILoaderParams
}

const Carousel: FC<Carousel> = ({ index, element, state }) => {
  const router = useRouter()

  const [direction, setDirection] = useState<number>(0)
  const [curIndex, setCurIndex] = useState<number>(index)

  function handleClose() {
    router.push(`/css-loaders?${LOADER_PARAMS(state)}`, {})
  }

  useEffect(() => {
    const prefetch = router.prefetch
    router.prefetch = async () => {}
    return () => {
      router.prefetch = prefetch
    }
  }, [router])

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      console.log('left')
      if (index < LOADER?.length) {
        changeLoaderId(curIndex + 1)
      }
    },
    onSwipedRight: () => {
      console.log('right')
      if (index > 1) {
        changeLoaderId(curIndex - 1)
      }
    },
    trackMouse: true,
  })

  function changeLoaderId(newVal: number): void {
    if (newVal > index) {
      setDirection(1)
    } else {
      setDirection(-1)
    }

    setCurIndex(newVal)

    router.push(`/css-loaders/${newVal}?${LOADER_PARAMS(state)}`)
  }

  const onLeft = () => {
    changeLoaderId(curIndex - 1)
  }

  const onRight = () => {
    changeLoaderId(curIndex + 1)
  }

  return (
    <div className="">
      <motion.div className="relative z-50  ">
        <SharedModal
          handlers={handlers}
          index={curIndex}
          direction={direction}
          closeModal={handleClose}
          state={state}
          currentLoader={element}
          onLeft={onLeft}
          onRight={onRight}
        />
        <br />
      </motion.div>
    </div>
  )
}

export default Carousel
