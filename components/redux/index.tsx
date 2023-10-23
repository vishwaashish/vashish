'use client'
import { store } from '@/store'
import React, { FC } from 'react'
import { Provider } from 'react-redux'

interface IReduxProvider {
  children: React.ReactNode
}
const ReduxProvider: FC<IReduxProvider> = ({ children }) => {
  return <Provider store={store}>{children}</Provider>
}

export default ReduxProvider
