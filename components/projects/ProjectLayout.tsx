'use client'
import { type FC } from 'react'
import type React from 'react'
import { memo } from 'react'
import Header from '../header'
import Container from '../shared/Container'
import dynamic from 'next/dynamic'

import back1 from '@/assets/images/back1.png'
import Image from 'next/image'

const RelatedProject = dynamic(
  async () => import('@/components/projects/related/RelatedProject'),
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
      <Image
        fill
        objectFit="contain"
        src={back1.src}
        style={{
          zIndex: -1,
          opacity: 0.4,
          filter: 'blur(0.5px)',
        }}
        alt="sdd"
      />

      <Header />

      <Container className={className}>{children}</Container>
      <br />
      <RelatedProject type="tool" />
      <RelatedProject type="project" />
    </>
  )
}

export default memo(ProjectLayout)
