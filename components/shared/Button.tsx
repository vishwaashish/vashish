import { motion } from 'framer-motion'
import { FC, FormEvent } from 'react'
import { cn } from '../utils'
const Button = () => {
  return <div>Button</div>
}

interface TooltipIcon {
  onClick?: (e:FormEvent<HTMLButtonElement>) => void
  children: React.ReactNode
  label?: string
  className?: string
}

export const Icon: FC<TooltipIcon> = ({
  label = '',
  className = '',
  onClick,
  children,
}) => {
  const child = (
    <motion.button
      className={cn('h-full grid place-content-center', className)}
      role="button"
      onClick={onClick}
    >
      {children}
    </motion.button>
  )

  if (label) {
    return (
      <span className="tooltip tooltip-bottom" data-tip={label}>
        {child}
      </span>
    )
  }

  return child
}
