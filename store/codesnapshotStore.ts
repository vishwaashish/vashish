// reducers/codeSlice.ts
import { EDITOR_BACK_COLOR } from '@/common/codesnapshot-constant'
import { darkenColor } from '@/components/utils'
import { IBackground, ICodeSnapShort } from '@/types/codesnapshot.model'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export const codeSlice = createSlice({
  name: 'code',
  initialState: {
    code: "console.log('Hello, world!')",
    language: 'javascript',
    themes: 'dark-plus',
    highlightedCode: '',
    lineNumber: false,
    editorPadding: 1,
    editorSetting: false,
    editorBackground: EDITOR_BACK_COLOR[0],
    editorHeader: true,
    editorRadius: 8,
    editorlineNumberCode: '',
    editorStyle: {
      headerColor: 'transparent',
      backgroundColor: 'transparent',
      height: 47,
      width: 0,
    },
  } as ICodeSnapShort,

  reducers: {
    setCode: (state, action: PayloadAction<string>) => {
      state.code = action.payload
    },
    setLanguage: (state, action: PayloadAction<string>) => {
      state.language = action.payload
    },
    setThemes: (state, action: PayloadAction<string>) => {
      state.themes = action.payload
    },
    setHighlightedCode: (
      state,
      action: PayloadAction<{ code: string; isLineNumber: boolean }>,
    ) => {
      const code = action.payload.code
      const isLineNumber = action.payload.isLineNumber

      const bgColorRegex =
        /background-color:\s*(#[a-fA-F0-9]{6}|#[a-fA-F0-9]{3}|[a-zA-Z]+)/
      const bgColorMatch = code.match(bgColorRegex)
      const bgColor = bgColorMatch ? bgColorMatch[1] : 'transparent'
      const headerColor = darkenColor(bgColor, 8) || bgColor

      state.highlightedCode = code
      state.editorStyle.headerColor = headerColor
      state.editorStyle.backgroundColor = bgColor
      var count: string = ''

      if (isLineNumber) {
        count = code
          .split('\n')
          .map((_i, index) => `<span key={index}>${index + 1}</span>`)
          .join('\n')
      }

      state.editorlineNumberCode = count
    },
    setEditorlineNumberCode: (state, action: PayloadAction<string>) => {
      state.editorlineNumberCode = action.payload
    },
    setLineNumber: (state, action: PayloadAction<boolean>) => {
      state.lineNumber = action.payload
    },
    setEditorPadding: (state, action: PayloadAction<number>) => {
      state.editorPadding = action.payload
    },
    setEditorBackground: (state, action: PayloadAction<IBackground>) => {
      state.editorBackground = action.payload
    },
    setEditorRadius: (state, action: PayloadAction<number>) => {
      state.editorRadius = action.payload
    },
    setEditorSetting: state => {
      state.editorSetting = !state.editorSetting
    },
    setEditorHeader: state => {
      state.editorHeader = !state.editorHeader
    },
    setEditorStyleWidthHeight: (
      state,
      action: PayloadAction<{ width: number; height: number }>,
    ) => {
      state.editorStyle.height = action.payload.height
      state.editorStyle.width = action.payload.width
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
  setEditorStyleWidthHeight,
} = codeSlice.actions

export const selectCodeSnapShotState = (state: { codesnap: ICodeSnapShort }) =>
  state.codesnap

export default codeSlice.reducer

// export const highlightCodeAsync =
//   (): ThunkAction<void, RootState, unknown, any> =>
//   async (dispatch, getState) => {
//     const { code, language, themes } = selectCodeSnapShotState(getState())
//     try {
//       const highlighted = await renderCode(code, language, themes)
//       dispatch(setHighlightedCode(highlighted))
//     } catch (e) {
//       console.error(e)
//     }
//   }
