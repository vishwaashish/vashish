import { DispatchButton } from "./common.model"

export type IOperation = "-" | "+" | "*" | "÷" | "%" | null




export interface IInitialStateDefault extends IInitialState {
  overwrite: boolean
  history: IHistory[]
}

export interface IHistory {
  first: number
  second: number
  operation: IOperation
  total: number
}

export interface IInitialState {
  current: string | null
  previous: string | null
  operation: IOperation 
}


export interface INumberButton extends DispatchButton {
  digit: string
}
export interface IOperationButton extends DispatchButton {
  operation: IOperation
}
