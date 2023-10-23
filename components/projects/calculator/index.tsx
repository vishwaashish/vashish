'use client'
import { HeadPara } from '@/components/shared/Heading'
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
import { memo, useEffect, useRef } from 'react'
import { Button, NumberButton, OperationButton } from './Button'
import { motion } from 'framer-motion'
import { transition } from '@/components/utils/animation'
import { HistoryState } from 'next/dist/shared/lib/router/router'
import { IHistory } from '@/types/calculator.model'

const Calculator = () => {
  const ref = useRef<HTMLDivElement | null>(null)
  const calculator = useAppSelector(stateCalculator)
  const dispatch = useAppDispatch()

  useEffect(() => {
    function detectKeyDown(e: KeyboardEvent) {
      const key = e.key
      if (
        ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '.'].includes(key)
      ) {
        dispatch(addDigit(key))
      }

      if (['+', '-', '*', '%'].includes(key)) {
        dispatch(chooseOperation(key))
      }
      if (['/'].includes(key)) {
        dispatch(chooseOperation('÷'))
      }

      if (['=', 'Enter'].includes(key)) {
        dispatch(total())
      }

      if (['Backspace'].includes(key)) {
        dispatch(deleteDigit())
      }
    }

    document.addEventListener('keydown', detectKeyDown, true)

    return () => {
      document.removeEventListener('keydown', detectKeyDown, true)
    }
  }, [dispatch])

  const onHistoryClick = (history: IHistory) => () => {
    dispatch(populateHistory(history))
    if (ref.current) {
      const maxHeight = ref?.current?.scrollHeight - window.innerHeight
      const height = (window.pageYOffset * 100) / maxHeight
      window.scrollTo({
        top: Math.abs(height),
      })
    }
  }
  return (
    <div className="">
      <HeadPara
        title="Free Online Basic Calculator"
        description={`Perform simple arithmetic calculations quickly and easily with our free online basic calculator. Add, subtract, multiply, and divide with just a few clicks. It's a handy tool for everyday math tasks. Give it a try now!`}
        titleDelay={0.19}
        descriptionDelay={0.29}
      >
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
          <motion.div {...transition(0.39)} className="max-w-sm mx-auto">
            <h4>History</h4>

            <div className="flex flex-col gap-2">
              {calculator.history.map((history, index) => (
                <button
                  className="btn h-full bg-inherit hover:bg-primary flex flex-wrap justify-center  border-light p-2 rounded-lg gap-2"
                  key={'history' + index}
                  onClick={onHistoryClick(history)}
                >
                  <kbd className="kbd kbd-sm  break-words">
                    {formatNumber(String(history.first))}
                  </kbd>
                  <kbd className=""> {history.operation}</kbd>
                  <kbd className="kbd kbd-sm"> {history.second}</kbd>
                  <kbd className=""> =</kbd>
                  <kbd className="kbd kbd-sm"> {history.total}</kbd>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </HeadPara>
    </div>
  )
}

export default memo(Calculator)
