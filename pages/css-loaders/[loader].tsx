import type { GetStaticProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import Carousel from '@/components/projects/css-loaders/Carousel'
import { LOADER } from '@/common/constants'

export default function Loader({ loaderElement }: any) {
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

export const getStaticProps: GetStaticProps = async (context: any) => {
  const currentLoader = LOADER.find(
    item => item.id === Number(context.params.loader),
  )

  return {
    props: {
      loaderElement: currentLoader,
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
