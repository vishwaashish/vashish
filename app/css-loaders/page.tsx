import { projectMeta } from '@/common/constants'
import ProjectLayout from '@/components/projects/ProjectLayout'
import CSSLoaders from '@/components/projects/css-loaders'
import { getAllLoaders } from '@/services/loaders'
import { PageProps } from '@/types/common.model'
import { Metadata } from 'next'

// const CustomizeLoader = lazy(
//   () => import('@/components/projects/css-loaders/CustomizeLoader'),
// )

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
  console.log('params', params)
  console.log('searchParams', searchParams)
  const response = await getAllLoaders()
  const loaders = response.loaders

  // const loaders: LoaderType[] = []
  // { loaders }: { loaders: LoaderType[] }
  // const router = useRouter()
  // const {
  //   size = DEFAULT_SETTINGS.size,
  //   border = DEFAULT_SETTINGS.border,
  //   speed = DEFAULT_SETTINGS.speed,
  //   primaryColor = '570df8',
  //   secondaryColor = 'd8dde4',
  //   sourceCode = 'false',
  // }: any = router.query

  // const state = {
  //   size,
  //   speed,
  //   border,
  //   primaryColor,
  //   secondaryColor,
  //   sourceCode,
  // }

  // const { loaderId } = router.query

  // const onClose = () => {}

  return (
    <ProjectLayout
    // title={projectMeta.CSSLoaders.title}
    // description={projectMeta.CSSLoaders.description}
    >
      <CSSLoaders loaders={loaders} query={searchParams} />
    </ProjectLayout>
  )
}

// export async function getStaticProps() {
//   const response = LOADER
//   return {
//     props: {
//       loaders: response,
//     },
//   }
// }
