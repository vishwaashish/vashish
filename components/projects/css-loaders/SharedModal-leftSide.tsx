import { Icon } from '@/components/shared/Button'
import { cn } from '@/components/utils'
import { ILoaderParams, LoaderType } from '@/types/css-loaders.model'
import dynamic from 'next/dynamic'
import { FC, memo } from 'react'

const CustomizeLoader = dynamic(() => import('./CustomizeLoader'), {
  ssr: false,
})

interface SharedModalLeftSide {
  activeLoader: LoaderType
  closeModal: () => void
  direction: number
  index: number
  onLeft: () => void
  onRight: () => void
  loadersLength: number
  setting: ILoaderParams
}
const SharedModalLeftSide: FC<SharedModalLeftSide> = ({
  closeModal,
  index,
  onLeft,
  onRight,
  direction,
  activeLoader,
  loadersLength,
  setting,
}) => {
  console.log('direction', direction)
  const buttonClass = 'btn btn-sm  btn-circle md:btn-md shadow'

  // const loader = useMemo(
  //   () => (

  //   ),
  //   [activeLoader?.css, activeLoader.html, direction, index],
  // )
  return (
    <>
      <div className="absolute top-1  flex items-center gap-2 p-3 ">
        <h1 className="text-lg font-bold">Loader {index + 1}</h1>
      </div>

      <div className="absolute top-0 right-0 flex items-center gap-2 p-3 ">
        <Icon
          label="Close"
          onClick={() => closeModal()}
          className={cn(buttonClass)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"
            />
          </svg>
        </Icon>
      </div>

      <span
        className="absolute animate-bounce bottom-0 tooltip  items-center gap-2 p-3 block lg:hidden"
        data-tip="Scroll Down"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12.75l3 3m0 0l3-3m-3 3v-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </span>

      {
        <>
          {index > 0 && (
            <div className=" absolute left-3 top-[calc(50%-16px)] ">
              <Icon label="Left" className={cn(buttonClass)} onClick={onLeft}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 19.5L8.25 12l7.5-7.5"
                  />
                </svg>
              </Icon>
            </div>
          )}

          {index + 1 < loadersLength && (
            <div className="absolute right-3 top-[calc(50%-16px)]  ">
              <Icon label="Right" className={cn(buttonClass)} onClick={onRight}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 4.5l7.5 7.5-7.5 7.5"
                  />
                </svg>
              </Icon>
            </div>
          )}
        </>
      }

      <div className="absolute  bottom-5 hidden md:block">
        <CustomizeLoader size="btn-sm" state={setting} />
      </div>

      {/* <motion.div
        className="w-full h-full grid place-content-center"
        key={index}
        custom={direction}
        variants={{
          enter: (direction: number) => {
            return {
              x: direction < 0 ? -500 : 500,
              opacity: 0,
            }
          },
          center: {
            x: 0,
            opacity: 1,
          },
          exit: (direction: number) => {
            return {
              x: direction > 0 ? -500 : 500,
              opacity: 0,
            }
          },
        }}
        initial="enter"
        animate="center"
        exit="exit"
      >
        <InnerHTML html={activeLoader.html} css={activeLoader?.css} />
      </motion.div> */}
    </>
  )
}

export default SharedModalLeftSide
