import { createElement } from 'react'
import {
  bundledLanguages,
  bundledThemes,
  getHighlighter,
} from 'shiki/bundle/web'

var highlighterPromise: any = null

function getHighlighterInstance() {
  if (!highlighterPromise) {
    highlighterPromise = getHighlighter({
      themes: Object.keys(bundledThemes),
      langs: Object.keys(bundledLanguages),
    })
  }
  return highlighterPromise
}

function darkenColor(color: string, percentage: number): string {
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

export async function renderCode(
  code = '',
  lang = 'javascript',
  theme = 'dark-plus',
  lineNumber = false,
  isHeader = true,
) {
  const highlighter = await getHighlighterInstance()

  if (!highlighter) return null

  const result = await highlighter.codeToHtml(code, { lang, theme })
  const bgColorRegex =
    /background-color:\s*(#[a-fA-F0-9]{6}|#[a-fA-F0-9]{3}|[a-zA-Z]+)/
  const bgColorMatch = result.match(bgColorRegex)
  const bgColor = bgColorMatch ? bgColorMatch[1] : 'transparent'
  const headerColor = darkenColor(bgColor, 8) || bgColor

  const lines = code.split('\n')
  const lineNumbers = Array.from({ length: lines.length }, (_, i) => i + 1)

  var highlightedCodeWithLineNumbers: string = ''
  var count: string = ''
  // if (lineNumber) {
  // highlightedCodeWithLineNumbers = result
  //   .split('\n')
  //   .map((line: string, index: number) => {
  //     const leadingSpaces = line.match(/^\s*/)?.[0] || '' // use optional chaining and nullish coalescing
  //     const spaces = '&nbsp;'.repeat(leadingSpaces.length)
  //     return `<div class="flex"><span class="mr-2 text-gray-400">${lineNumbers[index]}</span>${spaces}${line}</div>`
  //     // return `<div class="flex"><span class="mr-2 text-gray-400">${lineNumbers[index]}</span><code>${line}</code></div>`
  //   })
  //   .join('\n')
  // } else {
  highlightedCodeWithLineNumbers = result
  // }

  if (lineNumber) {
    count = highlightedCodeWithLineNumbers
      .split('\n')
      .map((_i, index) => `<span key={index}>${index + 1}</span>`)
      .join('\n')
  }

  return `<div class=" text-left" style="background-color: ${bgColor};">
  ${
    isHeader
      ? `<div
  class="window-controls flex h-10 w-full items-center justify-between gap-4 px-5"
  style="background-color: ${headerColor}"
  >
  <div class="grid h-full w-full items-center grid-cols-[60px_1fr_60px] gap-4">
    <div class="flex items-center gap-2">
      <div class="h-[13px] w-[13px] rounded-full bg-[#ff5f57]"></div>
      <div class="h-[13px] w-[13px] rounded-full bg-[#febc2e]"></div>
      <div class="h-[13px] w-[13px] rounded-full bg-[#28c840]"></div>
    </div>
    <div class="filename flex justify-center">
      
    </div>
    <div></div>
  </div>
  </div>`
      : ''
  }
<div class="px-5 py-3 shikicontainer leading-relaxed flex flex-row">
${
  lineNumber
    ? `<div class="flex flex-col " style="padding-right:1rem">${count}</div>`
    : ''
}
${highlightedCodeWithLineNumbers}
</div>
  </div>`
}

export default renderCode
