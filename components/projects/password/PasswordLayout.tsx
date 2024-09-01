import { CopyButton } from '@/components/shared/CopyButton'
import { Input } from '@/components/ui/input'
import { transition } from '@/components/utils/animation'
import { copyToClipboard } from '@/components/utils/text'
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
    await copyToClipboard(password)
  }
  return (
    <div className="max-w-[650px] m-auto">
      <motion.div {...transition(0.4)} className="flex items-center relative">
        <Input
          size="lg"
          value={password}
          onChange={handleChange}
          placeholder="Enter Password"
        />
        <div className=" flex items-center absolute right-5 ">
          <CopyButton
            onClick={onCopy}
            title="Copy"
            role="button"
            width={6}
            height={6}
            variant="ghost"
            size="icon"
          />
          {inputBody}
        </div>
      </motion.div>

      <motion.div {...transition(0.5)}>
        <p className="mb-2 pt-5 ">{subHeading}</p>
        <div className="transition-all border border-border bg-card  h-full shadow-xl  p-4 sm:p-8 rounded-lg items-start flex flex-col gap-5">
          {children}
        </div>
      </motion.div>
    </div>
  )
}

export default PasswordLayout
