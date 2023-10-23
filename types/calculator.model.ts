export type IOperation = '-' | '+' | '*' | '÷' | '%'

export interface IInitialStateDefault extends IInitialState {
  overwrite: boolean
  history: IHistory[]
}

export interface IHistory {
  first: number
  second: number
  operation: IOperation | string 
  total: number
}

export interface IInitialState {
  current: string | null
  previous: string | null
  operation: IOperation | string | null
}
