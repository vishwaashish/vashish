import Image from 'next/image'
import { useRouter } from 'next/router'
import Loader from './Loader'
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
    <div className="fixed inset-0 flex items-center justify-center">
      <button
        className="absolute inset-0 z-30 cursor-default  backdrop-blur-2xl "
        onClick={closeModal}
      >
        {/* <section
          key={`loaders${element.id}`}
          className="flex items-center justify-center"
          // className="aspect-video w-full flex justify-center items-center card  shadow-base-200 hover:bg-base-200 border border-base-300"
          // onClick={click(item)}
          style={{
            boxShadow:
              'inset rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px',
          }}
        >
          <Loader html={element.html} css={element.css} />
        </section> */}
        {/* <section
          key={`loaders${element.id}`}
          className="flex items-center justify-center"
          // className="aspect-video w-full flex justify-center items-center card  shadow-base-200 hover:bg-base-200 border border-base-300"
          // onClick={click(item)}
          style={{
            boxShadow:
              'inset rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px',
          }}
        >
          <style type="text/css">{element.css}</style>
          <span dangerouslySetInnerHTML={{ __html: element.html }} />
        </section> */}

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
