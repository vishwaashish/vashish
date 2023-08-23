import React, { FC, useRef, useState } from 'react'
import { Dialog } from '@headlessui/react'
import { useRouter } from 'next/router'
import { LOADER } from '@/common/loaders-constants'
import _ from 'lodash'
import { motion } from 'framer-motion'
import SharedModal from './SharedModal'
import { LoaderType } from '@/types/css-loaders.model'

interface LoaderModel {
  loaders: LoaderType[]
  onClose: () => void
}

const LoaderModel: FC<LoaderModel> = ({
  loaders,
  onClose,
}) => {
  const router = useRouter()

  let overlayRef = useRef<HTMLDivElement | null>(null)

  const { loaderId } = router.query

  let index = Number(loaderId)

  const [direction, setDirection] = useState<number>(0)
  const [curIndex, setCurIndex] = useState<number>(index)

  function handleClose() {
    router.push('/css-loaders', undefined, { shallow: true })
    onClose()
  }

  function changeLoaderId(newVal: number): void {

    if (newVal > index) {
      setDirection(1)
    } else {
      setDirection(-1)
    }

    setCurIndex(newVal)

    router.push(
      {
        query: { loaderId: newVal },
      },
      `/css-loaders/${newVal}`,
      { shallow: true },
    )
  }

  return (
    <>
      <Dialog
        static
        open={true}
        onClose={handleClose}
        initialFocus={overlayRef}
      >
        <Dialog.Overlay
          key="backdrop"
          as={motion.div}
          ref={overlayRef}
          className="fixed inset-0 bg-black/20 backdrop-blur"
          aria-hidden="true"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="mx-auto rounded ">
            <SharedModal
              index={curIndex}
              direction={direction}
              loaders={loaders}
              changeLoaderId={changeLoaderId}
              closeModal={handleClose}
              navigation={true}
            />
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  )
}

export default LoaderModel
