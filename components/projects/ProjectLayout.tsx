import React, { FC, memo } from 'react'
import RelatedStyle1 from './related/RelatedStyle1'
import InsertHead from '../shared/InsertHead'
import Header from '../header'

interface ProjectLayout {
  children: React.ReactNode
  title: string
  description: string
}
const ProjectLayout: FC<ProjectLayout> = ({ title, description, children }) => {
  return (
    <>
      <InsertHead title={title} description={description} />
      <Header />

      {children}
      <RelatedStyle1 />
    </>
  )
}

export default memo(ProjectLayout)
