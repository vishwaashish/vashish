import { useRouter } from 'next/router'
import SharedModal from './SharedModal'
// import SharedModal from "./SharedModal";

export default function Carousel({
  index,
  element,
}: {
  index: any
  element: any
}) {
  const router = useRouter()

  function closeModal() {
    router.push('/css-loaders', undefined, { shallow: true })
  }

  function changePhotoId(newVal: number) {
    return newVal
  }

  return (
    <div
    // className="fixed inset-0 max-w-screen min-h-screen flex items-center justify-center"
    >
      <button
        className="absolute inset-0 z-30 cursor-default  backdrop-blur-2xl "
        onClick={closeModal}
      >
        {/* <Image
          src={currentPhoto.blurDataUrl}
          className="pointer-events-none h-full w-full"
          alt="blurred background"
          fill
          priority={true}
        /> */}
      </button>
      <SharedModal
        index={index}
        changePhotoId={changePhotoId}
        currentPhoto={element}
        closeModal={closeModal}
        navigation={false}
      />
    </div>
  )
}
