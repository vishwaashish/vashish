import type { GetStaticProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import Carousel from '@/components/projects/css-loaders/Carousel'
import { LOADER } from '@/common/loaders-constants'
import { LoaderType } from '@/types/css-loaders.model'
import { FC } from 'react'

interface Loader {
  loaderElement: LoaderType
}

const Loader: FC<Loader> = ({ loaderElement }: any) => {
  const router = useRouter()
  const { loader } = router.query
  let index = Number(loader)
  return (
    <>
      <main className="mx-auto max-w-[1960px] p-4">
        <Carousel element={loaderElement} index={index} />
      </main>
    </>
  )
}

export default Loader

export const getStaticProps: GetStaticProps = async (context: any) => {
  const currentLoader = LOADER.find(
    item => item.id === Number(context.params.loader),
  )

  if (!currentLoader) {
    return {
      notFound: true, // Indicate that the page should return a 404
    }
  }

  return {
    props: {
      loaderElement: currentLoader ?? {},
    },
  }
}

export async function getStaticPaths() {
  const fullPaths = LOADER.map(item => ({
    params: { loader: item.id.toString() },
  }))

  return {
    paths: fullPaths,
    fallback: false,
  }
}
