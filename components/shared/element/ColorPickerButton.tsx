import { cn } from '@/components/utils'
import { copyToClipboard } from '@/components/utils/text'
import { InputSizeType } from '@/types/css-loaders.model'
import { useEffect, useState } from 'react'

const ColorPickerButton = ({
  onChange,
  value,
  size = 'btn-md',
}: {
  value: string
  onChange: any
  size: InputSizeType
}) => {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (copied) {
      setTimeout(() => {
        setCopied(false)
      }, 1000)
    }
  }, [copied])

  const onCopy = () => {
    copyToClipboard(value).then(val => {
      setCopied(true)
    })
  }
  return (
    <div className="join shadow border-primary">
      <input
        type="color"
        className={cn(
          'no-animation active:focus:scale-95 !px-0  border-0 btn btn-sm join-item appearance-none',
          `md:${size}`,
        )}
        value={value}
        onChange={onChange}
        aria-label="Color Picker"
      />
      <style>
        {`
  input[type="color"]::-webkit-color-swatch-wrapper {
    all: unset;
    width:100%;
    height: 100%;
    display: inline-flex;
    border-bottom-left-radius: inherit;
    border-top-left-radius: inherit;
  }
  input[type="color"]::-webkit-color-swatch {
    border: none;
    border-bottom-left-radius: inherit;
    border-top-left-radius: inherit;
  }
`}
      </style>

      <button
        className={cn(
          'btn  no-animation active:focus:scale-95 join-item btn-sm  swap swap-flip min-w-[100px] border-0 border-l-2 border-neutral-content grow ',
          copied && 'swap-active',
          `md:${size}`,
        )}
        onClick={onCopy}
        aria-label={'Copied! ' + value}
      >
        <span className="swap-on capitalize">Copied!</span>
        <span className="swap-off">{value}</span>
        {/* {value} */}
      </button>
    </div>
  )
}

export default ColorPickerButton
