export interface LoaderSizeType {
  size: number
  label: string
  title: string
}

export interface ILoaderParams {
  size: string
  primaryColor: string
  secondaryColor: string
  border: string
  speed: string
  sourceCode: string
}

export interface LoaderType {
  id: number
  html: string
  css: string
}

// export type InputSizeType = "btn-sm" | "btn-md" | "btn-lg"
export type InputSizeType = 'sm' | 'default' | 'lg'

export interface ILoadersResponse<T> {
  loaders: T
}
export interface ILoaderResponse<T> {
  loader: T
}
