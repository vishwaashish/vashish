import { StaticImageData } from 'next/image'

export interface RelatedProjectMetaType {
  title: string
  description: string
  path: string
  icon: (val?: string) => React.ReactElement
  className: string
  img: StaticImageData
  target: '_blank' | '_self'
}

// export interface RelatedProjectsType {
//   passwordGenerator: RelatedProjectMetaType
//   passwordValidator: RelatedProjectMetaType
//   CSSLoaders: RelatedProjectMetaType
//   quotes: RelatedProjectMetaType
//   basicCalculator: RelatedProjectMetaType
// }

export type RelatedProjectsType = { [key: string]: RelatedProjectMetaType }

export interface PageProps<PData, SData> {
  params: PData
  searchParams: SData
}
