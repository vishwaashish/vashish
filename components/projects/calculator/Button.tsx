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
  ...rest
}: INumberButton) => {
  return (
    <button
      className={cn(btn, className)}
      onClick={() => dispatch(addDigit(digit))}
      {...rest}
    >
      {digit}
    </button>
  )
}

export const OperationButton = ({
  operation,
  className,
  dispatch,
  ...rest
}: IOperationButton) => {
  return (
    <button
      className={cn(btn, 'bg-primary text-white', className)}
      onClick={() => dispatch(chooseOperation(operation))}
      {...rest}
    >
      {operation}
    </button>
  )
}

export const Button = ({
  className,
  children,
  ...rest
}: Omit<IButton, 'dispatch'>) => {
  return (
    <button className={cn(btn, 'bg-primary text-white', className)} {...rest}>
      {children}
    </button>
  )
}
