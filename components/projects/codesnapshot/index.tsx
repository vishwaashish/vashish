'use client'
import { HeadPara } from '@/components/shared/Heading'
import {
  selectCodeSnapShotState,
  setEditorSetting,
  setLanguage,
  setThemes,
} from '@/store/codesnapshotStore'
import { ICodeSnapShort } from '@/types/codesnapshot.model'
import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { bundledLanguages, bundledThemes } from 'shiki/bundle/web'
import ExportOptions from './ExportOptions'
import dynamic from 'next/dynamic'
import { AnimatePresence } from 'framer-motion'
import EditorContainer from './EditorContainer'
import { motion } from 'framer-motion'
import { transition } from '@/components/utils/animation'
const EditorSetting = dynamic(() => import('./EditorSetting'))
function CodeSnapShot() {
  const { programmingLanguage, theme, showSettings }: ICodeSnapShort =
    useSelector(selectCodeSnapShotState)

  const dispatch = useDispatch()

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
      className="prose lg:prose-md  prose-h1:leading-none  prose-h1:mb-0  text-center max-w-full min-h-[75vh]"
      titleDelay={0.1}
    >
      <motion.p {...transition(0.2)}>
      CodeSnapshot offers seamless customization for your code snippets. Easily adjust styling elements such as padding, font size, and color to suit your preferences. Export your customized code as high-quality images in JPG, PNG, and other formats. Perfect for showcasing your code in presentations, documentation, and social media posts.
      </motion.p>
      <motion.p {...transition(0.3)}>
        📌 To bookmark this page, simply press <kbd className="kbd">Ctrl+D</kbd>
        .
      </motion.p>

      <motion.div
        {...transition(0.35)}
        className="max-w-lg gap-3 mx-auto flex flex-wrap justify-center items-center"
      >
        <select
          style={{ flex: '1 1 120px' }}
          className="select select-bordered w-full max-w-xs"
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
        <select
          style={{ flex: '1 1 120px' }}
          className="select select-bordered w-full max-w-xs bg-light"
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

        <ExportOptions />
      </motion.div>

      <AnimatePresence mode="wait">
        {showSettings && <EditorSetting />}
      </AnimatePresence>
      <br />

      <motion.div {...transition(0.4)}>
        <EditorContainer />
      </motion.div>
    </HeadPara>
  )
}

export default CodeSnapShot
