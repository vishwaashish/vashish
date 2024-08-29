import { configureStore } from '@reduxjs/toolkit'
import type { TypedUseSelectorHook } from 'react-redux'
import { useDispatch, useSelector } from 'react-redux'
import calculatorReducer from './calculator'
import codesnapshotStore from './codesnapshotStore'
import cssLoaders from './cssLoaders'

export const store = configureStore({
  reducer: {
    calculator: calculatorReducer,
    codesnap: codesnapshotStore,
    loader: cssLoaders,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
