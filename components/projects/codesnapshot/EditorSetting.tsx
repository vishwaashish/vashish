import { EDITOR_BACK_COLOR } from '@/common/codesnapshot-constant'
import { cn } from '@/components/utils'
import {
  selectCodeSnapShotState,
  setEditorBackground,
  setEditorHeader,
  setEditorPadding,
  setEditorRadius,
  setLineNumber,
} from '@/store/codesnapshotStore'
import { IBackground, ICodeSnapShort } from '@/types/codesnapshot.model'
import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const EditorSetting = () => {
  const {
    lineNumber,
    editorPadding,
    editorBackground,
    editorHeader,
    editorRadius,
  }: ICodeSnapShort = useSelector(selectCodeSnapShotState)
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
  const handleEditorBackgroundChange = useCallback(
    (item: IBackground) => {
      dispatch(setEditorBackground(item))
    },
    [dispatch],
  )

  const backgroundColorOptions = EDITOR_BACK_COLOR.map(option => (
    <li
      className="!m-0 !p-0"
      onClick={() => handleEditorBackgroundChange(option)}
      key={option.label}
    >
      <a className="uppercase">
        {option.label}
        <div
          className="w-6 h-full"
          style={{
            backgroundColor: option.backgroundColor,
            backgroundImage: option.backgroundImage,
          }}
        ></div>
      </a>
    </li>
  ))

  return (
    <div className="border mt-5 rounded-md border-light p-4 flex flex-wrap justify-center items-center gap-5">
      <FormGroup label="Line Number">
        <input
          type="checkbox"
          className="toggle"
          checked={lineNumber}
          onChange={handleThemeChange}
        />
      </FormGroup>
      <FormGroup label="Header">
        <input
          type="checkbox"
          className="toggle"
          checked={editorHeader}
          onChange={handleEditorHeader}
        />
      </FormGroup>

      <FormGroup label="background" className="dropdown dropdown-end">
        <button
          tabIndex={0}
          role="button"
          className="btn py-[0.9px] btn-transparent !pr-[0.9px] !pl-1  !min-h-0 !h-[24px] text-xs"
        >
          {editorBackground.label}
          <div
            className="w-6 h-full"
            style={{
              backgroundColor: editorBackground.backgroundColor,
              backgroundImage: editorBackground.backgroundImage,
            }}
          ></div>
        </button>
        <ul
          tabIndex={0}
          className="dropdown-content z-[10] menu !px-2 shadow bg-base-100 rounded-box"
        >
          {backgroundColorOptions}
        </ul>
      </FormGroup>

      <FormGroup label="Border Radius">
        <input
          className="range range-primary my-auto flex-auto"
          type="range"
          min="0"
          max="30"
          aria-label="Password Length"
          value={editorRadius}
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
          value={editorPadding}
          onChange={handleEditorPaddingChange}
        />
      </FormGroup>
    </div>
  )
}

export default EditorSetting

export const FormGroup = ({
  label,
  className,
  children,
}: {
  label: string
  className?: string
  children: React.ReactNode
}) => {
  const formControl = 'flex flex-col text-left grow sm:grow-0 '
  const buttonGroup = 'btn-group1 join drop-shadow'
  const labelClass = 'text-xs mb-1'
  return (
    <div className={formControl}>
      <label className={labelClass} htmlFor={label}>
        {label}
      </label>

      <div className={cn(buttonGroup, className)}>{children}</div>
    </div>
  )
}
