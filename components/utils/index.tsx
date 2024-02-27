import { clsx, ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...input: ClassValue[]) => {
  return twMerge(clsx(input));
};


export const getRandom = (charSet: string) => {
  const randomIndex = Math.floor(Math.random() * charSet.length)
  return { index: randomIndex, char: charSet[randomIndex] }
}


export function darkenColor(color: string, percentage: number): string {
  if (color[0] === '#') {
    let hex = color.slice(1)
    let rgb = parseInt(hex, 16)
    let r = (rgb >> 16) & 0xff
    let g = (rgb >> 8) & 0xff
    let b = rgb & 0xff

    r = Math.floor(r * (1 - percentage / 100))
    g = Math.floor(g * (1 - percentage / 100))
    b = Math.floor(b * (1 - percentage / 100))

    return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`
  } else if (color.startsWith('rgb')) {
    let rgbArray = color.match(/\d+/g)!.map(Number)

    let r = Math.floor(rgbArray[0] * (1 - percentage / 100))
    let g = Math.floor(rgbArray[1] * (1 - percentage / 100))
    let b = Math.floor(rgbArray[2] * (1 - percentage / 100))

    return `rgb(${r}, ${g}, ${b})`
  } else {
    return color
  }
}
