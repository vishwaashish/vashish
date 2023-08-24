import { cn } from '@/components/utils'
import { copyText } from '@/components/utils/text'
import { useEffect, useState } from 'react'

const ColorPickerButton = ({
  onChange,
  value,
}: {
  value: string
  onChange: any
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
        className="p-0 no-animation border-0 btn join-item appearance-none"
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
          'btn join-item swap swap-flip min-w-[100px] border-0 border-l-2 border-neutral-content grow',
          copied && 'swap-active',
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
