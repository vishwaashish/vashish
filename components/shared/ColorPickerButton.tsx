import { Button } from '@/components/ui/button'
import { Tooltip } from '@/components/ui/tooltip'
import { cn } from '@/components/utils'
import { copyToClipboard } from '@/components/utils/text'
import { type InputSizeType } from '@/types/css-loaders.model'
import { useEffect, useState } from 'react'

const ColorPickerButton = ({
  onChange,
  value,
  size = 'sm',
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
    <div className="shadow flex rounded-lg">
      <input
        type="color"
        className={cn(
          'no-animation active:focus:scale-95  !px-0  h-full border-0 rounded-s-lg appearance-none',
          //   size === 'lg' && 'h-12',
          //   size === 'sm' && 'h-9',
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
    padding: 0;
  }
  input[type="color"]::-webkit-color-swatch {
    border: none;
    border-bottom-left-radius: inherit;
    border-top-left-radius: inherit;
  }
`}
      </style>

      <Tooltip title="Copy">
        <Button
          className={cn(
            'btn  no-animation active:focus:scale-95  swap swap-flip min-w-[80px] bg-background text-foreground border-input rounded-s-none border  border-s-4 ',
            copied && 'swap-active',
          )}
          onClick={onCopy}
          size={size}
          aria-label={'Copied! ' + value}
        >
          <span className="swap-on capitalize">Copied!</span>
          <span className="swap-off">{value}</span>
        </Button>
      </Tooltip>
    </div>
  )
}

export default ColorPickerButton
