'use client'
import {
  DEFAULT_SETTINGS,
  LOADER_BORDER_SIZES,
  LOADER_PARAMS,
  LOADER_SIZES,
  LOADER_SPEED,
} from '@/common/loaders-constants'
import ColorPickerButton from '@/components/shared/ColorPickerButton'
import { Button } from '@/components/ui/button'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { cn } from '@/components/utils'
import {
  type ILoaderParams,
  type InputSizeType,
} from '@/types/css-loaders.model'
import { useRouter } from 'next/navigation'
import { type FC, memo, useEffect } from 'react'

// const ColorPickerButton = dynamic(
//   () => import('@/components/shared/element/ColorPickerButton'),
//   { ssr: false },
// )

interface CustomizeLoader {
  size?: InputSizeType
  index?: number | null
  state: ILoaderParams
}

const CustomizeLoader: FC<CustomizeLoader> = ({
  index,
  size: btnSize = 'default',
  state,
}) => {
  const router = useRouter()

  const {
    size = DEFAULT_SETTINGS.size,
    border = DEFAULT_SETTINGS.border,
    speed = DEFAULT_SETTINGS.speed,
    primaryColor = '570df8',
    secondaryColor = 'd8dde4',
    sourceCode = 'false',
  } = state
  console.log('state', state)

  useEffect(() => {
    document.documentElement.style.setProperty(
      '--loader-width',
      LOADER_SIZES.find(bsize => bsize.label == size)?.size + 'px',
    )
    document.documentElement.style.setProperty(
      '--loader-border',
      LOADER_BORDER_SIZES.find(bsize => bsize.label == border)?.size + 'px',
    )
    document.documentElement.style.setProperty(
      '--loader-speed',
      LOADER_SPEED.find(bsize => bsize.label == speed)?.size + 's',
    )
    document.documentElement.style.setProperty(
      '--loader-primary',
      '#' + primaryColor,
    )
    document.documentElement.style.setProperty(
      '--loader-secondary',
      '#' + secondaryColor,
    )
    return () => {
      document.documentElement.style.removeProperty('--loader-width')
      document.documentElement.style.removeProperty('--loader-border')
      document.documentElement.style.removeProperty('--loader-speed')
      document.documentElement.style.removeProperty('--loader-primary')
      document.documentElement.style.removeProperty('--loader-secondary')
    }
  }, [border, primaryColor, secondaryColor, size, speed])

  const handleRoute = (newState: ILoaderParams) => {
    if (!index) {
      return router.push(
        '?' +
          LOADER_PARAMS({
            ...newState,
          }),
        {
          scroll: false,
        },
      )
    }

    return router.push(
      `/css-loaders/${index}?` +
        LOADER_PARAMS({
          ...newState,
        }),
      {
        scroll: false,
      },
    )
  }

  const onResetForm = () => {
    handleRoute({
      border: DEFAULT_SETTINGS.border,
      size: DEFAULT_SETTINGS.size,
      speed: DEFAULT_SETTINGS.speed,
      primaryColor: '570df8',
      secondaryColor: 'd8dde4',
      sourceCode,
    })
  }

  const formControl = 'flex flex-col text-left'

  const label = cn(
    'text-muted-foreground mb-1',
    btnSize === 'sm' && 'text-xs',
    btnSize === 'default' && 'text-sm',
  )
  const wrapper =
    'flex flex-wrap gap-x-3 gap-y-3 md:gap-x-5 md:gap-y-5 justify-center mx-auto w-full'

  const colorSlice = (value: string) => value.split('').slice(1).join('')

  return (
    <>
      <div className="mx-auto max-w-[1000px] flex gap-3">
        <div className={wrapper}>
          <FormFields
            label="Size"
            value={size}
            options={LOADER_SIZES}
            onChange={size => handleRoute({ ...state, size })}
            size={btnSize}
            labelClass={label}
          />
          <FormFields
            label="Border size"
            value={border}
            options={LOADER_BORDER_SIZES}
            onChange={border => handleRoute({ ...state, border })}
            size={btnSize}
            labelClass={label}
          />
          <FormFields
            label="Loader speed"
            value={speed}
            options={LOADER_SPEED}
            onChange={speed => handleRoute({ ...state, speed })}
            size={btnSize}
            labelClass={label}
          />

          <div className={formControl}>
            <label className={label} htmlFor="primaryColor">
              Primary Color
            </label>

            <ColorPickerButton
              value={'#' + primaryColor}
              onChange={(e: any) => {
                handleRoute({
                  speed,
                  size,
                  border,
                  primaryColor: colorSlice(e.target.value),
                  secondaryColor,
                  sourceCode,
                })
              }}
              size={btnSize}
            />
          </div>
          <div className={formControl}>
            <label className={label} htmlFor="secodaryColor">
              Secodary Color
            </label>

            <ColorPickerButton
              value={'#' + secondaryColor}
              onChange={(e: any) => {
                handleRoute({
                  speed,
                  size,
                  border,
                  primaryColor,
                  secondaryColor: colorSlice(e.target.value),
                  sourceCode,
                })
              }}
              size={btnSize}
            />
          </div>
          <div className={formControl}>
            <label className={label} htmlFor="secodaryColor">
              Reset
            </label>

            <div className="tooltip mr-auto" data-tip="Reset">
              <Button
                className={cn(
                  'no-animation active:focus:scale-95 p-0 aspect-square text-white',
                )}
                size={btnSize}
                role="button"
                variant="outline"
                aria-label="Reset"
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
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default memo(CustomizeLoader)

const ButtonSize = ({
  label,
  title,
  value,
}: {
  label: string
  title: string
  value: string
}) => {
  return (
    <ToggleGroupItem
      value={value}
      role="button"
      aria-label={title}
      title={title}
      className="data-[state=on]:bg-primary aspect-square bg-background rounded-lg  active:focus:scale-95 "
    >
      {label}
    </ToggleGroupItem>
  )
}

const FormFields = ({ label, labelClass, value, options, onChange, size }) => {
  const formControl = 'flex flex-col text-left justify-start '

  return (
    <div className={formControl}>
      <label className={labelClass} htmlFor={label}>
        {label}
      </label>
      <ToggleGroup
        type="single"
        variant="outline"
        defaultValue={value}
        size={size}
        onValueChange={onChange}
      >
        {options.map(option => (
          <ButtonSize
            key={option.label}
            value={option.label}
            label={option.label}
            title={option.title}
          />
        ))}
      </ToggleGroup>
    </div>
  )
}
