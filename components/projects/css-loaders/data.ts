import {
  LOADER_BORDER_SIZES,
  LOADER_SIZES,
  LOADER_SPEED,
} from '@/common/loaders-constants'
import { ILoaderParams, LoaderSizeType } from '@/types/css-loaders.model'

export function getLoaderValues(options: ILoaderParams): ILoaderParams {
  const { size, border, speed, primaryColor, secondaryColor, sourceCode } =
    options

  const getSize = (options: LoaderSizeType[], label: string) =>
    `${options.find(s => s.label === label)?.size}px`
  const getSpeed = (options: LoaderSizeType[], label: string) =>
    `${options.find(s => s.label === label)?.size}s`
  const getColor = (color: string) => `${color}`

  return {
    size: getSize(LOADER_SIZES, size),
    border: getSize(LOADER_BORDER_SIZES, border),
    speed: getSpeed(LOADER_SPEED, speed),
    primaryColor: getColor(primaryColor),
    secondaryColor: getColor(secondaryColor),
    sourceCode: sourceCode,
  }
}
