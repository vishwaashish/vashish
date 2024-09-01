import { BundledLanguage, BundledTheme } from 'shiki/bundle/web'

// Memoize themes and languages once to avoid recomputation
let highlighterPromise: Promise<any> | null = null
let memoizedThemes: string[] | null = null
let memoizedLanguages: string[] | null = null

async function getHighlighterInstance() {
  if (!highlighterPromise) {
    const { createHighlighter, bundledThemes, bundledLanguages } = await import(
      'shiki/bundle/web'
    )

    // Memoize themes and languages
    memoizedThemes = memoizedThemes || Object.keys(bundledThemes)
    memoizedLanguages = memoizedLanguages || Object.keys(bundledLanguages)

    highlighterPromise = createHighlighter({
      themes: memoizedThemes,
      langs: memoizedLanguages,
    })
  }
  return highlighterPromise
}

export async function renderCode(
  code = '',
  lang: BundledLanguage = 'javascript',
  theme: BundledTheme = 'dark-plus',
): Promise<string | null> {
  try {
    const highlighter = await getHighlighterInstance()
    return highlighter ? highlighter.codeToHtml(code, { lang, theme }) : null
  } catch (error) {
    console.error('Error rendering code:', error)
    return null
  }
}

export default renderCode
