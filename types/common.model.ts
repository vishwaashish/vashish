export interface RelatedProjectMetaType {
  title: string
  description: string
  path: string
  icon: (val?: string) => React.ReactElement
  className: string
}

export interface RelatedProjectsType {
  passwordGenerator: RelatedProjectMetaType
  passwordValidator: RelatedProjectMetaType
  CSSLoaders: RelatedProjectMetaType
}

