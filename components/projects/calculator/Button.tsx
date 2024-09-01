import { Button } from "@/components/ui/button"
import { addDigit, chooseOperation } from "@/store/calculator"
import { INumberButton, IOperationButton } from "@/types/calculator.model"

export const OperationButton = ({
  operation,
  dispatch,
  className,
}: IOperationButton) => {
  return (
    <Button
      className={`transition-all hover:scale-105 text-xl  ${className}`}
      onClick={() => dispatch(chooseOperation(operation))}
    >
      {operation}
    </Button>
  )
}

export const NumberButton = ({ digit, dispatch, className }: INumberButton) => {
  return (
    <Button
      variant="secondary"
      className={`transition-all hover:scale-105 text-xl ${className}`}
      onClick={() => dispatch(addDigit(digit))}
    >
      {digit}
    </Button>
  )
}
