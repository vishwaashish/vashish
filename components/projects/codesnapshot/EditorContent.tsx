import {
  selectCodeSnapShotState,
  setCode,
  setEditorStyleWidthHeight,
  setHighlightedCode,
} from '@/store/codesnapshotStore'
import { ICodeSnapShort } from '@/types/codesnapshot.model'
import { useCallback, useState, useEffect, memo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import renderCode from './shikiRenderer'

const EditorContent = () => {
  const {
    code,
    language,
    themes,
    highlightedCode,
    lineNumber,
    editorPadding,
    editorBackground,
    editorHeader,
    editorRadius,
    editorlineNumberCode,
    editorStyle,
  }: ICodeSnapShort = useSelector(selectCodeSnapShotState)

  const dispatch = useDispatch()

  const textareaElement = useCallback(() => {
    const divElement = document.querySelector('.shikicontainer')
    divElement &&
      dispatch(
        setEditorStyleWidthHeight({
          width: divElement.clientWidth,
          height: divElement.clientHeight,
        }),
      )
  }, [dispatch])

  const memoizedHighlightCode = useCallback(async () => {
    try {
      const highlighted = await renderCode(
        code,
        language,
        themes,
        lineNumber,
        editorHeader,
      )
      highlighted &&
        dispatch(setHighlightedCode({ code: highlighted, isLineNumber: true }))

      textareaElement()
    } catch (e) {
      console.error(e)
    }
  }, [
    code,
    language,
    themes,
    lineNumber,
    editorHeader,
    dispatch,
    textareaElement,
  ])

  useEffect(() => {
    memoizedHighlightCode()
  }, [memoizedHighlightCode])

  //   useEffect(() => {
  //     textareaElement()
  //   }, [textareaElement])

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      dispatch(setCode(e.target.value))
    },
    [dispatch],
  )

  const handleKeyUp = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.ctrlKey && event.key === 'v') {
      dispatch(setCode((event.target as HTMLInputElement).value))
    }
  }

  return (
    <div
      className="relative w-min not-prose text-sm"
      style={{
        padding: editorPadding + 'rem',
        backgroundColor: editorBackground.backgroundColor,
        backgroundImage: editorBackground.backgroundImage,
      }}
    >
      <div
        className="relative overflow-hidden"
        style={{
          borderRadius: editorRadius + 'px',
        }}
      >
        <div
          className="flex h-10 w-full items-center justify-between gap-4 px-5"
          style={{ backgroundColor: editorStyle.headerColor }}
        >
          <div className="grid h-full w-full items-center grid-cols-[60px_1fr_60px] gap-4">
            <div className="flex items-center gap-2">
              <div className="h-[13px] w-[13px] rounded-full bg-[#ff5f57]"></div>
              <div className="h-[13px] w-[13px] rounded-full bg-[#febc2e]"></div>
              <div className="h-[13px] w-[13px] rounded-full bg-[#28c840]"></div>
            </div>
            <div className="filename flex justify-center"></div>
            <div></div>
          </div>
        </div>
        <div
          className="px-5 py-3 shikicontainer leading-relaxed flex flex-row"
          style={{
            backgroundColor: editorStyle.backgroundColor,
          }}
        >
          <div
            className="flex flex-col items-end"
            style={{ paddingRight: '1rem' }}
            dangerouslySetInnerHTML={{
              __html: editorlineNumberCode,
            }}
          />

          <div className="relative w-full">
            <textarea
              style={{
                fontFamily:
                  'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
                height: editorStyle.height +'px',
              }}
              className="shikitextarea overflow-hidden textarea p-0 left-0 top-0 textarea-bordered border-0 outline-0 focus:outline-0 caret-slate-100 text-transparent leading-relaxed resize-none w-full bg-transparent absolute"
              value={code}
              placeholder="Enter Code"
              onChange={handleChange}
              onKeyUp={handleKeyUp}
            ></textarea>

            <div
              className=" overflow-auto text-left rounded-none bg-transparent "
              dangerouslySetInnerHTML={{
                __html: highlightedCode,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default memo(EditorContent)
