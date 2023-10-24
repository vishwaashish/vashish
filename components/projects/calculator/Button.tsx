import { cn } from '@/components/utils'
import { AppDispatch } from '@/store'
import { addDigit, chooseOperation } from '@/store/calculator'
import { IOperation } from '@/types/calculator.model'
import { ButtonHTMLAttributes } from 'react'

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string
  dispatch: AppDispatch
}

interface INumberButton extends IButton {
  digit: string
}
interface IOperationButton extends IButton {
  operation: IOperation
}

const btn = 'btn glass text-lg h-full drop-shadow w-full '

export const NumberButton = ({
  digit,
  dispatch,
  className = '',
}: INumberButton) => {
  return (
    <button
      className={cn(btn, className)}
      onClick={() => dispatch(addDigit(digit))}
    >
      {digit}
    </button>
  )
}

export const OperationButton = ({
  operation,
  className,
  dispatch,
}: IOperationButton) => {
  return (
    <button
      className={cn(btn, 'bg-primary text-white', className)}
      onClick={() => dispatch(chooseOperation(operation))}
    >
      {operation}
    </button>
  )
}

export const Button = ({
  className,
  onClick,
  children,
}: Omit<IButton, 'dispatch'>) => {
  return (
    <button
      className={cn(btn, 'bg-primary text-white', className)}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
