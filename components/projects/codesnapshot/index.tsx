'use client'
import { HeadPara } from '@/components/shared/Heading'
import {
  selectCodeSnapShotState,
  setCode,
  setEditorSetting,
  setHighlightedCode,
  setLanguage,
  setThemes,
} from '@/store/codesnapshotStore'
import { ICodeSnapShort } from '@/types/codesnapshot.model'
import { Suspense, useCallback, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { bundledLanguages, bundledThemes } from 'shiki/bundle/web'
import ExportOptions from './ExportOptions'
import renderCode from './shikiRenderer'
import InfiniteViewer from 'react-infinite-viewer'
// import EditorSetting from './EditorSetting'
import dynamic from 'next/dynamic'
const EditorSetting = dynamic(() => import('./EditorSetting'))
function CodeSnapShot() {
  const {
    code,
    language,
    themes,
    highlightedCode,
    lineNumber,
    editorPadding,
    editorSetting,
    editorBackground,
    editorHeader,
    editorRadius,
  }: ICodeSnapShort = useSelector(selectCodeSnapShotState)
  const [textarea, setTextArea] = useState([-1, -1])

  const dispatch = useDispatch()
  const editorRef = useRef<HTMLDivElement>(null)

  const memoizedHighlightCode = useCallback(async () => {
    try {
      const highlighted = await renderCode(
        code,
        language,
        themes,
        lineNumber,
        editorHeader,
      )
      highlighted && dispatch(setHighlightedCode(highlighted))

      // const targetDivElement = document.querySelector(
      //   '.shikitextarea',
      // ) as HTMLElement
      // if (targetDivElement && divElement) {
      //   console.log(divElement, divElement.clientHeight, targetDivElement)
      //   targetDivElement.style.height = divElement?.clientHeight + 50 + 'px'
      // }
    } catch (e) {
      console.error(e)
    }
  }, [code, language, themes, lineNumber, editorHeader, dispatch])

  useEffect(() => {
    memoizedHighlightCode()
  }, [memoizedHighlightCode])

  useEffect(() => {
    const divElement = document.querySelector('.shikicontainer')
    console.log(divElement)
    divElement &&
      setTextArea([divElement.clientHeight + 100, divElement.clientWidth])
  }, [code])

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      dispatch(setCode(e.target.value))
    },
    [dispatch],
  )

  const handleLanguageChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      dispatch(setLanguage(e.target.value))
    },
    [dispatch],
  )

  const handleThemeChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      dispatch(setThemes(e.target.value))
    },
    [dispatch],
  )
  const handleEditorSettingChange = useCallback(() => {
    dispatch(setEditorSetting())
  }, [dispatch])

  return (
    <HeadPara
      title="Code Snapshot"
      className="prose lg:prose-md  prose-h1:leading-none  prose-h1:mb-0  text-center max-w-full"
    >
      <p>
        Enhance User Experience and Aesthetics with Our Range of Creative CSS
        Loaders for Seamless Loading Animations
      </p>
      <p>
        📌 To bookmark this page, simply press <kbd className="kbd">Ctrl+D</kbd>
        .
      </p>

      <div className="max-w-lg gap-3 mx-auto flex flex-wrap justify-center items-center">
        <select
          style={{ flex: '1 1 120px' }}
          className="select select-bordered w-full max-w-xs"
          value={language}
          onChange={handleLanguageChange}
        >
          {Object.keys(bundledLanguages).map(lang => {
            return (
              <option key={lang} value={lang}>
                {lang}
              </option>
            )
          })}
        </select>
        <select
          style={{ flex: '1 1 120px' }}
          className="select select-bordered w-full max-w-xs bg-light"
          value={themes}
          onChange={handleThemeChange}
        >
          {Object.keys(bundledThemes).map(theme => {
            return (
              <option key={theme} value={theme}>
                {theme}
              </option>
            )
          })}
        </select>

        <button
          className="btn !border-solid border-light "
          onClick={handleEditorSettingChange}
        >
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
              d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
          </svg>
        </button>

        <ExportOptions element={editorRef.current} />
      </div>

      {editorSetting && <EditorSetting />}

      <br />

      <div className="grid grid-cols-1 gap-4 relative font-sans not-prose text-sm ">
        <textarea
          style={{
            fontFamily:
              'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
            height: textarea[0] == -1 ? '100%' : textarea[0] + 'px',
            // width: textarea[1] == -1 ? '100%' : textarea[1] + 'px',
            // left: lineNumber ? '20px' : '3px',
            // top: editorHeader ? '44px' : '4px',
          }}
          className="shikitextarea overflow-hidden w-full textarea textarea-bordered 1border-0 1outline-0 focus:outline-0 caret-slate-100 text-transparent1 leading-relaxed resize-none   bg-transparent 1absolute "
          value={code}
          placeholder="Enter Code"
          onChange={handleChange}
        ></textarea>
        <div className="flex justify-center items-center">
          <InfiniteViewer
            className="viewer w-full h-[50vh]"
            threshold={200}
            rangeX={[-5000, 5000]}
            rangeY={[-5000, 5000]}
            onScroll={e => {
              console.log(e)
            }}
            displayHorizontalScroll={true}
            displayVerticalScroll={true}
          >
            <div className="viewport">
              <div ref={editorRef} className="">
                <Suspense fallback={<>Loading...</>}>
                  <div
                    className="relative w-min"
                    style={{
                      padding: editorPadding + 'rem',
                      backgroundColor: editorBackground.backgroundColor,
                      backgroundImage: editorBackground.backgroundImage,
                    }}
                  >
                    <div className="relative">
                      {/* <textarea
                  style={{
                    fontFamily:
                      'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
                    height: textarea[0] == -1 ? '100%' : textarea[0] + 'px',
                    width: textarea[1] == -1 ? '100%' : textarea[1] + 'px',
                    left: lineNumber ? '20px' : '3px',
                    top: editorHeader ? '44px' : '4px',
                  }}
                  className="shikitextarea overflow-hidden textarea textarea-bordered 1border-0 1outline-0 focus:outline-0 caret-slate-100 text-transparent1 leading-relaxed resize-none  w-full bg-transparent absolute "
                  value={code}
                  placeholder="Enter Code"
                  onChange={handleChange}
                ></textarea> */}
                      <div
                        className=" overflow-auto bg-transparent "
                        style={{
                          borderRadius: editorRadius + 'px',
                        }}
                        dangerouslySetInnerHTML={{ __html: highlightedCode }}
                      />
                    </div>
                  </div>
                </Suspense>
              </div>
            </div>
          </InfiniteViewer>
        </div>
      </div>
    </HeadPara>
  )
}

export default CodeSnapShot
