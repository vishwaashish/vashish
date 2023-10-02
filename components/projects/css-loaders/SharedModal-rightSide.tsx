import { copyText } from '@/components/utils/text'
import { ILoaderParams, LoaderType } from '@/types/css-loaders.model'
import React from 'react'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { CopyButton } from '../../shared/button/CopyButton'
import CustomizeLoader from './CustomizeLoader'

const SharedModalRightSide = ({
  indexProps,
  activeLoader,
  setting,
  sourceCode,
}: {
  indexProps: number
  activeLoader: LoaderType
  setting: ILoaderParams
  sourceCode: boolean
}) => {
  const rootString = `:root {
    --loader-primary: ${setting.primaryColor};
    --loader-secondary: ${setting.secondaryColor};
    --loader-border: ${setting.border};
    --loader-width: ${setting.size};
    --loader-speed: ${setting.speed};
  }
`

  return (
    <>
      <h1 className="flex justify-between items-center mb-3 mt-5 px-3">
        Loader {indexProps}
      </h1>
      <div className="divider my-2 "></div>
      <div>
        {/* {loading ? (
          <div className="mx-auto max-w-[1000px] flex gap-3">
            <div className="flex animate-pulse flex-wrap gap-x-3 gap-y-3 md:gap-x-5 md:gap-y-5 justify-center mx-auto w-full">
              <div className="flex flex-col text-left grow sm:grow-0  gap-1  min-w-[156px] ">
                <div className="h-[25px] bg-base-300 rounded-lg"></div>
                <div className="h-[32px] bg-base-300 rounded-lg"></div>
              </div>
              <div className="flex flex-col text-left grow sm:grow-0  gap-1  min-w-[94px] ">
                <div className="h-[25px] bg-base-300 rounded-lg"></div>
                <div className="h-[32px] bg-base-300 rounded-lg"></div>
              </div>
              <div className="flex flex-col text-left grow sm:grow-0  gap-1  min-w-[94px] ">
                <div className="h-[25px] bg-base-300 rounded-lg"></div>
                <div className="h-[32px] bg-base-300 rounded-lg"></div>
              </div>
              <div className="flex flex-col text-left grow sm:grow-0  gap-1  min-w-[149px] ">
                <div className="h-[25px] bg-base-300 rounded-lg"></div>
                <div className="h-[32px] bg-base-300 rounded-lg"></div>
              </div>
              <div className="flex flex-col text-left grow sm:grow-0  gap-1  min-w-[149px] ">
                <div className="h-[25px] bg-base-300 rounded-lg"></div>
                <div className="h-[32px] bg-base-300 rounded-lg"></div>
              </div>
              <div className="flex flex-col text-left grow sm:grow-0  gap-1  min-w-[49.6px] ">
                <div className="h-[25px] bg-base-300 rounded-lg"></div>
                <div className="h-[32px] bg-base-300 rounded-lg"></div>
              </div>
            </div>
          </div>
        ) : ( */}
        {/* )} */}

        <div className="hidden lg:block">
          {sourceCode && (
            <CustomizeLoader
              size="btn-sm"
              index={indexProps}
              // setState={setSetting}
            />
          )}
          <div className="divider "></div>
        </div>
        {
          <div className="">
            <Card
              title="HTML"
              titleProps={
                <CopyButton
                  className="btn btn-sm btn-circle "
                  onClick={() => copyText(activeLoader.html)}
                />
              }
            >
              <SyntaxHighlighter
                language="html"
                showLineNumbers
                customStyle={{
                  margin: 0,
                  borderRadius: 0,
                }}
              >
                {activeLoader.html}
              </SyntaxHighlighter>
            </Card>
            <br />
            <Card
              title="CSS"
              titleProps={
                <CopyButton
                  className="btn btn-sm btn-circle "
                  onClick={() => copyText(rootString + activeLoader.css)}
                />
              }
            >
              <SyntaxHighlighter
                language="css"
                showLineNumbers
                wrapLines
                customStyle={{ margin: 0, borderRadius: 0 }}
              >
                {rootString + activeLoader.css}
              </SyntaxHighlighter>
            </Card>
          </div>
        }
      </div>
    </>
  )
}

const Card = ({
  titleProps,
  title,
  children,
}: {
  title: string
  children?: React.ReactNode
  titleProps?: any
  isCopy?: boolean
}) => {
  return (
    <div className="">
      <div className="flex justify-between item-center mb-2 px-3">
        <p className="m-0">{title}</p>
        {titleProps}
      </div>
      <div className="border-2 border-x-0 ">{children}</div>
    </div>
  )
}
// const SkeletonCustomize = () => {
//   return (
//     <div className="mx-auto max-w-[1000px] flex gap-3">
//       <div className="flex animate-pulse flex-wrap gap-x-3 gap-y-3 md:gap-x-5 md:gap-y-5 justify-center mx-auto w-full">
//         <div className="flex flex-col text-left grow sm:grow-0  gap-1  min-w-[156px] ">
//           <div className="h-[25px] bg-base-300 rounded-lg"></div>
//           <div className="h-[32px] bg-base-300 rounded-lg"></div>
//         </div>
//         <div className="flex flex-col text-left grow sm:grow-0  gap-1  min-w-[94px] ">
//           <div className="h-[25px] bg-base-300 rounded-lg"></div>
//           <div className="h-[32px] bg-base-300 rounded-lg"></div>
//         </div>
//         <div className="flex flex-col text-left grow sm:grow-0  gap-1  min-w-[94px] ">
//           <div className="h-[25px] bg-base-300 rounded-lg"></div>
//           <div className="h-[32px] bg-base-300 rounded-lg"></div>
//         </div>
//         <div className="flex flex-col text-left grow sm:grow-0  gap-1  min-w-[149px] ">
//           <div className="h-[25px] bg-base-300 rounded-lg"></div>
//           <div className="h-[32px] bg-base-300 rounded-lg"></div>
//         </div>
//         <div className="flex flex-col text-left grow sm:grow-0  gap-1  min-w-[149px] ">
//           <div className="h-[25px] bg-base-300 rounded-lg"></div>
//           <div className="h-[32px] bg-base-300 rounded-lg"></div>
//         </div>
//         <div className="flex flex-col text-left grow sm:grow-0  gap-1  min-w-[49.6px] ">
//           <div className="h-[25px] bg-base-300 rounded-lg"></div>
//           <div className="h-[32px] bg-base-300 rounded-lg"></div>
//         </div>
//       </div>
//     </div>
//   )
// }

export default SharedModalRightSide
