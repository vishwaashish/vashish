'use client'
import InnerHTML from '@/components/shared/InnerHtml'

import CodeTabs from '@/components/projects/css-loaders/CodeTabs'
// import CustomizeLoader from '@/components/projects/css-loaders/CustomizeLoader'
import { getLoaderValues } from '@/components/projects/css-loaders/data'
import { CustomizeSkeleton } from '@/components/projects/css-loaders/Skeleton'
import Container from '@/components/shared/Container'
import { Button } from '@/components/ui/button'
import { useAppDispatch, useAppSelector } from '@/store'
import { selectLoaderState, setLoader } from '@/store/cssLoaders'
import { ILoaderParams, LoaderType } from '@/types/css-loaders.model'
import { ArrowLeft, SquareCode } from 'lucide-react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Loaders from './Loaders'
import { cn } from '@/components/utils'

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
const SingleLoader = ({ state, element, loaders }: SingleLoaderProps) => {
  const router = useRouter()
  const storeState = useAppSelector(selectLoaderState)
  const values = getLoaderValues(storeState)
  const dispatch = useAppDispatch()
  const [showSidebar, setShowSidebar] = useState(false)

  useEffect(() => {
    if (Object.keys(state).length) dispatch(setLoader(state))
  }, [state, dispatch])

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
      element: `

        ${element.html}

        <style>
        ${rootString} 
        ${element.css}
        </style>`,
    },
    // {
    //   icon: (
    //     <svg
    //       xmlns="http://www.w3.org/2000/svg"
    //       viewBox="0 0 24 24"
    //       width="24"
    //       height="24"
    //       className="text-blue-600 w-5 h-5"
    //     >
    //       <path fill="none" d="M0 0h24v24H0z"></path>
    //       <path
    //         fill="currentColor"
    //         d="M5 3l-.65 3.34h13.59L17.5 8.5H3.92l-.66 3.33h13.59l-.76 3.81-5.48 1.81-4.75-1.81.33-1.64H2.85l-.79 4 7.85 3 9.05-3 1.2-6.03.24-1.21L21.94 3z"
    //       ></path>
    //     </svg>
    //   ),
    //   title: 'CSS',
    //   value: 'CSS',
    //   parser: 'css',
    //   element: rootString + element.css,
    // },
  ]
  return (
    <Container className="py-2 relative">
      <div
        className={cn(
          'shadow-lg grid md:divide-x divide-x-0 md:divide-y-0 divide-y border md:mt-4  rounded-xl overflow-hidden md:resize-y max-w-full',
          !showSidebar ? 'md:grid-cols-1' : 'md:grid-cols-2',
        )}
      >
        <div className="flex relative min-h-[350px] h-[calc(100vh-190px)]">
          <div className="flex absolute top-0 justify-between w-full flex-wrap gap-4 items-center z-10 pr-2">
            {/* <span className="absolute text-muted-foreground top-0 left-0 bg-popover/40 rounded-tl-lg px-2 py-1 rounded-br-lg drop-shadow-md">
          </span> */}

            <Button
              variant="ghost"
              onClick={() => {
                router.push('/css-loaders')
              }}
              className="hover:bg-transparent"
            >
              <ArrowLeft size={15}></ArrowLeft>
              Go Back
            </Button>

            <div className="bg-popover/40 text-2xl rounded-lg px-2 py-1">
              #{element.id}
            </div>

            <Button
              variant="ghost"
              onClick={() => {
                setShowSidebar(val => !val)
              }}
              className="hover:bg-transparent"
            >
              <SquareCode />
              &nbsp; Code
            </Button>

            {/* <CustomizeLoader size="sm" className="mx-0"></CustomizeLoader> */}
            {/* <h1 className="text-xl font-bold">Loader{element.id}</h1> */}
          </div>
          {/* <div className="absolute hidden md:block w-[5px] h-full bg-input top-0 right-0 z-10"></div> */}
          <div className="flex flex-1 absolute w-full left-0 top-0 h-full font-sans border-none ">
            <div className="flex h-full w-full text-foreground border-none">
              <div className="flex  items-center justify-center h-full w-full relative z-[1] ">
                <InnerHTML html={element.html} css={element.css} />
              </div>
            </div>
          </div>
        </div>

        {showSidebar && (
          <div className="relative max-w-full w-full overflow-hidden flex flex-col p-2">
            <CodeTabs
              defaultValue={loaderTabs[0].value}
              options={loaderTabs}
              codeTabClassName="min-h-[350px] max-h-[calc(100vh-190px)]"
            />
          </div>
        )}
      </div>
      <br />

      <Loaders
        loaders={loaders}
        className="grid-cols-2 gap-5 md:gap-5 md:grid-cols-4 lg:grid-cols-4 lg:scale-75 lg:hover:scale-75"
        loaderClass="opacity-50 hover:opacity-100  aspect-square md:aspect-video"
      />
      <div className="w-full sticky overflow-auto bottom-0 rounded-lg bg-card mt-5">
        <CustomizeLoader
          size="sm"
          className="w-fit  mx-auto p-3 flex-nowrap px-5  "
        ></CustomizeLoader>
      </div>
      <br />
      {/* <Carousel element={element} index={index} state={state} /> */}
    </Container>
  )
}

export default SingleLoader
