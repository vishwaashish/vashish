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
  editorlineNumberCode: string
  editorStyle: IEditorStyle
}

export interface IBackground {
  backgroundColor: string
  backgroundImage: string
  label: string
}

export interface IEditorStyle {
  headerColor: string
  backgroundColor: string
  height: number
  width: number
}
