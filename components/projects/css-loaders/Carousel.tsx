import { LoaderType } from '@/types/css-loaders.model'
import { useRouter } from 'next/router'
import { FC } from 'react'
import SharedModal from './SharedModal'

interface Carousel {
  index: number
  element: LoaderType
}

const Carousel: FC<Carousel> = ({ index, element }) => {
  const router = useRouter()

  function closeModal() {
    router.push('/css-loaders', undefined, { shallow: true })
  }

  function changeLoaderId(newVal: number): void {}

  return (
    <div className="relative z-50">
      <button
        className="absolute inset-0 z-50 cursor-default  backdrop-blur-2xl "
        onClick={closeModal}
      ></button>
      <SharedModal
        index={index}
        changeLoaderId={changeLoaderId}
        currentPhoto={element}
        closeModal={closeModal}
        navigation={false}
      />
    </div>
  )
}

export default Carousel
