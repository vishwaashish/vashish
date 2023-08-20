import { cn } from '@/components/utils'
import React from 'react'
import { motion } from 'framer-motion'
import { copyText } from '@/components/utils/text'

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
          <motion.a
            whileHover={{
              scale: 1.1,
            }}
            whileTap={{
              scale: 0.95,
            }}
            title="Copy"
            role="button"
            onClick={onCopy}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75"
              />
            </svg>
          </motion.a>

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
