import ProjectLayout from '@/components/projects/ProjectLayout'
import SingleLoader from '@/components/projects/css-loaders/SingleLoader'
import { getAllLoaders, getLoader } from '@/services/loaders'
import { type PageProps } from '@/types/common.model'
import { LoaderType } from '@/types/css-loaders.model'
function getNextThree(options: LoaderType[], currentId: number): LoaderType[] {
  // Find the index of the current loader in the array
  const currentIndex = options.findIndex(loader => loader.id === currentId)

  // Get the next three loaders, wrapping around if necessary
  const nextLoaders: LoaderType[] = []
  for (let i = 1; i <= 4; i++) {
    const nextIndex: number = (currentIndex + i) % options.length
    nextLoaders.push(options[nextIndex])
  }

  return nextLoaders
}

const page = async (props: PageProps<any, any>) => {
  const searchParams = await props.searchParams
  const params = await props.params
  const index = Number(params.loader)
  const response = await getLoader(index)
  const loadersResponse = await getAllLoaders()
  const loaders = getNextThree(loadersResponse.loaders, index)
  const element = response.loader

  return (
    <ProjectLayout className="py-0 px-1">
      <SingleLoader
        index={index}
        state={searchParams}
        element={element}
        loaders={loaders}
      />
    </ProjectLayout>
  )
}

export default page
