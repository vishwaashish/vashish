import dynamic from 'next/dynamic'
import { useEffect, useRef } from 'react'
import InfiniteViewer from 'react-infinite-viewer'
const EditorContent = dynamic(() => import('./EditorContent'))

const EditorContainer = () => {
  const editorRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const updateHeight = () => {
      if (editorRef.current) {
        const code = document.querySelector('.codesnapshotviewer')
        if (code) {
          const height = Math.max(400, editorRef.current.clientHeight + 100)
          code.setAttribute('style', `height: ${height}px`)
        }
      }
    }

    updateHeight()
  })
  return (
    <div className="flex justify-center items-center">
      <InfiniteViewer
        className={`codesnapshotviewer viewer w-full  border-2  rounded-xl border-y-8  `}
        margin={0}
        threshold={100}
        rangeX={[-2000, 2000]}
        rangeY={[-2000, 2000]}
        useAutoZoom={true}
        useWheelScroll={true}
        displayHorizontalScroll={true}
        displayVerticalScroll={true}
      >
        <div className="viewport flex justify-center items-center h-full">
          <div ref={editorRef} className=" w-min " id="editor_viewport">
            {EditorContent && <EditorContent />}
          </div>
        </div>
      </InfiniteViewer>
    </div>
  )
}

export default EditorContainer
