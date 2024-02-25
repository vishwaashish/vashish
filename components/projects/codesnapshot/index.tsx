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
import { Suspense, useCallback, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { bundledLanguages, bundledThemes } from 'shiki/bundle/web'
import ExportOptions from './ExportOptions'
import renderCode from './shikiRenderer'
import { InputSizeType } from '@/types/css-loaders.model'
import { cn } from '@/components/utils'

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
  }: ICodeSnapShort = useSelector(selectCodeSnapShotState)
  const dispatch = useDispatch()
  const editorRef = useRef<HTMLDivElement>(null)

  const memoizedHighlightCode = useCallback(async () => {
    try {
      const highlighted = await renderCode(code, language, themes, lineNumber)
      highlighted && dispatch(setHighlightedCode(highlighted))
    } catch (e) {
      console.error(e)
    }
  }, [code, language, themes, lineNumber, dispatch])

  useEffect(() => {
    memoizedHighlightCode()
  }, [memoizedHighlightCode])

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

      <textarea
        className="textarea textarea-bordered w-full  bg-transparent"
        value={code}
        placeholder="Enter Code"
        rows={5}
        onChange={handleChange}
      ></textarea>

      <div ref={editorRef} className="not-prose">
        <Suspense fallback={<>Loading...</>}>
          <div
            className={` bg-red-500`}
            style={{ padding: editorPadding + 'rem' }}
          >
            <div
              className="flex-grow overflow-auto bg-transparent rounded-lg text-sm"
              dangerouslySetInnerHTML={{ __html: highlightedCode }}
            />
          </div>
        </Suspense>
      </div>
    </HeadPara>
  )
}

export default CodeSnapShot

const ButtonSize = ({
  onClick,
  label,
  active,
  title,
  size = 'btn-md',
}: {
  active: boolean
  onClick: () => void
  label: string
  title: string
  size: InputSizeType
}) => {
  return (
    <div className="grow tooltip" data-tip={title}>
      <button
        className={cn(
          active && 'btn-active btn-primary text-white',
          'no-animation active:focus:scale-95 btn join-item aspect-square w-full ',
          size,
        )}
        onClick={onClick}
        role="button"
        aria-label={label}
      >
        {label}
      </button>
    </div>
  )
}
