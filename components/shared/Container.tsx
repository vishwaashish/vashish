import { cn } from '../utils'

interface Props {
  children: React.ReactNode
  className?: string
}

const Container = ({ children, className }: Props) => {
  return (
    <div
      className={cn(` max-w-screen-xl  mx-auto px-4 lg:px-6  py-10`, className)}
    >
      {children}
    </div>
  )
}

export default Container
