import React, { type FC } from 'react'
import { motion } from 'framer-motion'
import { transition } from '@/components/utils/animation'
import { type IHistory } from '@/types/calculator.model'
import { formatNumber } from '@/components/utils/number'

interface CalculatorHistoryProps {
  historys: IHistory[]
  onClick: (data: IHistory) => any
}
const CalculatorHistory: FC<CalculatorHistoryProps> = ({
  historys,
  onClick,
}) => {
  return (
    <motion.div {...transition(0.39)}>
      <h4 className="text-foreground">History</h4>

      <div className="flex flex-col">
        {[...historys].reverse().map((history, index) => (
          <button
            className="btn h-full bg-inherit w-fit mx-auto hover:shadow-md  flex flex-wrap justify-center p-3 rounded-lg gap-2"
            key={'history' + index}
            onClick={onClick(history)}
          >
            <kbd>{formatNumber(String(history.first))}</kbd>
            <kbd> {history.operation}</kbd>
            <kbd> {history.second}</kbd>
            <kbd> =</kbd>
            <kbd> {formatNumber(String(history.total))}</kbd>
          </button>
        ))}
      </div>
    </motion.div>
  )
}

export default CalculatorHistory
