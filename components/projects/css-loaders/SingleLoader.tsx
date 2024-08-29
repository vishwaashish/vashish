'use client'
import { DEFAULT_SETTINGS } from '@/common/loaders-constants'
import InnerHTML from '@/components/shared/InnerHtml'

import CodeTabs from '@/components/projects/css-loaders/CodeTabs'
// import CustomizeLoader from '@/components/projects/css-loaders/CustomizeLoader'
import { getLoaderValues } from '@/components/projects/css-loaders/data'
import { CustomizeSkeleton } from '@/components/projects/css-loaders/Skeleton'
import { Button } from '@/components/ui/button'
import { useAppDispatch, useAppSelector } from '@/store'
import { selectLoaderState, setLoader } from '@/store/cssLoaders'
import { ILoaderParams, LoaderType } from '@/types/css-loaders.model'
import { ArrowLeft } from 'lucide-react'
import dynamic from 'next/dynamic'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Loaders from './Loaders'

const CustomizeLoader = dynamic(
  async () => import('@/components/projects/css-loaders/CustomizeLoader'),
  {
    ssr: false,
    loading: () => <CustomizeSkeleton />,
  },
)

interface SingleLoaderProps {
  index: number
  state: ILoaderParams
  element: LoaderType
  loaders: LoaderType[]
}
const SingleLoader = ({
  index,
  state,
  element,
  loaders,
}: SingleLoaderProps) => {
  console.log('loaders', loaders)
  const router = useRouter()
  const storeState = useAppSelector(selectLoaderState)
  const values = getLoaderValues(storeState)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (Object.keys(state).length) dispatch(setLoader(state))
  }, [state])

  const rootString = `:root {
        --loader-primary: #${values.primaryColor};
        --loader-secondary: #${values.secondaryColor};
        --loader-border: ${values.border};
        --loader-width: ${values.size};
        --loader-speed: ${values.speed};
      } 
    `

  const loaderTabs = [
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24"
          height="24"
          className="text-[#e74d4d] w-5 h-5"
        >
          <path fill="none" d="M0 0h24v24H0z"></path>
          <path
            fill="currentColor"
            d="M12 18.178l4.62-1.256.623-6.778H9.026L8.822 7.89h8.626l.227-2.211H6.325l.636 6.678h7.82l-.261 2.866-2.52.667-2.52-.667-.158-1.844h-2.27l.329 3.544L12 18.178zM3 2h18l-1.623 18L12 22l-7.377-2L3 2z"
          ></path>
        </svg>
      ),
      title: 'HTML',
      value: 'HTML',
      parser: 'html',
      element: element.html,
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24"
          height="24"
          className="text-blue-600 w-5 h-5"
        >
          <path fill="none" d="M0 0h24v24H0z"></path>
          <path
            fill="currentColor"
            d="M5 3l-.65 3.34h13.59L17.5 8.5H3.92l-.66 3.33h13.59l-.76 3.81-5.48 1.81-4.75-1.81.33-1.64H2.85l-.79 4 7.85 3 9.05-3 1.2-6.03.24-1.21L21.94 3z"
          ></path>
        </svg>
      ),
      title: 'CSS',
      value: 'CSS',
      parser: 'css',
      element: rootString + element.css,
    },
  ]
  return (
    <>
      <br />
      <div className="flex gap-4 items-center justify-between w-full">
        <Button
          variant="ghost"
          onClick={() => {
            router.back()
          }}
        >
          <ArrowLeft size={15}></ArrowLeft>
          Go Back
        </Button>
        <CustomizeLoader size="sm"></CustomizeLoader>
        <h1 className="text-xl font-bold">Loader{element.id}</h1>
      </div>
      <br />

      <div className="block shadow-lg md:flex border-none md:min-h-[250px] rounded-xl overflow-hidden md:resize-y max-w-full md:flex-row md:h-[calc(100vh-190px)]">
        <div
          className="flex relative  md:min-w-[330px] max-md:min-h-[450px] max-md:w-full h-[calc(100vh-140px)] md:h-auto md:min-h-[100px]"
          style={{
            flex: '0 0 auto',
            width: '50%',
          }}
        >
          <div className="absolute hidden md:block w-[5px] h-full bg-input top-0 right-0 z-10"></div>
          <div className="flex flex-1 absolute w-full left-0 top-0 py-10 h-full font-sans border-none ">
            <div className="flex h-full w-full text-foreground border-none">
              <div className="flex  items-center justify-center h-full w-full relative z-[1] ">
                <InnerHTML html={element.html} css={element.css} />
              </div>
            </div>
          </div>
        </div>

        <div className="relative max-w-full w-full overflow-hidden flex flex-col md:h-full h-[600px] p-2">
          <CodeTabs
            defaultValue={loaderTabs[0].value}
            options={loaderTabs}
            codeTabClassName="md:h-[calc(100vh-260px)]"
          />
        </div>
      </div>
      <br />

      {
        <Loaders
          loaders={loaders}
          className="grid-cols-1 md:grid-cols-2 lg:grid-cols-5 scale-75 hover:scale-75"
          loaderClass="opacity-30 hover:opacity-100"
        />
      }
      {/* <Carousel element={element} index={index} state={state} /> */}
    </>
  )
}

export default SingleLoader
