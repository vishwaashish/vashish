import { EDITOR_BACK_COLOR } from '@/common/codesnapshot-constant'
import { FormGroup } from '@/components/shared/Form'
import { transition } from '@/components/utils/animation'
import {
  selectCodeSnapShotState,
  setEditorBackground,
  setEditorHeader,
  setEditorPadding,
  setEditorRadius,
  setInfiniteView,
  setLineNumber,
} from '@/store/codesnapshotStore'
import {
  ICodeSnapShort,
  IEditorBackgroundConstant,
} from '@/types/codesnapshot.model'
import { AnimatePresence, motion } from 'framer-motion'
import React, { useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
const EditorSetting = () => {
  const {
    showLineNumbers,
    showInfiniteView,
    editorContainer,
    showHeader,
  }: ICodeSnapShort = useSelector(selectCodeSnapShotState)

  const { padding, borderRadius } = editorContainer
  const [showBg, setShowBg] = useState(false)
  const dispatch = useDispatch()

  const handleThemeChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(setLineNumber(e.target.checked))
    },
    [dispatch],
  )
  const handleEditorPaddingChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(setEditorPadding(+e.target.value))
    },
    [dispatch],
  )
  const handleEditorRadiusChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(setEditorRadius(+e.target.value))
    },
    [dispatch],
  )
  const handleEditorHeader = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(setEditorHeader())
    },
    [dispatch],
  )
  const handleInfiniteViewerChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(setInfiniteView(e.target.checked))
    },
    [dispatch],
  )
  const handleEditorBackgroundChange = useCallback(
    (item: IEditorBackgroundConstant) => {
      dispatch(setEditorBackground(item))
    },
    [dispatch],
  )

  const backgroundColorOptions = EDITOR_BACK_COLOR.map(option => (
    <li
      className="!m-0 !p-0 w-min"
      onClick={() => handleEditorBackgroundChange(option)}
      key={option.label}
    >
      <div
        title={option.label}
        className="w-8 h-8 shadow-md shadow-slate-700"
        style={{
          backgroundColor: option.backgroundColor,
          backgroundImage: option.backgroundImage,
        }}
      ></div>
    </li>
  ))

  const boxVariant = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  }

  return (
    <motion.div
      key="box"
      variants={boxVariant}
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
      <motion.div
        className="border  z-[1] mt-5 rounded-md border-light p-4 flex flex-wrap justify-center items-center gap-5"
        {...transition(0)}
      >
        <FormGroup label="Infinite Viewer">
          <input
            type="checkbox"
            className="toggle"
            checked={showInfiniteView}
            onChange={handleInfiniteViewerChange}
          />
        </FormGroup>
        <FormGroup label="Line Number">
          <input
            type="checkbox"
            className="toggle"
            checked={showLineNumbers}
            onChange={handleThemeChange}
          />
        </FormGroup>

        <FormGroup label="Header">
          <input
            type="checkbox"
            className="toggle"
            checked={showHeader}
            onChange={handleEditorHeader}
          />
        </FormGroup>

        <FormGroup label="Border Radius">
          <input
            className="range range-primary my-auto flex-auto"
            type="range"
            min="0"
            max="30"
            aria-label="Password Length"
            value={borderRadius}
            onChange={handleEditorRadiusChange}
          />
        </FormGroup>
        <FormGroup label="Padding">
          <input
            className="range range-primary my-auto flex-auto"
            type="range"
            min="0"
            max="7"
            step="1"
            aria-label="Password Length"
            value={padding}
            onChange={handleEditorPaddingChange}
          />
        </FormGroup>

        <FormGroup
          label="Background"
          // className="dropdown md:dropdown-end dropdown-bottom"
        >
          <button
            onClick={() => setShowBg(val => !val)}
            role="button"
            className="input py-[0.9px]  !pr-[0.9px] !pl-1  !min-h-0 !h-[24px] justify-end text-xs min-w-[134px] flex  gap-2 items-center"
          >
            {editorContainer.label || 'Default'}
            <div
              className="w-6 h-full border-2"
              style={{
                backgroundColor: editorContainer.backgroundColor,
                backgroundImage: editorContainer.backgroundImage,
              }}
            ></div>
          </button>
          {/* <ul
          tabIndex={0}
          className="dropdown-content z-[10] menu !px-2 shadow bg-base-100 rounded-box flex flex-row flex-wrap sm:min-w-[300px] gap-2 justify-center"
        >
          {backgroundColorOptions}
        </ul> */}
        </FormGroup>

        <AnimatePresence mode="wait">
          {showBg && (
            <motion.div>
              <ul className="menu !m-0 !px-0  flex flex-row flex-wrap  gap-2 justify-center">
                {backgroundColorOptions}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  )
}

export default EditorSetting
