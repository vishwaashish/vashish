export interface ICodeSnapShort {
  code: string
  language: string
  themes: string
  highlightedCode: string
  lineNumber: boolean
  editorPadding: number
  editorSetting: boolean
  editorBackground: IBackground
  editorHeader: boolean
  editorRadius: number
}

export interface IBackground {
  backgroundColor: string
  backgroundImage: string
  label: string
}
