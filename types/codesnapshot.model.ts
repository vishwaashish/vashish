import { BundledLanguage, BundledTheme } from "shiki/bundle/web"

export interface ICodeSnapShort {
  code: string
  programmingLanguage: BundledLanguage
  theme: BundledTheme
  highlightedCode: string
  showLineNumbers: boolean
  showInfiniteView: boolean
  showSettings: boolean
  showHeader: boolean
  lineNumberCode: string
  editorContainer: IEditorContainer
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

export type TExportOption = "copy" | "png" | "jpg" | "svg"
