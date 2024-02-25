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

export async function renderCode(
  code = '',
  lang = 'javascript',
  theme = 'dark-plus',
  lineNumber = false,
) {
  const highlighter = await getHighlighterInstance()

  if (!highlighter) return null

  const result = await highlighter.codeToHtml(String(code), { lang, theme })
  const bgColorRegex =
    /background-color:\s*(#[a-fA-F0-9]{6}|#[a-fA-F0-9]{3}|[a-zA-Z]+)/
  const bgColorMatch = result.match(bgColorRegex)
  const bgColor = bgColorMatch ? bgColorMatch[1] : 'transparent'

  const lines = code.split('\n')
  const lineNumbers = Array.from({ length: lines.length }, (_, i) => i + 1)

  var highlightedCodeWithLineNumbers: string = ''
  if (lineNumber) {
    highlightedCodeWithLineNumbers = result
      .split('\n')
      .map(
        (line: number, index: number) =>
          `<div class="flex"><span class="mr-2 text-gray-400">${lineNumbers[index]}</span>${line}</div>`,
      )
      .join('\n')
  } else {
    highlightedCodeWithLineNumbers = result
  }

  return `<div class="p-5 text-left" style="background-color: ${bgColor};">${highlightedCodeWithLineNumbers}</div>`
}

export default renderCode
