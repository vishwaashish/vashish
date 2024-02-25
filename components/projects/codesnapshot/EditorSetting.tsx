import {
  selectCodeSnapShotState,
  setEditorPadding,
  setLineNumber,
} from '@/store/codesnapshotStore'
import { ICodeSnapShort } from '@/types/codesnapshot.model'
import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const EditorSetting = () => {
  const { lineNumber, editorPadding }: ICodeSnapShort = useSelector(
    selectCodeSnapShotState,
  )
  const dispatch = useDispatch()

  const handleThemeChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(setLineNumber(e.target.checked))
    },
    [dispatch],
  )
  const handleEditorPaddingChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      console.log(e.target)
      dispatch(setEditorPadding(+e.target.value))
    },
    [dispatch],
  )

  const formControl = 'flex flex-col text-left grow sm:grow-0 '
  const buttonGroup = 'btn-group1 join drop-shadow'
  const label = 'text-xs mb-1'
  return (
    <div className="border mt-5 rounded-md border-light p-4 flex flex-wrap justify-center items-center gap-5">
      <div className={formControl}>
        <label className={label} htmlFor="border-size">
          Line Number
        </label>

        <div className={buttonGroup}>
          <input
            type="checkbox"
            className="toggle"
            checked={lineNumber}
            onChange={handleThemeChange}
          />
        </div>
      </div>
      <div className={formControl}>
        <label className={label} htmlFor="border-size">
          Padding
        </label>

        <div className={buttonGroup}>
          <input
            className="range range-primary my-auto flex-auto"
            type="range"
            min="0"
            max="7"
            step="1"
            aria-label="Password Length"
            value={editorPadding}
            onChange={handleEditorPaddingChange}
          />
        </div>
      </div>
    </div>
  )
}

export default EditorSetting
