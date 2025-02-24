import * as React from 'react'

import { cn } from '@/components/utils'
import { cva, type VariantProps } from 'class-variance-authority'

const inputVariants = cva(
  'flex h-10 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      size: {
        default: 'h-12 text-lg px-4 py-2',
        xs: 'h-6 rounded-lg px-3 text-sm',
        sm: 'h-8 rounded-lg px-8 text',
        lg: 'h-16  text-2xl  px-6',
      },
      type: {
        radio: 'radio px-0',
        text: '',
        number: '',
        checkbox: 'checkbox p-0',
      },
    },
    defaultVariants: {
      size: 'default',
      type: 'text',
    },
  },
)

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'>,
    VariantProps<typeof inputVariants> {
  asChild?: boolean
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, size, type, ...props }, ref) => {
    return (
      <input
        type={type || 'text'}
        className={cn(inputVariants({ size, type, className }))}
        ref={ref}
        {...props}
      />
    )
  },
)

Input.displayName = 'Input'

export { Input }
