import { CopyButton } from '@/components/shared/CopyButton'
import { cn } from '@/components/utils'
import { transition } from '@/components/utils/animation'
import { copyText } from '@/components/utils/text'
import { motion } from 'framer-motion'

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
    <div className="max-w-[650px] m-auto">
      <motion.div {...transition(0.4)} className="flex items-center relative">
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
            title="Copy"
            role="button"
            width={6}
            height={6}
          />

          {inputBody}
        </div>
      </motion.div>

      <motion.div {...transition(0.5)}>
        <h4 className="mb-2">{subHeading}</h4>
        <div
          className="transition-all card border input-bordered  h-full  bg-base-100 shadow-xl  p-4 sm:p-8 rounded-lg items-start  flex flex-col gap-5"
          style={{
            borderColor: 'hsl(var(--bc) / var(--tw-border-opacity))',
          }}
        >
          {children}
        </div>
      </motion.div>
    </div>
  )
}

export default PasswordLayout
