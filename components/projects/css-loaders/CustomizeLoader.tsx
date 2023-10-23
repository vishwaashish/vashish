'use client'
import {
  DEFAULT_SETTINGS,
  LOADER_BORDER_SIZES,
  LOADER_PARAMS,
  LOADER_SIZES,
  LOADER_SPEED,
} from '@/common/loaders-constants'
import { cn } from '@/components/utils'
import { ILoaderParams, InputSizeType } from '@/types/css-loaders.model'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'
import { FC, memo, useEffect } from 'react'

const ColorPickerButton = dynamic(
  () => import('@/components/shared/element/ColorPickerButton'),
  { ssr: false },
)

interface CustomizeLoader {
  size?: InputSizeType
  index?: number | null
  state: ILoaderParams
}

const CustomizeLoader: FC<CustomizeLoader> = ({
  index,
  size: btnSize = 'btn-md',
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

  useEffect(() => {
    document.documentElement.style.setProperty('--loader-width', size)
    document.documentElement.style.setProperty('--loader-border', border)
    document.documentElement.style.setProperty('--loader-speed', speed)
    document.documentElement.style.setProperty(
      '--loader-primary',
      '#' + primaryColor,
    )
    document.documentElement.style.setProperty(
      '--loader-secondary',
      '#' + secondaryColor,
    )
  }, [border, primaryColor, secondaryColor, size, speed])

  const handleRoute = ({
    border,
    size,
    speed,
    primaryColor,
    secondaryColor,
    sourceCode,
  }: ILoaderParams) => {
    if (index) {
      router.push(
        // {
        //   query: {
        //     loaderId: index,
        //     border,
        //     size,
        //     speed,
        //     primaryColor,
        //     secondaryColor,
        //     sourceCode,
        //   },
        // },
        `/css-loaders/${index}?${LOADER_PARAMS({
          border,
          size,
          speed,
          primaryColor,
          secondaryColor,
          sourceCode,
        })}`,
        // { shallow: true },
      )
    } else {
      router.push(
        '?' +
          LOADER_PARAMS({
            border,
            size,
            speed,
            primaryColor,
            secondaryColor,
            sourceCode,
          }),
        undefined,
        // {
        //   shallow: true,
        // },
      )
    }
  }

  const onResetForm = () => {
    handleRoute({
      border: DEFAULT_SETTINGS.border,
      size: DEFAULT_SETTINGS.size,
      speed: DEFAULT_SETTINGS.speed,
      primaryColor: '570df8',
      secondaryColor: 'd8dde4',
      sourceCode: sourceCode,
    })
  }

  const formControl = 'flex flex-col text-left grow sm:grow-0 '
  const buttonGroup = 'btn-group1 join drop-shadow'

  const label = btnSize === 'btn-sm' ? 'text-xs mb-1' : ''

  const wrapper =
    'flex flex-wrap gap-x-3 gap-y-3 md:gap-x-5 md:gap-y-5 justify-center mx-auto w-full'

  const colorSlice = (value: string) => value.split('').slice(1).join('')

  return (
    <>
      <div className="mx-auto max-w-[1000px] flex gap-3">
        <div className={wrapper}>
          <div className={formControl}>
            <label className={label} htmlFor="size">
              Size
            </label>

            <div className={buttonGroup}>
              {LOADER_SIZES.map(item => {
                return (
                  <ButtonSize
                    id={'size-' + item}
                    // active={state.size === item.size + 'px'}
                    active={size === item.size + 'px'}
                    // onClick={() => handleRange(item.size)}
                    onClick={() => {
                      handleRoute({
                        size: item.size + 'px',
                        border,
                        speed,
                        primaryColor,
                        secondaryColor,
                        sourceCode,
                      })
                    }}
                    key={item.label}
                    label={item.label}
                    title={item.title}
                    size={btnSize}
                  />
                )
              })}
            </div>
          </div>
          <div className={formControl}>
            <label className={label} htmlFor="border-size">
              Border size
            </label>

            <div className={buttonGroup}>
              {LOADER_BORDER_SIZES.map(item => {
                return (
                  <ButtonSize
                    id={'border-size-' + item}
                    active={border === item.size + 'px'}
                    onClick={() => {
                      handleRoute({
                        border: item.size + 'px',
                        size,
                        speed,
                        primaryColor,
                        secondaryColor,
                        sourceCode,
                      })
                    }}
                    key={item.label}
                    label={item.label}
                    title={item.title}
                    size={btnSize}
                  />
                )
              })}
            </div>
          </div>
          <div className={formControl}>
            <label className={label} htmlFor="border-size">
              Loader speed
            </label>

            <div className={buttonGroup}>
              {LOADER_SPEED.map(item => {
                return (
                  <ButtonSize
                    id={'loader-size-' + item}
                    active={speed === item.size + 's'}
                    onClick={() => {
                      handleRoute({
                        speed: item.size + 's',
                        size,
                        border,
                        primaryColor,
                        secondaryColor,
                        sourceCode,
                      })
                    }}
                    key={item.label}
                    label={item.label}
                    title={item.title}
                    size={btnSize}
                  />
                )
              })}
            </div>
          </div>
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
              <button
                className={cn(
                  'btn no-animation active:focus:scale-95 btn-primary group   text-white',
                  btnSize,
                )}
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
          'no-animation active:focus:scale-95 btn join-item aspect-square w-full ',
          size,
        )}
        onClick={onClick}
      >
        {label}
      </button>
    </div>
  )
}
