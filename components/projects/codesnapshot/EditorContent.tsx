import {
  selectCodeSnapShotState,
  setCode,
  setHighlightedCode,
} from '@/store/codesnapshotStore'
import { ICodeSnapShort } from '@/types/codesnapshot.model'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import renderCode from './shikiRenderer'
import { useAutosizeTextArea } from './useAutosizeTextArea'

const EditorContent = () => {
  const {
    code,
    programmingLanguage,
    theme,
    highlightedCode,
    showLineNumbers,
    editorContainer,
    showHeader,
    lineNumberCode,
  }: ICodeSnapShort = useSelector(selectCodeSnapShotState)

  const { padding, borderRadius, editor } = editorContainer
  const textAreaRef = useRef<HTMLTextAreaElement>(null)
  const editorContent = useRef(null)
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true)

  useAutosizeTextArea(
    textAreaRef.current,
    editorContent.current,
    highlightedCode,
  )

  useEffect(() => {
    const highlightCode = async () => {
      setLoading(true)
      try {
        const highlighted = await renderCode(code, programmingLanguage, theme)
        if (highlighted) {
          dispatch(
            setHighlightedCode({ code: highlighted, isLineNumber: true }),
          )
        }
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }

    highlightCode()
  }, [code, dispatch, programmingLanguage, theme])

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
      className="w-min flex"
      style={{
        padding: `${padding}rem`,
        backgroundColor: editorContainer.backgroundColor,
        backgroundImage: editorContainer.backgroundImage,
      }}
    >
      <div
        className="not-prose text-sm join join-vertical overflow-hidden"
        style={{
          borderRadius: `${borderRadius}px`,
        }}
      >
        {showHeader ? (
          <div
            className="flex join-item m-auto h-10 w-full items-center justify-between gap-4 px-5"
            style={{ backgroundColor: editor.headerColor }}
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
        ) : (
          ''
        )}

        <div
          className="px-5 py-2 m-auto join-item shikicontainer leading-relaxed flex flex-row"
          style={{
            backgroundColor: editor.backgroundColor,
            minHeight: 10,
          }}
        >
          {showLineNumbers && (
            <div
              className="flex flex-col items-end pr-3"
              dangerouslySetInnerHTML={{
                __html: lineNumberCode,
              }}
            />
          )}

          {loading ? (
            <div className="animate-pulse w-full py-2">
              <div className=" bg-slate-200 rounded text-gray-500">
                Loading...
              </div>
            </div>
          ) : (
            <div className="relative w-full">
              <textarea
                ref={textAreaRef}
                style={{
                  fontFamily:
                    'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
                  caretColor: editor.color,
                }}
                className="shikitextarea z-1 rounded-none !min-h-0 overflow-hidden textarea p-0 left-0 top-0 textarea-bordered border-0 outline-0 focus:outline-0 caret-slate-1001 text-transparent leading-relaxed resize-none w-full bg-transparent absolute"
                value={code}
                rows={1}
                placeholder="Enter Code"
                onChange={handleChange}
                onKeyUp={handleKeyUp}
              ></textarea>
              <div
                ref={editorContent}
                style={{
                  // padding: '10px 0 10px 0',
                  minWidth: 100,
                  // minHeight: 48,
                }}
                className="overflow-auto text-left rounded-none bg-transparent"
                dangerouslySetInnerHTML={{
                  __html: highlightedCode,
                }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default EditorContent
