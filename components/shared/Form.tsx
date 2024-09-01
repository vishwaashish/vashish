import { cn } from '../utils'

export const FormGroup = ({
  label,
  className,
  childClassName,
  labelClassName,
  children,
}: {
  label: string
  className?: string
  childClassName?: string
  labelClassName?: string
  children: React.ReactNode
}) => {
  return (
    <div className={cn('flex flex-col text-left grow sm:grow-0 ', className)}>
      <label
        className={cn('text-xs mb-1 text-muted-foreground', labelClassName)}
        htmlFor={label}
      >
        {label}
      </label>

      <div className={cn('', childClassName)}>{children}</div>
    </div>
  )
}
