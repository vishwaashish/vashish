'use client'
import { CopyButton } from '@/components/shared/CopyButton'
import { Button } from '@/components/ui/button'
import { cn } from '@/components/utils'
import { transition } from '@/components/utils/animation'
import { copyToClipboard, removeHypen } from '@/components/utils/text'
import { type IQuote } from '@/types/quotes.model'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { type FC } from 'react'
interface ISingleQuote {
  item: IQuote
  category: string
}
const SingleQuote: FC<ISingleQuote> = ({ item, category }) => {
  const textSize = (size: number) => {
    if (size < 100) {
      return 'text-4xl  md:text-6xl md:leading-snug'
    }
    if (size < 200) {
      return 'text-3xl  md:text-5xl md:leading-snug'
    }

    return 'text-1xl  md:text-4xl md:leading-snug'
  }
  return (
    <div className="flex md:py-8 md:px-8 min-h-screen-header">
      <div className="flex flex-col my-auto gap-y-4  w-full mx-auto">
        <motion.h1
          {...transition(0.15)}
          className={cn(
            'text-center  font-bold w-full md:leading-snug',
            textSize(item.content.length),
          )}
        >
          <q>{item.content}</q>
        </motion.h1>
        <motion.p
          {...transition(0.29)}
          className="mx-auto text-1xl max-w-screen-md text-center text-muted-foreground"
        >
          <i>- {item.author}</i>
        </motion.p>
        <div className="ml-auto flex  flex-wrap justify-center gap-x-2 gap-y-4  text-center md:text-right ">
          <motion.div {...transition(0.49)}>
            {/* <Link href={`/quotes`} className={btn}>
              Quotes
            </Link> */}
          </motion.div>
          <motion.div {...transition(0.59)}>
            <Button asChild variant="outline">
              <Link href={`/quotes/${category}`}>{removeHypen(category)}</Link>
            </Button>
          </motion.div>
          <motion.div {...transition(0.6)}>
            <CopyButton
              onClick={() => copyToClipboard(item.content)}
            ></CopyButton>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default SingleQuote
