import React, { useRef, useState } from 'react'
import { Dialog } from '@headlessui/react'
import { useRouter } from 'next/router'
import { LOADER } from '@/common/loaders-constants'
import _ from 'lodash'
import { motion } from 'framer-motion'

import SharedModal from './SharedModal'
const LoaderModel = ({
  loaders,
  onClose,
}: {
  loaders: any
  onClose: () => void
}) => {
  const router = useRouter()
  let overlayRef = useRef()
  const { loaderId } = router.query
  let index = Number(loaderId)

  const element = _.find(LOADER, 'id')

  const [direction, setDirection] = useState(0)
  const [curIndex, setCurIndex] = useState(index)

  function handleClose() {
    router.push('/css-loaders', undefined, { shallow: true })
    onClose()
  }

  function changePhotoId(newVal: number) {
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
        // static
        open={true}
        onClose={handleClose}
        initialFocus={overlayRef}
        // className="fixed inset-0 bg-red-500 z-10 flex items-center justify-center"
        // className="fixed inset-0 bg-red-500 z-10 flex items-center justify-center"
      >
        {/* <Dialog.Overlay
          // ref={overlayRef}
          as={motion.div}
          key="backdrop"
          // className="fixed inset-0 z-30  backdrop-blur-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        ></Dialog.Overlay> */}

        <Dialog.Overlay
          key="backdrop"
          as={motion.div}
          ref={overlayRef}
          className="fixed inset-0 bg-black/30 backdrop-blur-lg"
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
              changePhotoId={changePhotoId}
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
