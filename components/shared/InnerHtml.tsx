import { type FC } from 'react'

interface InsertHtml {
  html: string
  css?: string
}
const InnerHTML: FC<InsertHtml> = ({ html, css = '' }) => (
  <>
    {css && <style type="text/css">{css}</style>}
    <span dangerouslySetInnerHTML={{ __html: html }} />
  </>
)

export default InnerHTML
