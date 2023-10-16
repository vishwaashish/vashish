import { projectMeta } from '@/common/constants'
import ProjectLayout from '@/components/projects/ProjectLayout'
import GeneratePassword from '@/components/projects/password/passwordGenerator'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: projectMeta.passwordGenerator.title,
  description: projectMeta.passwordGenerator.description,
  openGraph: {
    title: projectMeta.passwordGenerator.title,
    description: projectMeta.passwordGenerator.description,
  },
}

export default function PasswordGenerator() {
  return (
    <ProjectLayout>
      <GeneratePassword />
    </ProjectLayout>
  )
}
