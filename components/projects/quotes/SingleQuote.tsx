import { IQuote } from '@/types/quotes.model'
import Link from 'next/link'
import React, { FC } from 'react'
import { motion } from 'framer-motion'
import { CopyButton } from '@/components/shared/button/CopyButton'
import { cn } from '@/components/utils'
import { copyText } from '@/components/utils/text'
interface ISingleQuote {
  item: IQuote
  category: string
}
const SingleQuote: FC<ISingleQuote> = ({ item, category }) => {
  const btn =
    'bg-gray-200 hover:bg-primary text-black hover:text-white font-semibold px-4 p-2 rounded-full mx-auto  max-w-screen-md text-center text-lg'

  const transition = (delay: number) => ({
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 },
    transition: {
      delay: delay,
      duration: 0.95,
      ease: [0.165, 0.84, 0.44, 1],
    },
  })
  return (
    <div className="flex px-8 py-8 min-h-screen-header">
      <div className="flex flex-col my-auto gap-y-4 w-full mx-auto">
        <motion.h1
          {...transition(0.15)}
          className="text-center text-4xl md:text-6xl font-bold w-full"
        >
          <q>{item.content}</q>
        </motion.h1>
        <motion.p
          {...transition(0.29)}
          className="mx-auto text-2xl max-w-screen-md text-center "
        >
          - {item.author}
        </motion.p>
        <div className="ml-auto flex items-center gap-2 text-center md:text-right ">
          <motion.div {...transition(0.49)}>
            <Link href={`/quotes`} className={btn}>
              Quotes
            </Link>
          </motion.div>
          <motion.div {...transition(0.59)}>
            <Link href={`/quotes/${category}`} className={btn}>
              {category}
            </Link>
          </motion.div>
          <motion.div {...transition(0.6)}>
            <CopyButton
              onClick={() => copyText(item.content)}
              className={cn(btn, 'p-3')}
            />
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default SingleQuote
