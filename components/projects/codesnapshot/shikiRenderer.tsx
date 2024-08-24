import {
    bundledLanguages,
    bundledThemes,
    getHighlighter,
} from "shiki/bundle/web";

let highlighterPromise: any = null;

function getHighlighterInstance() {
    if (!highlighterPromise) {
        highlighterPromise = getHighlighter({
            themes: Object.keys(bundledThemes),
            langs: Object.keys(bundledLanguages),
        });
    }
    return highlighterPromise;
}

export async function renderCode(
    code = "",
    lang = "javascript",
    theme = "dark-plus",
) {
    const highlighter = await getHighlighterInstance();
    if (!highlighter) return null;
    const result = await highlighter.codeToHtml(code, { lang, theme });
    return result;
}

export default renderCode;
