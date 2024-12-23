import Link from 'next/link'
import { motion } from 'framer-motion'
import { cn } from '@/components/utils'
import { transition } from '@/components/utils/animation'

export const QuoteCards = ({
  delay = 0,
  className,
  children,
}: {
  delay?: number
  className?: string
  children?: React.ReactNode
}) => {
  return (
    <motion.div
      className={cn(
        'grid pt-5 pb-12 md:py-12 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 mx-auto',
        className,
      )}
      {...(delay && transition(0.29))}
    >
      {children}
    </motion.div>
  )
}

export const QuoteCard = ({
  content,
  author,
  path,
  className = '',
}: {
  content: string
  author: string
  path: string
  className?: string
}) => {
  return (
    <Link className="no-underline" href={path}>
      <article
        className={cn(
          'min-w-full group flex shadow transition-all hover:scale-105 flex-col  my-auto h-full rounded-xl bg-muted hover:bg-primary hover:text-primary-foreground px-5 py-7  md:p-12  ',
          className,
        )}
      >
        <div className="self-center flex flex-col gap-y-4">
          <div className=" font-semibold  md:text-xl">
            <q className=''>{content}</q>
          </div>
          <div className="font-normal text-muted-foreground group-hover:text-muted">
            <i>- {author}</i>
          </div>
        </div>
      </article>
    </Link>
  )
}
