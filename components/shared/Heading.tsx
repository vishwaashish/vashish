'use client'
import { motion } from 'framer-motion'
import { transition } from '../utils/animation'
import React, { FC } from 'react'
import { cn } from '../utils'

interface IHeadPara {
  className?: string
  titleDelay?: number
  descriptionDelay?: number
  title: string
  description?: string
  children?: React.ReactNode
}

export const HeadPara: FC<IHeadPara> = ({
  className = '',
  title = '',
  description = '',
  titleDelay = 0,
  descriptionDelay = 0,
  children,
}) => {
  return (
    <div
      className={cn(
        'prose lg:prose-lg prose-a:no-underline unse min-w-full mx-auto md:pt-12 md:px-8 text-center',
        className,
      )}
    >
      <motion.h1
        {...(titleDelay && transition(titleDelay))}
        className="  antialiased  capitalize"
      >
        {title}
      </motion.h1>

      {description && (
        <motion.p
          {...(descriptionDelay && transition(descriptionDelay))}
          className="mx-auto md:max-w-screen-md pb-5 "
        >
          {description}
        </motion.p>
      )}
      {children}
    </div>
  )
}
