import {
  DEFAULT_SETTINGS,
  LOADER_BORDER_SIZES,
  LOADER_SIZES,
  LOADER_SPEED,
} from '@/common/loaders-constants'
import { cn } from '@/components/utils'
import { hslStringToHex } from '@/components/utils/text'
import { DefaultLoaderType, InputSizeType } from '@/types/css-loaders.model'
import dynamic from 'next/dynamic'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/router'
import { FC, FormEvent, memo, useEffect, useState } from 'react'

const ColorPickerButton = dynamic(
  () => import('@/components/shared/element/ColorPickerButton'),
  { ssr: false },
)

export const getColor = (obj: DefaultLoaderType) => {
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
  size?: InputSizeType
  state: DefaultLoaderType
  setState: React.Dispatch<React.SetStateAction<DefaultLoaderType>>
}

const CustomizeLoader: FC<CustomizeLoader> = ({
  state,
  setState,
  size = 'btn-md',
}) => {
  const searchParam = useSearchParams()
  const loader_width = searchParam.get('loader-width') || state.size
  const loader_border = searchParam.get('loader-border') || state.border
  const loader_speed = searchParam.get('loader-speed') || state.speed
  const loader_primary = searchParam.get('loader-primary')
  const loader_secondary = searchParam.get('loader-secondary')

  console.log('searchParam', searchParam, {
    loader_width,
    loader_border,
    loader_speed,
    loader_primary,
    loader_secondary,
  })
  const router = useRouter()

  const handleRoute = ({
    loader_border,
    loader_width,
    loader_speed,
    loader_primary,
    loader_secondary,
  }: any) => {
    router.push(
      `?loader-width=${loader_width}&loader-border=${loader_border}&loader-speed=${loader_speed}&loader-primary=${loader_primary}&loader-secondary=${loader_secondary}`,
    )
  }

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

  const formControl = 'flex flex-col text-left grow sm:grow-0 '
  const buttonGroup = 'btn-group1 join drop-shadow'

  const wrapper =
    'flex flex-wrap gap-x-3 gap-y-3 md:gap-x-5 md:gap-y-5 justify-center mx-auto w-full'

  const colorSlice = (value: string) => value.split('').slice(1).join('')
  return (
    <>
      <div className="mx-auto max-w-[1000px] flex gap-3">
        <div className={wrapper}>
          <div className={formControl}>
            <label htmlFor="size">Size</label>

            <div className={buttonGroup}>
              {LOADER_SIZES.map(item => {
                return (
                  <ButtonSize
                    id={'size-' + item}
                    // active={state.size === item.size + 'px'}
                    active={loader_width === item.size + 'px'}
                    // onClick={() => handleRange(item.size)}
                    onClick={() => {
                      handleRoute({
                        loader_width: item.size + 'px',
                        loader_border,
                        loader_speed,
                        loader_primary,
                        loader_secondary,
                      })
                    }}
                    key={item.label}
                    label={item.label}
                    title={item.title}
                    size={size}
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
                    active={loader_border === item.size + 'px'}
                    // active={state.border === item.size + 'px'}
                    // onClick={() => handleBorder(item.size)}
                    onClick={() => {
                      handleRoute({
                        loader_border: item.size + 'px',
                        loader_width,
                        loader_speed,
                        loader_primary,
                        loader_secondary,
                      })
                    }}
                    key={item.label}
                    label={item.label}
                    title={item.title}
                    size={size}
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
                    active={loader_speed === item.size + 's'}
                    // active={state.speed === item.size + 's'}
                    // onClick={() => handleSpeed(item.size)}
                    onClick={() => {
                      handleRoute({
                        loader_speed: item.size + 's',
                        loader_width,
                        loader_border,
                        loader_primary,
                        loader_secondary,
                      })
                    }}
                    key={item.label}
                    label={item.label}
                    title={item.title}
                    size={size}
                  />
                )
              })}
            </div>
          </div>
          <div className={formControl}>
            <label htmlFor="primaryColor">Primary Color</label>

            <ColorPickerButton
              value={'#' + loader_primary}
              // value={state.primaryColor}
              // onChange={handlePrimayColor}
              onChange={(e: any) => {
                handleRoute({
                  loader_speed,
                  loader_width,
                  loader_border,
                  loader_primary: colorSlice(e.target.value),
                  loader_secondary,
                })
              }}
              size={size}
            />
          </div>
          <div className={formControl}>
            <label htmlFor="secodaryColor">Secodary Color</label>

            <ColorPickerButton
              value={'#' + loader_secondary}
              // value={state.secondaryColor}
              // onChange={handleSecondaryColor}
              onChange={(e: any) => {
                handleRoute({
                  loader_speed,
                  loader_width,
                  loader_border,
                  loader_primary,
                  loader_secondary: colorSlice(e.target.value),
                })
              }}
              size={size}
            />
          </div>
          <div className={formControl}>
            <label htmlFor="secodaryColor">Reset</label>

            <div className="tooltip mr-auto" data-tip="Reset">
              <button
                className={cn('btn btn-primary group   text-white', size)}
                onClick={onResetForm}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 group-hover:animate-spin"
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
        </div>
      </div>
    </>
  )
}
export default memo(CustomizeLoader)

const ButtonSize = ({
  id,
  onClick,
  label,
  active,
  title,
  size = 'btn-md',
}: {
  id: string
  active: boolean
  onClick: () => void
  label: string
  title: string
  size: InputSizeType
}) => {
  return (
    <div className="grow tooltip" data-tip={title}>
      <button
        id={id}
        className={cn(
          active && 'btn-active btn-primary text-white',
          'btn join-item aspect-square w-full ',
          size,
        )}
        onClick={onClick}
      >
        {label}
      </button>
    </div>
  )
}
