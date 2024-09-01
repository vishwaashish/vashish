import CodeSnapShot from '@/components/projects/codesnapshot'
import React from 'react'
import ProjectLayout from '@/components/projects/ProjectLayout'
import { type Metadata } from 'next'
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
    <ProjectLayout className='!max-w-screen-2xl'>
      <CodeSnapShot />
    </ProjectLayout>
  )
}

export default page
