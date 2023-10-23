import { cn } from '@/components/utils'
import { copyText } from '@/components/utils/text'
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
    copyText(value).then(val => {
      setCopied(true)
    })
  }
  return (
    <div className="join shadow border-primary">
      <input
        type="color"
        className={cn(
          'no-animation active:focus:scale-95 p-0  border-0 btn join-item appearance-none',
          size,
        )}
        value={value}
        onChange={onChange}
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
          'btn  no-animation active:focus:scale-95 join-item swap swap-flip min-w-[100px] border-0 border-l-2 border-neutral-content grow ',
          copied && 'swap-active',
          size,
        )}
        onClick={onCopy}
      >
        <span className="swap-on capitalize">Copied!</span>
        <span className="swap-off">{value}</span>
        {/* {value} */}
      </button>
    </div>
  )
}

export default ColorPickerButton
