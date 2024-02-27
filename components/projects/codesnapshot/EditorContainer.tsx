import { Suspense, forwardRef } from 'react'
import InfiniteViewer from 'react-infinite-viewer'
import EditorContent from './EditorContent' // Assuming EditorContent is a separate component for editor content

const EditorContainer = forwardRef<HTMLDivElement, any>((_props, ref) => {

  return (
    <div className="flex justify-center items-center">
      <InfiniteViewer
        className="viewer w-full h-[50vh] border-2  rounded-xl overflow-hidden border-y-8 "
        margin={0}
        threshold={100}
        rangeX={[-5000, 5000]}
        rangeY={[-5000, 5000]}
        onScroll={e => {
          console.log(e)
        }}
        onDrag={e => {
          console.log(e)
        }}
        usePinch={true}
        displayHorizontalScroll={true}
        displayVerticalScroll={true}
      >
        <div className="viewport">
          <div ref={ref} className="">
            <Suspense fallback={<>Loading...</>}>
              <EditorContent />
            </Suspense>
          </div>
        </div>
      </InfiniteViewer>
    </div>
  )
})

EditorContainer.displayName = 'EditorContainer'
export default EditorContainer
