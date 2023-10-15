import { projectMeta } from '@/common/constants'
import ProjectLayout from '@/components/projects/ProjectLayout'
import ValidatePassword from '@/components/projects/password/passwordValidator'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: projectMeta.passwordValidator.title,
  description: projectMeta.passwordValidator.description,
  openGraph: {
    title: projectMeta.passwordValidator.title,
    description: projectMeta.passwordValidator.description,
  },
}

export default function PasswordGenerator() {
  return (
    <ProjectLayout>
      <ValidatePassword />
    </ProjectLayout>
  )
}
