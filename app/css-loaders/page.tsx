import { projectMeta } from '@/common/constants'
import ProjectLayout from '@/components/projects/ProjectLayout'
import CSSLoaders from '@/components/projects/css-loaders'
import { getAllLoaders } from '@/services/loaders'
import { PageProps } from '@/types/common.model'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: projectMeta.CSSLoaders.title,
  description: projectMeta.CSSLoaders.description,
  openGraph: {
    title: projectMeta.CSSLoaders.title,
    description: projectMeta.CSSLoaders.description,
  },
}

export default async function page({
  params,
  searchParams,
}: PageProps<any, any>) {
  const response = await getAllLoaders()
  const loaders = response.loaders

  return (
    <ProjectLayout>
      <CSSLoaders loaders={loaders} query={searchParams} />
    </ProjectLayout>
  )
}
