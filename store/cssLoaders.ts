import { DEFAULT_SETTINGS } from '@/common/loaders-constants'
import { ILoaderParams } from '@/types/css-loaders.model'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState: ILoaderParams = {
  ...DEFAULT_SETTINGS,
  //   size: '',
  //   speed: '',
  //   border: '',
  //   primaryColor: '',
  //   secondaryColor: '',
  //   sourceCode: '',
}

const cssLoaders = createSlice({
  name: 'state',
  initialState,
  reducers: {
    setLoader: (state, action: PayloadAction<Partial<ILoaderParams>>) => {
      return { ...state, ...action.payload }
    },
    // setSize: (state, action: PayloadAction<string>) => {
    //   state.size = action.payload
    // },
    // setSpeed: (state, action: PayloadAction<string>) => {
    //   state.speed = action.payload
    // },
    // setBorder: (state, action: PayloadAction<string>) => {
    //   state.border = action.payload
    // },
    // setPrimaryColor: (state, action: PayloadAction<string>) => {
    //   state.primaryColor = action.payload
    // },
    // setSecondaryColor: (state, action: PayloadAction<string>) => {
    //   state.secondaryColor = action.payload
    // },
    // setSourceCode: (state, action: PayloadAction<string>) => {
    //   state.sourceCode = action.payload
    // },
    // Add any other reducers as needed
  },
})

export const {
  //   setSize,
  //   setSpeed,
  //   setBorder,
  //   setPrimaryColor,
  //   setSecondaryColor,
  //   setSourceCode,
  setLoader,
} = cssLoaders.actions

export const selectLoaderState = (state: { loader: ILoaderParams }) =>
  state.loader

export default cssLoaders.reducer
