import { Suspense, forwardRef, memo, useEffect, useRef, useState } from 'react'
import InfiniteViewer from 'react-infinite-viewer'
import EditorContent from './EditorContent' // Assuming EditorContent is a separate component for editor content

const EditorContainer = forwardRef<HTMLDivElement, any>((_props, ref) => {
  const editorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (editorRef.current) {
      const height = editorRef.current.clientHeight + 200
      const code = document.querySelector('.codesnapshotviewer')
      if (code) {
        code.setAttribute('style', `height: ${height}px`)
      }
    }
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
        <div className="viewport">
          <div ref={editorRef}>
            <EditorContent ref={ref} />
          </div>
        </div>
      </InfiniteViewer>
    </div>
  )
})

EditorContainer.displayName = 'EditorContainer'
export default EditorContainer
