// reducers/codeSlice.ts
import { ICodeSnapShort } from '@/types/codesnapshot.model'
import { createSlice, PayloadAction, ThunkAction } from '@reduxjs/toolkit'
import { RootState } from '.'
import renderCode from '@/components/projects/codesnapshot/shikiRenderer'

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

    setHighlightedCode: (state, action: PayloadAction<string>) => {
      state.highlightedCode = action.payload
    },
    setLineNumber: (state, action: PayloadAction<boolean>) => {
      state.lineNumber = action.payload
    },
    setEditorPadding: (state, action: PayloadAction<number>) => {
      state.editorPadding = action.payload
    },
    setEditorSetting: state => {
      state.editorSetting = !state.editorSetting
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
