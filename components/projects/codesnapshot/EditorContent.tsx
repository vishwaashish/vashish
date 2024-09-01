import { formatCode } from '@/components/utils'
import {
  extractEditorColors,
  selectCodeSnapShotState,
  setCode,
  setEditorColor,
  setHighlightedCode,
  toggleFormatCode,
} from '@/store/codesnapshotStore'
import { type ICodeSnapShort } from '@/types/codesnapshot.model'
import { memo, useCallback, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import renderCode from './shikiRenderer'
import { useAutosizeTextArea } from './useAutosizeTextArea'

const EditorContent = () => {
  const {
    programmingLanguage,
    theme,
    highlightedCode,
    showLineNumbers,
    editorContainer,
    showHeader,
    isFormatCode,
  }: ICodeSnapShort = useSelector(selectCodeSnapShotState)

  console.log('isFormatCode', isFormatCode)

  const [scode, setScode] = useState('')
  const [newCode, setNewCode] = useState('')
  const [lineNumber, setLineNumber] = useState('')

  const { padding, borderRadius, editor } = editorContainer

  const textAreaRef = useRef<HTMLTextAreaElement>(null)
  const editorContent = useRef(null)
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true)

  // Hook to automatically adjust the text area height based on content.
  useAutosizeTextArea(textAreaRef.current, editorContent.current, newCode)

  /**
   * Highlights the code using Shiki renderer and sets the formatted code
   * along with line numbers.
   */
  const highlightCode = useCallback(
    async (code: string) => {
      setLoading(true)
      try {
        const highlighted = await renderCode(code, programmingLanguage, theme)
        if (highlighted) {
          setNewCode(highlighted)
          const { color } = extractEditorColors(highlighted)
          const lineNumberHTML = code
            ?.split('\n')
            .map(
              (_line, index) =>
                `<code key=${index} style="color:${color}">${index + 1}</code>`,
            )
            .join('\n')
          setLineNumber(lineNumberHTML)
        }
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    },
    [programmingLanguage, theme],
  )

  // Effect to highlight code whenever the source code changes.
  useEffect(() => {
    highlightCode(scode)
  }, [scode, highlightCode])

  // Effect to update editor color based on the theme and highlighted code.
  useEffect(() => {
    ;(async () => {
      const highlighted = await renderCode(
        highlightedCode,
        programmingLanguage,
        theme,
      )
      dispatch(setEditorColor(highlighted || ''))
    })()
  }, [theme, highlightedCode, programmingLanguage, dispatch])

  useEffect(() => {
    ;(async () => {
      if (isFormatCode) {
        try {
          const data = await formatCode(scode, 'babel')
          dispatch(toggleFormatCode())
          setScode(data)
        } catch (err) {
          // console.log(err, err.code)
          // toast.error(err.message)
        }
      }
    })()
  }, [isFormatCode, scode,dispatch])

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setScode(e.target.value)
    },
    [],
  )

  const handleKeyUp = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.ctrlKey && event.key === 'v') {
      setScode(event.currentTarget.value)
    }
  }

  const handleBlur = useCallback(() => {
    dispatch(setCode(scode))
    dispatch(setHighlightedCode(newCode))
  }, [scode, newCode, dispatch])

  const renderHeader = () => (
    <div
      className="flex join-item m-auto h-10 w-full items-center justify-between gap-4 px-5"
      style={{ backgroundColor: editor.headerColor }}
    >
      <div className="flex h-full w-full items-center  gap-4">
        <div className="flex items-center gap-2 w-[55px]">
          <div className="h-[13px] w-[13px] rounded-full bg-[#ff5f57]"></div>
          <div className="h-[13px] w-[13px] rounded-full bg-[#febc2e]"></div>
          <div className="h-[13px] w-[13px] rounded-full bg-[#28c840]"></div>
        </div>
        <div className="filename  justify-center"></div>
        <div></div>
      </div>
    </div>
  )

  if (loading) {
    return (
      <div className="flex justify-center flex-col animate-pulse gap-1 ">
        <div className="bg-muted w-64 h-10 rounded-lg  rounded-b-none"></div>
        <div className="bg-muted w-64 h-24 rounded-lg  rounded-t-none"></div>
      </div>
    )
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
        {showHeader && renderHeader()}

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
                __html: lineNumber,
              }}
            />
          )}

          <div className="relative w-full">
            <textarea
              ref={textAreaRef}
              style={{
                fontFamily:
                  'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
                caretColor: editor.color,
              }}
              className="shikitextarea no-scrollbar z-1 rounded-none !min-h-0 overflow-hidden textarea p-0 left-0 top-0 textarea-bordered border-0 outline-0 focus:outline-0 caret-slate-1001 text-transparent leading-relaxed resize-none w-full bg-transparent absolute"
              value={scode}
              rows={1}
              placeholder="Enter Code"
              onChange={handleChange}
              onKeyUp={handleKeyUp}
              onBlur={handleBlur}
            />
            <div
              ref={editorContent}
              style={{
                minWidth: 100,
              }}
              className="overflow-auto text-left rounded-none bg-transparent min-h-7"
              dangerouslySetInnerHTML={{
                __html: newCode,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default memo(EditorContent)
