'use client'
import React, { FC, memo } from 'react'
import RelatedStyle1 from './related/RelatedStyle1'
import InsertHead from '../shared/InsertHead'
import Header from '../header'
import Container from '../shared/Container'

interface ProjectLayout {
  children: React.ReactNode
  // title: string
  // description: string
  className?: string
}
const ProjectLayout: FC<ProjectLayout> = ({
  // title,
  // description,
  className,
  children,
}) => {
  return (
    <>
      {/* <InsertHead title={title} description={description} /> */}
      <Header />
      <Container className={className}>{children}</Container>
      <RelatedStyle1 />
    </>
  )
}

export default memo(ProjectLayout)
