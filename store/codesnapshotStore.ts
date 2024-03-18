import { EDITOR_BACK_COLOR } from '@/common/codesnapshot-constant'
import { darkenColor } from '@/components/utils'
import {
  IEditorContainer,
  ICodeSnapShort,
  IEditorBackgroundConstant,
} from '@/types/codesnapshot.model'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const initialState: ICodeSnapShort = {
  code: "console.log('Hello, world!')",
  programmingLanguage: 'javascript',
  theme: 'dark-plus',
  highlightedCode: '',
  showLineNumbers: false,
  showSettings: false,
  showHeader: true,
  showInfiniteView: true,
  lineNumberCode: '',
  editorContainer: {
    backgroundColor: EDITOR_BACK_COLOR[0].backgroundColor,
    backgroundImage: EDITOR_BACK_COLOR[0].backgroundImage,
    label: EDITOR_BACK_COLOR[0].label,
    padding: 1,
    borderRadius: 8,
    editor: {
      headerColor: 'rgb(27, 27, 27)',
      backgroundColor: 'rgb(30, 30, 30)',
      color: '#D4D4D4',
    },
  },
}

export const codeSlice = createSlice({
  name: 'code',
  initialState: initialState,

  reducers: {
    setCode: (state, action: PayloadAction<string>) => {
      state.code = action.payload
    },
    setLanguage: (state, action: PayloadAction<string>) => {
      state.programmingLanguage = action.payload
    },
    setThemes: (state, action: PayloadAction<string>) => {
      state.theme = action.payload
    },
    setHighlightedCode: (
      state,
      action: PayloadAction<{ code: string; isLineNumber: boolean }>,
    ) => {
      const { code, isLineNumber } = action.payload
      const colorRegex = /#(?:[0-9a-fA-F]{3}){1,2}/g
      const [bgColor, color] = code.match(colorRegex) || ['#00000', '#fffff']
      const headerColor = darkenColor(bgColor, 8) || bgColor
      state.highlightedCode = code
      state.editorContainer.editor.headerColor = headerColor
      state.editorContainer.editor.backgroundColor = bgColor
      state.editorContainer.editor.color = color

      const count = isLineNumber
        ? code
            .split('\n')
            .map(
              (_i, index) =>
                `<code key=${index} style="color:${color}">${index + 1}</code>`,
            )
            .join('\n')
        : ''

      state.lineNumberCode = count
    },
    setEditorlineNumberCode: (state, action: PayloadAction<string>) => {
      state.lineNumberCode = action.payload
    },
    setLineNumber: (state, action: PayloadAction<boolean>) => {
      state.showLineNumbers = action.payload
    },
    setInfiniteView: (state, action: PayloadAction<boolean>) => {
      state.showInfiniteView = action.payload
    },
    setEditorPadding: (state, action: PayloadAction<number>) => {
      state.editorContainer.padding = action.payload
    },
    setEditorBackground: (
      state,
      action: PayloadAction<IEditorBackgroundConstant>,
    ) => {
      const { label, backgroundColor, backgroundImage } = action.payload
      state.editorContainer.label = label
      state.editorContainer.backgroundColor = backgroundColor
      state.editorContainer.backgroundImage = backgroundImage
    },
    setEditorRadius: (state, action: PayloadAction<number>) => {
      state.editorContainer.borderRadius = action.payload
    },
    setEditorSetting: state => {
      state.showSettings = !state.showSettings
    },
    setEditorHeader: state => {
      state.showHeader = !state.showHeader
    },
  },
})

export const {
  setCode,
  setLanguage,
  setThemes,
  setHighlightedCode,
  setLineNumber,
  setEditorPadding,
  setEditorSetting,
  setEditorBackground,
  setEditorHeader,
  setEditorRadius,
  setEditorlineNumberCode,
  setInfiniteView,
} = codeSlice.actions

export const selectCodeSnapShotState = (state: { codesnap: ICodeSnapShort }) =>
  state.codesnap

export default codeSlice.reducer
