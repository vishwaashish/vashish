import { BundledLanguage, BundledTheme } from 'shiki/bundle/web'

export interface ICodeSnapShort {
  code: string
  programmingLanguage: BundledLanguage
  theme: BundledTheme
  highlightedCode: string
  showLineNumbers: boolean
  showInfiniteView: boolean
  showSettings: boolean
  showHeader: boolean
  // lineNumberCode: string
  editorContainer: IEditorContainer
  formatOptions: IFormatOptions
  isFormatCode: boolean
}

export interface IFormatOptions {
  semi: boolean
  singleQuote: boolean
  tabWidth: number
  trailingComma: 'none' | 'es5' | 'all'
  bracketSpacing: boolean
  jsxBracketSameLine: boolean
  printWidth: number
  arrowParens: 'always' | 'avoid'
  htmlWhitespaceSensitivity: 'css' | 'strict' | 'ignore'
}

export interface IEditorContainer {
  backgroundColor: string
  backgroundImage: string
  label: string
  padding: number
  borderRadius: number
  editor: IEditorStyle
}

export interface IEditorStyle {
  headerColor: string
  backgroundColor: string
  color: string
}

export interface IEditorBackgroundConstant {
  label: string
  backgroundColor: string
  backgroundImage: string
}

export type TExportOption = 'copy' | 'png' | 'jpg' | 'svg'
