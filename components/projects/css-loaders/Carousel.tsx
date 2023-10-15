'use client'
import { ILoaderParams, LoaderType } from '@/types/css-loaders.model'
import { useRouter } from 'next/navigation'
import { FC, useState } from 'react'
import SharedModal from './SharedModal'
import { LOADER_PARAMS } from '@/common/loaders-constants'
import { motion } from 'framer-motion'
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

  function changeLoaderId(newVal: number): void {
    if (newVal > index) {
      setDirection(1)
    } else {
      setDirection(-1)
    }

    setCurIndex(newVal)

    router.push(`/css-loaders/${newVal}?${LOADER_PARAMS(state)}`)
  }

  return (
    <div className="">
      <motion.div className="relative z-50  ">
        <SharedModal
          index={curIndex}
          direction={direction}
          changeLoaderId={changeLoaderId}
          closeModal={handleClose}
          // state={state}
          currentLoader={element}
        />
        <br />
      </motion.div>
    </div>
  )
}

export default Carousel
