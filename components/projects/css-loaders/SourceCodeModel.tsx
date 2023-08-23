import { copyText } from '@/components/utils/text'
import { Dialog } from '@headlessui/react'
import { FC, useEffect, useState } from 'react'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { motion } from 'framer-motion'
import { LoaderType } from '@/types/css-loaders.model'

interface SourceCodeModel {
  open: boolean
  close: () => void
  loader: LoaderType
}
const SourceCodeModel: FC<SourceCodeModel> = ({
  open,
  close,
  loader,
}) => {
  const [rootString, setRootString] = useState('')

  useEffect(() => {
    const style = getComputedStyle(document.body)
    const root = `:root {
      --loader-primary: ${style.getPropertyValue('--loader-primary')};
      --loader-secondary: ${style.getPropertyValue('--loader-secondary')};
      --loader-border: ${style.getPropertyValue('--loader-width')};
      --loader-width: ${style.getPropertyValue('--loader-border')};
    }
  `
    if (root) {
      setRootString(root)
    }
  }, [])
  return (
    <Dialog className="" open={open} onClose={close}>
      <motion.div
        key="backdrop"
        className="fixed inset-0 bg-black/30 backdrop-blur-lg"
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      />
      <div className="z-50 fixed inset-0 flex items-center justify-center">
        <Dialog.Panel className="prose w-full max-w-3xl max-h-screen overflow-auto bg-base-100 rounded p-5">
          <Dialog.Title className="flex justify-between items-center mb-3">
            Source Code
            <span className="tooltip tooltip-bottom" data-tip="Close">
              <button onClick={close} className={'btn btn-sm  btn-circle'}>
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
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </span>
          </Dialog.Title>
          <div className="divider mt-0"></div>
          <Dialog.Description>
            <div>
              <CopyCard
                title="HTML"
                titleProps={
                  <CopyButton
                    className="btn btn-sm btn-circle "
                    onClick={() => copyText(loader.html)}
                  />
                }
              >
                <SyntaxHighlighter
                  language="html"
                  showLineNumbers
                  customStyle={{ margin: 0 }}
                >
                  {loader.html}
                </SyntaxHighlighter>
              </CopyCard>
              <br />
              <CopyCard
                title="CSS"
                titleProps={
                  <CopyButton
                    className="btn btn-sm btn-circle "
                    onClick={() => copyText(rootString + loader.css)}
                  />
                }
              >
                <SyntaxHighlighter
                  language="css"
                  showLineNumbers
                  customStyle={{ margin: 0, maxHeight: 350 }}
                >
                  {rootString + loader.css}
                </SyntaxHighlighter>
              </CopyCard>
            </div>
          </Dialog.Description>
        </Dialog.Panel>
      </div>
    </Dialog>
  )
}

export const CopyCard = ({
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
      <div className="flex justify-between item-center mb-2 ">
        <h3 className="m-0">{title}</h3>
        {titleProps}
      </div>
      {children}
    </div>
  )
}
export const CopyButton = ({ onClick, className }: any) => {
  return (
    <button className={className} onClick={onClick}>
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
          d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75"
        />
      </svg>
    </button>
  )
}

export default SourceCodeModel
