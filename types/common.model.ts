import { StaticImageData } from 'next/image'

export interface RelatedProjectMetaType {
  title: string
  description: string
  path: string
  icon: (val?: string) => React.ReactElement
  className: string
  img: StaticImageData
}

export interface RelatedProjectsType {
  passwordGenerator: RelatedProjectMetaType
  passwordValidator: RelatedProjectMetaType
  CSSLoaders: RelatedProjectMetaType
  quotes: RelatedProjectMetaType
  basicCalculator: RelatedProjectMetaType
}

export interface PageProps<PData, SData> {
  params: PData
  searchParams: SData
}
