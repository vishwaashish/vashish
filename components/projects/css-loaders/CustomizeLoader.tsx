import {
  DEFAULT_SETTINGS,
  LOADER_BORDER_SIZES,
  LOADER_SIZES,
} from '@/common/loaders-constants'
import { cn } from '@/components/utils'
import { DefaultLoaderType } from '@/types/css-loaders.model'
import { calcLength } from 'framer-motion'
import { FC, FormEvent, useEffect, useState } from 'react'
function hslToHex(h: number, s: number, l: number) {
  h = ((h % 360) + 360) % 360 // Ensure h is within [0, 360)
  s = Math.min(100, Math.max(0, s)) // Clamp s within [0, 100]
  l = Math.min(100, Math.max(0, l)) // Clamp l within [0, 100]

  const c = ((1 - Math.abs((2 * l) / 100 - 1)) * s) / 100
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1))
  const m = l / 100 - c / 2

  let r, g, b

  if (h >= 0 && h < 60) {
    r = c
    g = x
    b = 0
  } else if (h >= 60 && h < 120) {
    r = x
    g = c
    b = 0
  } else if (h >= 120 && h < 180) {
    r = 0
    g = c
    b = x
  } else if (h >= 180 && h < 240) {
    r = 0
    g = x
    b = c
  } else if (h >= 240 && h < 300) {
    r = x
    g = 0
    b = c
  } else {
    r = c
    g = 0
    b = x
  }

  const intR = Math.round((r + m) * 255)
  const intG = Math.round((g + m) * 255)
  const intB = Math.round((b + m) * 255)

  const hexR = intR.toString(16).padStart(2, '0')
  const hexG = intG.toString(16).padStart(2, '0')
  const hexB = intB.toString(16).padStart(2, '0')

  return `#${hexR}${hexG}${hexB}`
}
function hslStringToHex(value: string) {
  const hslRegex = /hsl\(\s*(\d+)\s+(\d+)\%\s+(\d+)\%\s*\)/
  const match = value.match(hslRegex)

  if (!match) {
    return value
  }

  const hue = parseInt(match[1])
  const saturation = parseInt(match[2])
  const lightness = parseInt(match[3])

  const hexColor = hslToHex(hue, saturation, lightness)
  return hexColor
}

interface CustomizeLoader {
  // Add your interface properties here
}

