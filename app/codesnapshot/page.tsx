import CodeSnapShot from '@/components/projects/codesnapshot'
import React from 'react'
import ProjectLayout from '@/components/projects/ProjectLayout'
import { Metadata } from 'next'
import { projectMeta } from '@/common/constants'

export const metadata: Metadata = {
  title: projectMeta.codesnapshot.title,
  description: projectMeta.codesnapshot.description,
  openGraph: {
    title: projectMeta.codesnapshot.title,
    description: projectMeta.codesnapshot.description,
  },
}

const page = () => {
  return (
    <ProjectLayout>
      <CodeSnapShot />
    </ProjectLayout>
  )
}

export default page
