import { FormGroup } from '@/components/shared/Form'
import { Switch } from '@/components/ui/switch'
import { transition } from '@/components/utils/animation'
import {
  selectCodeSnapShotState,
  setEditorHeader,
  setEditorPadding,
  setEditorRadius,
  setInfiniteView,
  setLineNumber
} from '@/store/codesnapshotStore'
import {
  type ICodeSnapShort
} from '@/types/codesnapshot.model'
import { motion } from 'framer-motion'
import type React from 'react'
import { useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
const EditorSetting = () => {
  const {
    showLineNumbers,
    showInfiniteView,
    editorContainer,
    showHeader,
    showSettings,
  }: ICodeSnapShort = useSelector(selectCodeSnapShotState)

  const { padding, borderRadius } = editorContainer
  const [showBg, setShowBg] = useState(false)
  const dispatch = useDispatch()

  const handleThemeChange = useCallback(
    (theme: boolean) => {
      dispatch(setLineNumber(theme))
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
  const handleEditorHeader = useCallback(() => {
    dispatch(setEditorHeader())
  }, [dispatch])

  const handleInfiniteViewerChange = useCallback(
    (change: boolean) => {
      dispatch(setInfiniteView(change))
    },
    [dispatch],
  )

  // const handleEditorBackgroundChange = useCallback(
  //   (item: IEditorBackgroundConstant) => {
  //     dispatch(setEditorBackground(item))
  //   },
  //   [dispatch],
  // )

  // const backgroundColorOptions = EDITOR_BACK_COLOR.map(option => (
  //   // <li
  //   //   className="!m-0 !p-0 w-min"
  //   //   onClick={() => {
  //   //     handleEditorBackgroundChange(option)
  //   //   }}
  //   //   key={option.label}
  //   // >
  //   <Tooltip title={option.label}>
  //     <Button
  //       size="icon"
  //       onClick={() => {
  //         handleEditorBackgroundChange(option)
  //       }}
  //       key={option.label}
  //       className="w-8 h-8 shadow-md border-border border rounded-lg"
  //       style={{
  //         backgroundColor: option.backgroundColor,
  //         backgroundImage: option.backgroundImage,
  //       }}
  //     ></Button>
  //   </Tooltip>
  // ))

  const boxVariant = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  }

  if (!showSettings) {
    return <></>
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
        className="border bg-card w-fit mx-auto  z-[1]  rounded-lg border-border p-4 flex flex-wrap justify-center items-center gap-5"
        {...transition(0)}
      >
        <FormGroup label="Infinite Viewer">
          <Switch
            id="Infinite Viewer"
            checked={showInfiniteView}
            onCheckedChange={handleInfiniteViewerChange}
          />
        </FormGroup>
        <FormGroup label="Line Number">
          <Switch
            id="Line Number"
            checked={showLineNumbers}
            onCheckedChange={handleThemeChange}
          />
        </FormGroup>

        <FormGroup label="Header">
          <Switch
            id="Header"
            checked={showHeader}
            onCheckedChange={handleEditorHeader}
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
      </motion.div>
    </motion.div>
  )
}

export default EditorSetting
