import {
    bundledLanguages,
    bundledThemes,
    getHighlighter,
} from 'shiki/bundle/web'

async function renderCode(code = '', lang = 'javascript', theme = 'dark-plus') {
  console.log({
    lang,
    lan: Object.keys(bundledLanguages),
    has: Object.keys(bundledLanguages).find((l) => l === lang),
  })

  try {
    const highlighter = await getHighlighter({
      themes: Object.keys(bundledThemes),
      langs: Object.keys(bundledLanguages),
    })
    const result = await highlighter.codeToHtml(String(code).trim(), {
      lang: lang || 'javascript',
      theme: theme || 'dark-plus',
    })

    const bgColorRegex =
      /background-color:\s*(#[a-fA-F0-9]{6}|#[a-fA-F0-9]{3}|[a-zA-Z]+)/
    const bgColorMatch = result.match(bgColorRegex)
    const bgColor = bgColorMatch ? bgColorMatch[1] : 'transparent'

    // Add line numbers
    const lines = code.split('\n')
    const lineNumbers = Array.from({ length: lines.length }, (_, i) => i + 1)

    const highlightedCodeWithLineNumbers = result
      .split('\n')
      .map((line, index) => {
        return `<div class="line flex"><span class="line-number mr-2 text-gray-400">${lineNumbers[index]}</span>${line}</div>`
      })
      .join('\n')
    console.log(bgColor, 'highlightedCodeWithLineNumbers')
    return `<div class="code-container leading-3  p-4" style="background-color: ${bgColor};">${highlightedCodeWithLineNumbers}</div>`
  } catch (e) {
    throw Error('Somethting went wrong')
  }
  // Add line numbers
  // const lines = code.split("\n");
  // const lineNumbers = Array.from({ length: lines.length }, (_, i) => i + 1);

  // const highlightedCodeWithLineNumbers = result
  //   .split("\n")
  //   .map((line, index) => {
  //     return `<div class="flex flex-row"><span class="p-[0 10px] text-[#777]">${lineNumbers[index]}</span>${line}</div>`;
  //   })
  //   .join("\n");
  //return result;
  //return `<div class="flex flex-row">${highlightedCodeWithLineNumbers}</div>`;
}

export default renderCode
