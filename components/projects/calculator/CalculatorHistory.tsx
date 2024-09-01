import React, { type FC } from "react";
import { motion } from "framer-motion";
import { transition } from "@/components/utils/animation";
import { type IHistory } from "@/types/calculator.model";
import { formatNumber } from "@/components/utils/number";

interface CalculatorHistoryProps {
  historys: IHistory[]
  onClick: (data: IHistory) => any
}
const CalculatorHistory: FC<CalculatorHistoryProps> = ({
    historys,
    onClick,
}) => {
    return (
        <motion.div {...transition(0.39)} className="max-w-sm mx-auto">
            <h4>History</h4>

            <div className="flex flex-col gap-2">
                {historys.map((history, index) => (
                    <button
                        className="btn h-full bg-inherit hover:bg-primary  flex flex-wrap justify-center  border-light p-2 rounded-lg gap-2"
                        key={"history" + index}
                        onClick={onClick(history)}
                    >
                        <kbd className="kbd kbd-sm text-initial  break-words">
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
    );
};

export default CalculatorHistory;
