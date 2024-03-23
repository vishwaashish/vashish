import { cn } from '@/components/utils'
import { selectCodeSnapShotState } from '@/store/codesnapshotStore'
import { ICodeSnapShort } from '@/types/codesnapshot.model'
import dynamic from 'next/dynamic'
import { useRef } from 'react'
import InfiniteViewer from 'react-infinite-viewer'
import { useSelector } from 'react-redux'
const EditorContent = dynamic(() => import('./EditorContent'))

const EditorContainer = () => {
  const { showInfiniteView }: ICodeSnapShort = useSelector(
    selectCodeSnapShotState,
  )
  const editorRef = useRef<HTMLDivElement>(null)
  // useEffect(() => {
  // const updateHeight = () => {
  //   if (editorRef.current) {
  //     const code = document.querySelector('.codesnapshotviewer')
  //     if (code) {
  //       const height = Math.max(400, editorRef.current.clientHeight + 100)
  //       code.setAttribute('style', `height: ${height}px`)
  //     }
  //   }
  // }
  // updateHeight()
  // })

  const renderElement = () => (
    <div
      className={cn(
        'viewport flex justify-center items-center h-full',
        !showInfiniteView && 'w-fit',
      )}
    >
      <div ref={editorRef} className=" w-min " id="editor_viewport">
        {<EditorContent />}
      </div>
    </div>
  )
  return (
    <div className="flex justify-center items-center">
      {showInfiniteView ? (
        <InfiniteViewer
          className={`codesnapshotviewer viewer w-full min-h-[500px]  border-2  rounded-xl border-y-8  `}
          margin={0}
          threshold={100}
          rangeX={[-2000, 2000]}
          rangeY={[-2000, 2000]}
          useAutoZoom={true}
          useWheelScroll={true}
          displayHorizontalScroll={true}
          displayVerticalScroll={true}
        >
          {renderElement()}
        </InfiniteViewer>
      ) : (
        <div className="max-w-screen overflow-auto border-2 rounded p-2 md:p-5">
          {renderElement()}
        </div>
      )}
    </div>
  )
}

export default EditorContainer
