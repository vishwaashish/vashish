import { projectMeta } from '@/common/constants'
import ProjectLayout from '@/components/projects/ProjectLayout'
import Calculator from '@/components/projects/calculator'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: projectMeta.basicCalculator.title,
  description: projectMeta.basicCalculator.description,
  openGraph: {
    title: projectMeta.basicCalculator.title,
    description: projectMeta.basicCalculator.description,
  },
}

const page = () => {
  return (
    <ProjectLayout>
      <Calculator />
    </ProjectLayout>
  )
}

export default page
