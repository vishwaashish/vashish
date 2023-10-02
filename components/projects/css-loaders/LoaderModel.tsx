import { LoaderType } from '@/types/css-loaders.model'
import { Dialog } from '@headlessui/react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/router'
import { FC, Suspense, lazy, useRef, useState } from 'react'
// import SharedModal from './SharedModal'

const SharedModal = lazy(() => import('./SharedModal'))

interface LoaderModel {
  loaders: LoaderType[]
  onClose: () => void
}

const LoaderModel: FC<LoaderModel> = ({ loaders, onClose }) => {
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
      <Dialog open={true} onClose={handleClose} initialFocus={overlayRef}>
        <Dialog.Overlay
          key="backdrop"
          as={motion.div}
          ref={overlayRef}
          className="fixed z-50 inset-0 bg-black/20 backdrop-blur"
          aria-hidden="true"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        />
        {/* <motion.div
          initial={{ opacity: 0, y: 100 }}
          exit={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.3,
          }}
          className="fixed z-50 inset-0 flex items-center justify-center p-4"
        > */}
        {/* <Suspense fallback="loading..."> */}
        <Dialog.Panel
          // className="mx-auto rounded "
          className="fixed z-50 inset-0 flex items-center justify-center p-4"
        >
          <SharedModal
            index={curIndex}
            direction={direction}
            loaders={loaders}
            changeLoaderId={changeLoaderId}
            closeModal={handleClose}
            navigation={true}
          />
        </Dialog.Panel>
        {/* </Suspense> */}
        {/* </motion.div> */}
      </Dialog>
    </>
  )
}

export default LoaderModel
