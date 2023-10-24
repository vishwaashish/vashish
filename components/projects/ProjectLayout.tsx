'use client'
import React, { FC, memo } from 'react'
import Header from '../header'
import Container from '../shared/Container'
import dynamic from 'next/dynamic'

const RelatedProject = dynamic(
  () => import('@/components/projects/related/RelatedProject'),
  {
    ssr: false,
  },
)

interface ProjectLayout {
  children: React.ReactNode
  className?: string
}

const ProjectLayout: FC<ProjectLayout> = ({ className, children }) => {
  return (
    <>
      <Header />
      <Container className={className}>{children}</Container>
      <br />
      <RelatedProject />
    </>
  )
}

export default memo(ProjectLayout)
