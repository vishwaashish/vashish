'use client'
import { Button } from '@/components/ui/button'
import { transition } from '@/components/utils/animation'
import { formatNumber } from '@/components/utils/number'
import { useAppDispatch, useAppSelector } from '@/store'
import {
  addDigit,
  chooseOperation,
  clear,
  deleteDigit,
  populateHistory,
  stateCalculator,
  total,
} from '@/store/calculator'
import { type IHistory } from '@/types/calculator.model'
import { motion } from 'framer-motion'
import { useCallback, useEffect, useRef } from 'react'
import { NumberButton, OperationButton } from './Button'
import CalculatorHistory from './CalculatorHistory'

const DIGIT_KEYS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '.']
const OPERATION_KEYS = ['+', '-', '*', '%']
const SPECIAL_KEYS = ['/', '=', 'Enter', 'Backspace']

const BasicCalculator = () => {
  const ref = useRef<HTMLDivElement | null>(null)
  const calculator = useAppSelector(stateCalculator)
  const dispatch = useAppDispatch()

  useEffect(() => {
    function detectKeyDown(e: KeyboardEvent) {
      const key = e.key
      if (DIGIT_KEYS.includes(key)) {
        dispatch(addDigit(key))
      }

      if (OPERATION_KEYS.includes(key)) {
        dispatch(chooseOperation(key))
      }

      if (key === '/') {
        dispatch(chooseOperation('÷'))
      }

      if (SPECIAL_KEYS.includes(key)) {
        switch (key) {
          case '=':
          case 'Enter':
            dispatch(total())
            break
          case 'Backspace':
            dispatch(deleteDigit())
            break
        }
      }
    }

    document.addEventListener('keydown', detectKeyDown, true)

    return () => {
      document.removeEventListener('keydown', detectKeyDown, true)
    }
  }, [dispatch])

  const onHistoryClick = useCallback(
    (history: IHistory) => () => {
      dispatch(populateHistory(history))
      if (ref.current) {
        const maxHeight = ref.current.scrollHeight - window.innerHeight
        const height = (window.pageYOffset * 100) / maxHeight
        window.scrollTo({
          top: Math.abs(height),
        })
      }
    },
    [dispatch],
  )

  return (
    <div className="">
      <motion.div
        {...transition(0.39)}
        className="max-w-sm mx-auto grid grid-cols-4 gap-2 mt-5 border-2 border-input  p-2 rounded-xl"
      >
        <div
          ref={ref}
          className="border-2 border-input bg-background transition-transform rounded-lg col-span-full flex flex-col justify-start items-end p-2 gap-1 min-h-[60px]"
        >
          <div className="text-md break-words w-full text-right">
            {formatNumber(calculator.previous || '')}
            {calculator.operation}
          </div>
          <div className="text-4xl font-medium break-words w-full text-right">
            {formatNumber(calculator.current || '')}
          </div>
        </div>
        <Button
          className="transition-allhover:scale-105 text-xl"
          onClick={() => {
            dispatch(clear())
          }}
        >
          AC
        </Button>

        <OperationButton operation="%" dispatch={dispatch}>
          %
        </OperationButton>
        <OperationButton operation="÷" dispatch={dispatch} />
        <OperationButton
          operation="*"
          dispatch={dispatch}
          className="items-baseline"
        />
        <NumberButton digit="1" dispatch={dispatch} />
        <NumberButton digit="2" dispatch={dispatch} />
        <NumberButton digit="3" dispatch={dispatch} />
        <OperationButton operation="+" dispatch={dispatch} />
        <NumberButton digit="4" dispatch={dispatch} />
        <NumberButton digit="5" dispatch={dispatch} />
        <NumberButton digit="6" dispatch={dispatch} />
        <OperationButton operation="-" dispatch={dispatch} />
        <NumberButton digit="7" dispatch={dispatch} />
        <NumberButton digit="8" dispatch={dispatch} />
        <NumberButton digit="9" dispatch={dispatch} />
        <Button
          className="row-span-2 h-full transition-all hover:scale-105 text-xl"
          onClick={() => {
            dispatch(total())
          }}
        >
          =
        </Button>
        <NumberButton
          digit={'.'}
          dispatch={dispatch}
          className="items-baseline"
        />
        <NumberButton digit="0" dispatch={dispatch} />
        <Button
          onClick={() => {
            dispatch(deleteDigit())
          }}
          variant="secondary"
          className={'transition-all hover:scale-105 text-xl'}
        >
          DEL
        </Button>
      </motion.div>

      {!(calculator.history.length === 0) && (
        <CalculatorHistory
          historys={calculator.history}
          onClick={onHistoryClick}
        />
      )}
    </div>
  )
}

export default BasicCalculator
