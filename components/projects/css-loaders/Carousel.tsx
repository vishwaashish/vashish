import Image from "next/image";
import { useRouter } from "next/router";
// import SharedModal from "./SharedModal";

export default function Carousel({
  index,
  currentPhoto,
}: {
  index: any;
  currentPhoto: any;
}) {
  const router = useRouter();

  function closeModal() {
    router.push("/", undefined, { shallow: true });
  }

  function changePhotoId(newVal: number) {
    return newVal;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <button
        className="absolute inset-0 z-30 cursor-default bg-black backdrop-blur-2xl"
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
      {/* <SharedModal
        index={index}
        changePhotoId={changePhotoId}
        currentPhoto={currentPhoto}
        closeModal={closeModal}
        navigation={false}
      /> */}
    </div>
  );
}
