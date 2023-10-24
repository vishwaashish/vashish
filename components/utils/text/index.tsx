import toast from 'react-hot-toast'

export const copyText = async (
  text: string,
  msg: string = 'Copied to clipboard!',
) => {
  if (!text) {
    toast.error('Copied text is invalid!')
    return Promise.reject('Invalid copied text')
  }

  if (!window.isSecureContext) {
    toast.error('Clipboard access requires a secure (HTTPS) connection.')
    return Promise.reject('Insecure connection')
  }

  try {
    await navigator.clipboard.writeText(text)
    toast.success(msg, {
      id: text,
    })
    return text
  } catch (error) {
    toast.error('Error copying to clipboard')
    return Promise.reject('Clipboard write error')
  }
}

export const addHypen = (label: string) => label.split(' ').join('-')
export const removeHypen = (label: string) => label.split('-').join(' ')

export const capatalize = (label: string) =>
  label.charAt(0).toUpperCase() + label.slice(1)

export function hslToHex(h: number, s: number, l: number) {
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
export function hslStringToHex(value: string) {
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
