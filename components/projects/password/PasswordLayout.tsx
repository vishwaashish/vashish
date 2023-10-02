import { cn } from '@/components/utils'
import React from 'react'
import { motion } from 'framer-motion'
import { copyText } from '@/components/utils/text'
import { CopyButton } from '@/components/shared/button/CopyButton'

const PasswordLayout = ({
  password,
  handleChange,
  children,
  inputBody,
  subHeading = '',
}: {
  subHeading: string
  children: any
  password: string
  handleChange: any
  inputBody?: any
}) => {
  const onCopy = async () => {
    await copyText(password)
  }
  return (
    <div className="max-w-[600px] m-auto">
      <div className="flex items-center relative">
        <input
          className={cn(
            'input input-bordered w-full text-xl md:text-2xl input-lg pl-4 pr-[85px]',
          )}
          value={password}
          onChange={handleChange}
          placeholder="Enter Password"
        />
        <div className=" flex gap-2 absolute right-5 ">
          <CopyButton
            onClick={onCopy}
            whileHover={{
              scale: 1.05,
            }}
            whileTap={{
              scale: 0.95,
            }}
            title="Copy"
            role="button"
            width={6}
            height={6}
          />

          {inputBody}
        </div>
      </div>

      <h3 className="mb-2">{subHeading}</h3>
      <div
        className="transition-all card input input-bordered h-full  bg-base-100 shadow-xl  p-4 sm:p-8 rounded-lg items-start  flex flex-col gap-5"
        style={{
          borderColor: 'hsl(var(--bc) / var(--tw-border-opacity))',
        }}
      >
        {children}
      </div>
    </div>
  )
}

export default PasswordLayout
