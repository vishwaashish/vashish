import {
  DEFAULT_SETTINGS,
  LOADER_BORDER_SIZES,
  LOADER_SIZES,
  LOADER_SPEED,
} from '@/common/loaders-constants'
import { cn } from '@/components/utils'
import { hslStringToHex } from '@/components/utils/text'
import { DefaultLoaderType } from '@/types/css-loaders.model'
import dynamic from 'next/dynamic'
import { FC, FormEvent, useEffect, useState } from 'react'
const ColorPickerButton = dynamic(
  () => import('@/components/shared/element/ColorPickerButton'),
  { ssr: false },
)

const getColor = (obj: DefaultLoaderType) => {
  return {
    primaryColor: hslStringToHex(obj.primaryColor),
    secondaryColor: hslStringToHex(obj.secondaryColor),
    size: obj.size,
    border: obj.border,
    speed: obj.speed,
  }
}

interface CustomizeLoader {
  // Add your interface properties here
}

const CustomizeLoader: FC<CustomizeLoader> = () => {
  const [state, setState] = useState<DefaultLoaderType>(DEFAULT_SETTINGS)
console.log(state,'state')
  useEffect(() => {
    var style = getComputedStyle(document.body)
    setState(
      getColor({
        primaryColor: style.getPropertyValue('--loader-primary'),
        secondaryColor: style.getPropertyValue('--loader-secondary'),
        size: style.getPropertyValue('--loader-width'),
        border: style.getPropertyValue('--loader-border'),
        speed: style.getPropertyValue('--loader-speed'),
      }),
    )
  }, [setState])

  const handleRange = (value: number) => {
    document.documentElement.style.setProperty('--loader-width', value + 'px')
    setState((val: any) => ({ ...val, size: value + 'px' }))
  }

  const handleBorder = (value: number) => {
    document.documentElement.style.setProperty('--loader-border', value + 'px')
    setState((val: any) => ({ ...val, border: value + 'px' }))
  }
  const handleSpeed = (value: number) => {
    document.documentElement.style.setProperty('--loader-speed', value + 's')
    setState((val: any) => ({ ...val, speed: value + 's' }))
  }

  const handlePrimayColor = (e: FormEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value
    document.documentElement.style.setProperty('--loader-primary', value)
    setState(val => ({
      ...val,
      primaryColor: String(value),
    }))
  }
  const handleSecondaryColor = (e: FormEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value
    document.documentElement.style.setProperty('--loader-secondary', value)
    setState((val: any) => ({ ...val, secondaryColor: value }))
  }

  const onResetForm = () => {
    var style = getComputedStyle(document.body)

    const primaryColor = `hsl(${style.getPropertyValue(
      DEFAULT_SETTINGS.primaryColor,
    )})`

    const secondaryColor = `hsl(${style.getPropertyValue(
      DEFAULT_SETTINGS.secondaryColor,
    )})`

    const setting = getColor({
      primaryColor: primaryColor,
      secondaryColor: secondaryColor,
      size: DEFAULT_SETTINGS.size,
      border: DEFAULT_SETTINGS.border,
      speed: DEFAULT_SETTINGS.speed,
    })

    setState({
      primaryColor: setting.primaryColor,
      secondaryColor: setting.secondaryColor,
      size: setting.size,
      border: setting.border,
      speed: setting.speed,
    })
    document.documentElement.style.setProperty(
      '--loader-border',
      setting.border,
    )
    document.documentElement.style.setProperty('--loader-width', setting.size)
    document.documentElement.style.setProperty(
      '--loader-primary',
      setting.primaryColor,
    )
    document.documentElement.style.setProperty(
      '--loader-secondary',
      setting.secondaryColor,
    )
  }

  const formControl = 'flex flex-col text-left grow '
  const buttonGroup = 'btn-group drop-shadow'
  return (
    <div className="flex gap-x-10 gap-y-5 justify-center z-50 py-4 flex-wrap mx-auto max-w-[900px] ">
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
        <label htmlFor="border-size">Loader speed</label>

        <div className={buttonGroup}>
          {LOADER_SPEED.map(item => {
            return (
              <ButtonSize
                id={'loader-size-' + item}
                active={state.speed === item.size + 's'}
                onClick={() => handleSpeed(item.size)}
                key={item.label}
                label={item.label}
              />
            )
          })}
        </div>
      </div>
      <div className={formControl}>
        <label htmlFor="primaryColor">Primary Color</label>

        <ColorPickerButton
          value={state.primaryColor}
          onChange={handlePrimayColor}
        />
      </div>
      <div className={formControl}>
        <label htmlFor="secodaryColor">Secodary Color</label>

        <ColorPickerButton
          value={state.secondaryColor}
          onChange={handleSecondaryColor}
        />
      </div>

      <div className={formControl}>
        <label htmlFor="secodaryColor">Reset</label>

        <button className="btn" onClick={onResetForm}>
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
              d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
            />
          </svg>
        </button>
      </div>
    </div>
  )
}
export default CustomizeLoader

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
      className={cn(active && 'btn-active', 'btn aspect-square')}
      onClick={onClick}
    >
      {label}
    </button>
  )
}
