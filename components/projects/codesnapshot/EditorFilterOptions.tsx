import { formatCode } from '@/components/utils'
import {
  selectCodeSnapShotState,
  setCode,
  setEditorSetting,
  setInfiniteView,
  setLanguage,
  setThemes,
} from '@/store/codesnapshotStore'
import { type ICodeSnapShort } from '@/types/codesnapshot.model'
import { motion } from 'framer-motion'
import type React from 'react'
import { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BundledLanguage, bundledLanguages, BundledTheme, bundledThemes } from 'shiki/bundle/web'
import ExportOptions from './ExportOptions'

const EditorFilterOptions = () => {
  const { code, programmingLanguage, theme }: ICodeSnapShort = useSelector(
    selectCodeSnapShotState,
  )

  const dispatch = useDispatch()

  const handleInfiniteViewerChange = useCallback(
    (show: boolean) => {
      dispatch(setInfiniteView(show))
    },
    [dispatch],
  )
  useEffect(() => {
    if (window.matchMedia('(max-width: 600px)').matches) {
      handleInfiniteViewerChange(false)
    }
  }, [handleInfiniteViewerChange])

  const handleLanguageChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      dispatch(setLanguage(e.target.value as BundledLanguage))
    },
    [dispatch],
  )

  const handleThemeChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      dispatch(setThemes(e.target.value as BundledTheme))
    },
    [dispatch],
  )
  const handleEditorSettingChange = useCallback(() => {
    dispatch(setEditorSetting())
  }, [dispatch])

  const onformatCode = useCallback(async () => {
    try {
      const data = await formatCode(code, 'babel')
      dispatch(setCode(data))
    } catch (e) {
      console.log(e)
    }
  }, [code, dispatch])

  const selectClass =
    'select select-sm sm:select-md select-bordered w-full max-w-xs'

  const btnClass = 'input input-sm sm:input-md !border-solid border-light '
  return (
    <>
      <motion.div className="max-w-2xl gap-3 mx-auto flex flex-wrap justify-center items-center">
        <div
          className="tooltip"
          data-tip="Select Language"
          style={{ flex: '1 1 120px' }}
        >
          <select
            className={selectClass}
            value={programmingLanguage}
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
        </div>
        <div
          className="tooltip"
          data-tip="Select Theme"
          style={{ flex: '1 1 120px' }}
        >
          <select
            style={{ flex: '1 1 120px' }}
            className={selectClass}
            value={theme}
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
        </div>

        <div className="tooltip" data-tip="Setting">
          <button className={btnClass} onClick={handleEditorSettingChange}>
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
        </div>
        <div className="tooltip" data-tip="Format Code">
          <button className={btnClass} onClick={onformatCode}>
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
                d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5"
              />
            </svg>
          </button>
        </div>
        <ExportOptions />
      </motion.div>
    </>
  )
}

export default EditorFilterOptions
