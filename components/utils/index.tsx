import { type ClassValue, clsx } from 'clsx'
import babelPlugin from 'prettier/plugins/babel'
import estreePlugin from 'prettier/plugins/estree'
import html from 'prettier/plugins/html'
import markdown from 'prettier/plugins/markdown'
import cssPlugin from 'prettier/plugins/postcss'
import typescriptPlugin from 'prettier/plugins/typescript'
import prettier from 'prettier/standalone'
import { twMerge } from 'tailwind-merge'

const plugins = [
  babelPlugin,
  typescriptPlugin,
  estreePlugin,
  html,
  cssPlugin,
  markdown,
]

export const cn = (...input: ClassValue[]) => {
  return twMerge(clsx(input))
}

export const getRandom = (charSet: string) => {
  const randomIndex = Math.floor(Math.random() * charSet.length)
  return { index: randomIndex, char: charSet[randomIndex] }
}

export function darkenColor(color: string, percentage: number): string {
  if (color[0] === '#') {
    const hex = color.slice(1)
    const rgb = parseInt(hex, 16)
    let r = (rgb >> 16) & 0xff
    let g = (rgb >> 8) & 0xff
    let b = rgb & 0xff

    r = Math.floor(r * (1 - percentage / 100))
    g = Math.floor(g * (1 - percentage / 100))
    b = Math.floor(b * (1 - percentage / 100))

    return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`
  } else if (color.startsWith('rgb')) {
    const rgbArray = color.match(/\d+/g)!.map(Number)

    const r = Math.floor(rgbArray[0] * (1 - percentage / 100))
    const g = Math.floor(rgbArray[1] * (1 - percentage / 100))
    const b = Math.floor(rgbArray[2] * (1 - percentage / 100))

    return `rgb(${r}, ${g}, ${b})`
  } else {
    return color
  }
}

export function oppositeColor(color: string, percentage: number): string {
  let newColor = []
  if (color[0] === '#') {
    color = color.slice(1)
    if (color.length === 3) {
      newColor = color.split('').map(hex => parseInt(hex + hex, 16))
    } else if (color.length === 6) {
      newColor = color.match(/.{2}/g)!.map(hex => parseInt(hex, 16))
    } else {
      throw new Error('Invalid hex color')
    }
  } else if (color.startsWith('rgb')) {
    newColor = color.match(/\d+/g)!.map(value => parseInt(value))
  } else {
    throw new Error('Invalid color format')
  }

  const oppositeColor = newColor.map(channel => {
    const newValue = channel + Math.round((255 - channel) * (percentage / 100))
    return Math.min(255, Math.max(0, newValue))
  })

  const hexColor = oppositeColor
    .map(channel => channel.toString(16).padStart(2, '0'))
    .join('')

  return '#' + hexColor
}

export const formatCode = async (
  code: string,
  parser: string = 'babel',
) => {
  return prettier.format(code, {
    semi: false,
    parser: parser,
    plugins,
  })
}
