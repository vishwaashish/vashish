import { EDITOR_BACK_COLOR } from '@/common/codesnapshot-constant'
import { FormGroup } from '@/components/shared/Form'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import {
  selectCodeSnapShotState,
  setEditorBackground,
  setEditorHeader,
  setEditorPadding,
  setEditorRadius,
  setInfiniteView,
  setLanguage,
  setLineNumber,
  setThemes,
  toggleFormatCode,
} from '@/store/codesnapshotStore'
import {
  IEditorBackgroundConstant,
  type ICodeSnapShort,
} from '@/types/codesnapshot.model'
import { SelectProps } from '@radix-ui/react-select'
import { motion } from 'framer-motion'
import type React from 'react'
import { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  BundledLanguage,
  bundledLanguages,
  BundledTheme,
  bundledThemes,
} from 'shiki/bundle/web'
import ExportOptions from './ExportOptions'

const EditorFilterOptions = () => {
  const {
    showLineNumbers,
    showHeader,
    showInfiniteView,
    programmingLanguage,
    theme,
    editorContainer,
  }: ICodeSnapShort = useSelector(selectCodeSnapShotState)

  const dispatch = useDispatch()

  const { padding, borderRadius } = editorContainer

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
    (lang: string) => {
      dispatch(setLanguage(lang as BundledLanguage))
    },
    [dispatch],
  )

  const handleThemeChange = useCallback(
    (theme: string) => {
      dispatch(setThemes(theme as BundledTheme))
    },
    [dispatch],
  )

  const handleEditorBackgroundChange = useCallback(
    (item: IEditorBackgroundConstant) => {
      dispatch(setEditorBackground(item))
    },
    [dispatch],
  )

  const onformatCode = useCallback(async () => {
    // try {
    // const data = await formatCode(code, 'babel')
    dispatch(toggleFormatCode())
    // } catch (e) {
    //   console.log(e)
    // }
  }, [dispatch])

  const handleLineChange = useCallback(
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

  return (
    <>
      <motion.div className="sticky top-5 lg:max-w-2xl gap-3 mx-auto rounded-lg flex flex-wrap justify-start items-center border-border bg-card p-5">
        <div className="flex justify-between items-center flex-[1_1_auto] grow w-full">
          <p className="text-lg !m-0 !p-0  ">Customize setting</p>
          <FormGroup
            label="Viewer"
            className="flex-row items-center gap-2 grow-0"
            labelClassName="mb-0"
          >
            <Switch
              id="Infinite Viewer"
              checked={showInfiniteView}
              onCheckedChange={handleInfiniteViewerChange}
            />
          </FormGroup>
        </div>
        <FormGroup
          label="Export"
          className="flex-[1_1_150px] lg:flex-[1_1_170px]"
        >
          <ExportOptions />
        </FormGroup>

        <FormGroup label="Format">
          <Button
            variant="ghost"
            size="icon"
            className="bg-background border border-input"
            onClick={onformatCode}
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
                d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5"
              />
            </svg>
          </Button>
        </FormGroup>

        <FormGroup
          label="Select Language"
          className="flex-[1_1_150px] lg:flex-[1_1_400px]"
        >
          <SelectField
            options={Object.keys(bundledLanguages)}
            onValueChange={handleLanguageChange}
            defaultValue={programmingLanguage}
          />
        </FormGroup>

        <FormGroup
          label="Select Theme"
          className="flex-[1_1_150px] lg:flex-[1_1_400px]"
        >
          <SelectField
            options={Object.keys(bundledThemes)}
            onValueChange={handleThemeChange}
            defaultValue={theme}
          />
        </FormGroup>

        <FormGroup
          label="Select Background"
          className="flex-[1_1_150px] lg:flex-[1_1_400px]"
        >
          <Select
            defaultValue={editorContainer.label}
            onValueChange={(val: string) => {
              handleEditorBackgroundChange(
                EDITOR_BACK_COLOR.find(color => color.label === val) ||
                  editorContainer,
              )
            }}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={'Select'} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {EDITOR_BACK_COLOR.map(lang => {
                  return (
                    <SelectItem key={lang.label} value={lang.label}>
                      <div className="flex items-center gap-2">
                        <div
                          onClick={() => {
                            handleEditorBackgroundChange(lang)
                          }}
                          key={lang.label}
                          className="w-10 h-6 shadow-md border-border border rounded-lg"
                          style={{
                            backgroundColor: lang.backgroundColor,
                            backgroundImage: lang.backgroundImage,
                          }}
                        ></div>
                        <div>{lang.label}</div>
                      </div>
                    </SelectItem>
                  )
                })}
              </SelectGroup>
            </SelectContent>
          </Select>
        </FormGroup>
        {/* <div className="tooltip" data-tip="Setting">
          <Button
            variant="ghost"
            size="icon"
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
          </Button>
        </div> */}
        {/* <div className="tooltip" data-tip="Format Code">
          <Button variant="ghost" size="icon" onClick={onformatCode}>
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
          </Button>
        </div> */}
        {/* <div className="flex flex-wrap gap-2 justify-between"> */}

        <FormGroup label="Line Number">
          <Switch
            id="Line Number"
            checked={showLineNumbers}
            onCheckedChange={handleLineChange}
          />
        </FormGroup>
        <FormGroup label="Header">
          <Switch
            id="Header"
            checked={showHeader}
            onCheckedChange={handleEditorHeader}
          />
        </FormGroup>
        {/* </div> */}
        <FormGroup
          label="Border Radius"
          className="flex-[1_1_150px] lg:flex-[1_1_400px]"
        >
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
        <FormGroup
          label="Padding"
          className="flex-[1_1_150px] lg:flex-[1_1_400px]"
        >
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
    </>
  )
}

interface SelectFieldProps extends SelectProps {
  options: string[]
  placeholder?: string
}
function SelectField({
  options,
  placeholder = 'Select',
  ...rest
}: SelectFieldProps) {
  return (
    <Select {...rest}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {/* <SelectLabel>Fruits</SelectLabel> */}
          {options.map(lang => {
            return (
              <SelectItem key={lang} value={lang}>
                {lang}
              </SelectItem>
            )
          })}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

export default EditorFilterOptions