const CustomizeLoader: FC<CustomizeLoader> = () => {
  const [state, setState] = useState<DefaultLoaderType>(DEFAULT_SETTINGS)
  console.log(state)
  useEffect(() => {
    var style = getComputedStyle(document.body)
    setState({
      primaryColor: hslStringToHex(style.getPropertyValue('--loader-primary')),
      secondaryColor: hslStringToHex(
        style.getPropertyValue('--loader-secondary'),
      ),
      size: style.getPropertyValue('--loader-width'),
      border: style.getPropertyValue('--loader-border'),
    })
  }, [setState])

  const handleRange = (value: number) => {
    document.documentElement.style.setProperty('--loader-width', value + 'px')
    setState((val: any) => ({ ...val, size: value + 'px' }))
  }

  const handleBorder = (value: number) => {
    document.documentElement.style.setProperty('--loader-border', value + 'px')
    setState((val: any) => ({ ...val, border: value + 'px' }))
  }

  const handlePrimayColor = (e: FormEvent<HTMLInputElement>) => {
    console.log(e.currentTarget.value, e.currentTarget.value)

    document.documentElement.style.setProperty(
      '--loader-primary',
      e.currentTarget.value,
    )
    // setState((val: any) => ({ ...val, primaryColor: e.currentTarget.value }))
  }
  const handlePrimayChange = (e: FormEvent<HTMLInputElement>) => {
    document.documentElement.style.setProperty(
      '--loader-primary',
      e.currentTarget.value,
    )
    setState((val: any) => ({ ...val, primaryColor: e.currentTarget.value }))
  }
  const handleSecondaryColor = (e: FormEvent<HTMLInputElement>) => {
    document.documentElement.style.setProperty(
      '--loader-secondary',
      e.currentTarget.value,
    )
    setState((val: any) => ({ ...val, secondaryColor: e.currentTarget.value }))
  }

  const onSubmit = (e: FormEvent<HTMLInputElement>) => {
    e.preventDefault()
  }
  const onResetForm = () => {
    setState(DEFAULT_SETTINGS)
    document.documentElement.style.setProperty(
      '--loader-width',
      DEFAULT_SETTINGS.size,
    )
    document.documentElement.style.setProperty(
      '--loader-primary',
      DEFAULT_SETTINGS.primaryColor,
    )
    document.documentElement.style.setProperty(
      '--loader-secondary',
      DEFAULT_SETTINGS.secondaryColor,
    )
  }

  const formControl = 'text-left'
  const buttonGroup = 'btn-group '
  return (
    <div className="flex gap-2 justify-center">
      <div className={formControl}>
        <label htmlFor="size">Size</label>

        <div className={buttonGroup}>
          {LOADER_SIZES.map(item => {
            return (
              <ButtonSize
                id={'size-' + item}
                active={state.size === item.size + 'px'}
                onClick={() => handleRange(item.size)}
                key={item.label}
                label={item.label}
              />
            )
          })}
        </div>
      </div>
      <div className={formControl}>
        <label htmlFor="border-size">Border size</label>

        <div className={buttonGroup}>
          {LOADER_BORDER_SIZES.map(item => {
            return (
              <ButtonSize
                id={'border-size-' + item}
                active={state.border === item.size + 'px'}
                onClick={() => handleBorder(item.size)}
                key={item.label}
                label={item.label}
              />
            )
          })}
        </div>
      </div>
      <div className={formControl}>
        <label htmlFor="primaryColor">Primary Color</label>

        <div className="join">
          <div>
            <div>
              <input
                className="input input-bordered join-item p-0 m-0 appearance-none "
                placeholder="Search"
                type="color"
              />
              <style>
                {`
          input[type="color"]::-webkit-color-swatch-wrapper {
            border-radius: 50px;
            padding: 0;
          
          input[type="color"]::-webkit-color-swatch {
            border: none;
            border-radius: 50px;
          }
        `}
              </style>
            </div>
          </div>
          <div className="">
            <button className="btn join-item">Search</button>
          </div>
        </div>
        {/* <label
          htmlFor="primaryColor"
          className="relative w-fullflex btn p-0 pr-5"
          // value={state?.primaryColor}
          // onChange={handlePrimayChange}
        >
          <input
            id="primaryColor"
            type="color"
            className="btn p-0 absolute  invisible w-full"
            // value={state?.primaryColor}
            value={'#fff0'}
            onChange={handlePrimayColor}
          />

          <div
            className={cn('w-16 h-full rounded', `bg-[${state.primaryColor}]`)}
            // style={{
            //   background: state?.primaryColor,
            // }}
          ></div>

          <label htmlFor="primaryColor" className=" transition-none ">
            {state?.primaryColor}
          </label>
        </label> */}
      </div>
      <div className={formControl}>
        <label htmlFor="secodaryColor">Secodary Color</label>
        <div className="form-group">
          <input
            id="secodaryColor"
            type="color"
            value={state?.secondaryColor}
            onChange={handleSecondaryColor}
          />
          <input
            type="text"
            value={state?.secondaryColor}
            onChange={handleSecondaryColor}
          />
        </div>
      </div>
    </div>
  )
}
export default CustomizeLoader

const Select = () => {
  return <></>
}

const ButtonSize = ({
  id,
  onClick,
  label,
  active,
}: {
  id: string
  active: boolean
  onClick: () => void
  label: string
}) => {
  return (
    <button
      id={id}
      className={cn(active && 'btn-active', 'btn')}
      onClick={onClick}
    >
      {label}
    </button>
  )
}
