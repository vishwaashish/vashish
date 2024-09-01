'use client'
import Container from '@/components/shared/Container'
import InnerHTML from '@/components/shared/InnerHtml'
import { formatCode } from '@/components/utils'
import { type ILoaderParams, type LoaderType } from '@/types/css-loaders.model'
import type React from 'react'
import { useEffect, useState } from 'react'
import renderCode from '../codesnapshot/shikiRenderer'
import { getLoaderValues } from './data'

const SharedModalRightSide = ({
  activeLoader, //
  setting,
}: {
  indexProps: number
  activeLoader: LoaderType
  setting: ILoaderParams
}) => {
  const [state, setState] = useState(['', ''])
  const values = getLoaderValues(setting)
  const rootString = `:root {
      --loader-primary: #${values.primaryColor};
      --loader-secondary: #${values.secondaryColor};
      --loader-border: ${values.border};
      --loader-width: ${values.size};
      --loader-speed: ${values.speed};
    }
  `

  useEffect(() => {
    const highlightCode = async () => {
      try {
        const htmlFormat = await formatCode(activeLoader.html, 'html')
        const html = await renderCode(
          htmlFormat || '',
          'javascript',
          'dark-plus',
        )
        const cssFormat = await formatCode(rootString + activeLoader.css, 'css')
        const css = await renderCode(cssFormat || '', 'css', 'dark-plus')
        setState([html, css])
      } catch (e) {
        console.error(e)
      }
    }

    highlightCode()
  }, [activeLoader.css, activeLoader.html, rootString])

  return (
    <>
      <Container>
        <InnerHTML html={state[0]}></InnerHTML>
        <InnerHTML html={state[1]}></InnerHTML>
        {/* <Disclosure>
          {({ open }) => (
            <>
              <Disclosure.Button className="flex w-full rounded justify-between items-center  p-5 min-w-full bg-base-200 hover:bg-base-300  ">
                <h2 className="m-0 text-xl md:text-2xl">Source code</h2>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className={`${
                    open ? 'rotate-180 transform' : ''
                  } transition-all h-7 w-7`}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 15.75l7.5-7.5 7.5 7.5"
                  />
                </svg>
              </Disclosure.Button>
              <Transition
                enter="transition duration-100 ease-out"
                enterFrom="transform scale-95 opacity-0"
                enterTo="transform scale-100 opacity-100"
                leave="transition duration-75 ease-out"
                leaveFrom="transform scale-100 opacity-100"
                leaveTo="transform scale-95 opacity-0"
              >
                <Disclosure.Panel className="px-4 py-4 border border-base-300 rounded  border-sm">
                  <div className="">
                    <Card
                      title="HTML"
                      titleProps={
                        <CopyButton
                          className="btn btn-sm btn-circle "
                          onClick={async () =>
                            copyToClipboard(activeLoader.html)
                          }
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
                          onClick={async () =>
                            copyToClipboard(rootString + activeLoader.css)
                          }
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
                </Disclosure.Panel>
              </Transition>
            </>
          )}
        </Disclosure> */}
      </Container>

      <div></div>
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
export default SharedModalRightSide
