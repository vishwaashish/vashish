'use client'
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
import { IHistory } from '@/types/calculator.model'
import { motion } from 'framer-motion'
import { useCallback, useEffect, useRef } from 'react'
import { Button, NumberButton, OperationButton } from './Button'
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
        const maxHeight = ref?.current?.scrollHeight - window.innerHeight
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
        className="max-w-sm mx-auto grid grid-cols-4 gap-2 mt-5 border-light   p-2 rounded-xl"
      >
        <div
          ref={ref}
          className="transition-transform bg-base-200 rounded-lg col-span-full flex flex-col justify-start items-end p-2 gap-1 min-h-[60px] glass"
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
          className={'col-span-'}
          onClick={() => {
            dispatch(clear())
          }}
        >
          AC
        </Button>

        <OperationButton operation="%" dispatch={dispatch}>
          %
        </OperationButton>
        <OperationButton operation="÷" dispatch={dispatch} className={''} />
        <OperationButton operation="*" dispatch={dispatch} className={''} />
        <NumberButton digit="1" dispatch={dispatch} className={''} />
        <NumberButton digit="2" dispatch={dispatch} className={''} />
        <NumberButton digit="3" dispatch={dispatch} className={''} />
        <OperationButton operation="+" dispatch={dispatch} className={''} />
        <NumberButton digit="4" dispatch={dispatch} className={''} />
        <NumberButton digit="5" dispatch={dispatch} className={''} />
        <NumberButton digit="6" dispatch={dispatch} className={''} />
        <OperationButton operation="-" dispatch={dispatch} />
        <NumberButton digit="7" dispatch={dispatch} className={''} />
        <NumberButton digit="8" dispatch={dispatch} className={''} />
        <NumberButton digit="9" dispatch={dispatch} className={''} />
        <Button
          className="row-span-2 h-full"
          onClick={() => {
            dispatch(total())
          }}
        >
          =
        </Button>
        <NumberButton digit={'.'} dispatch={dispatch} className="" />
        <NumberButton digit="0" dispatch={dispatch} className={''} />
        <Button
          onClick={() => {
            dispatch(deleteDigit())
          }}
          className="bg-unset text-unset"
        >
          DEL
        </Button>
      </motion.div>

      {!!calculator.history?.length && (
        <CalculatorHistory
          historys={calculator.history}
          onClick={onHistoryClick}
        />
      )}
    </div>
  )
}

export default BasicCalculator
