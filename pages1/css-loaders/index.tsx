import { projectMeta } from '@/common/constants'
import {
  DEFAULT_SETTINGS,
  LOADER,
  LOADER_PARAMS,
} from '@/common/loaders-constants'
import ProjectLayout from '@/components/projects/ProjectLayout'
import LoaderLoop from '@/components/projects/css-loaders/Loader'
import CustomizeLoader from '@/components/projects/css-loaders/CustomizeLoader'
import LoaderModel from '@/components/projects/css-loaders/LoaderModel'
import { LoaderType } from '@/types/css-loaders.model'
import { useRouter } from 'next/router'

// const CustomizeLoader = lazy(
//   () => import('@/components/projects/css-loaders/CustomizeLoader'),
// )

export default function CSSLoaders({ loaders }: { loaders: LoaderType[] }) {
  const router = useRouter()
  const {
    size = DEFAULT_SETTINGS.size,
    border = DEFAULT_SETTINGS.border,
    speed = DEFAULT_SETTINGS.speed,
    primaryColor = '570df8',
    secondaryColor = 'd8dde4',
    sourceCode = 'false',
  }: any = router.query

  const state = {
    size,
    speed,
    border,
    primaryColor,
    secondaryColor,
    sourceCode,
  }

  const { loaderId } = router.query

  const onClose = () => {}

  return (
    <ProjectLayout
      // title={projectMeta.CSSLoaders.title}
      // description={projectMeta.CSSLoaders.description}
    >
      <section>
        <article className="prose lg:prose-md  prose-h1:leading-none  prose-h1:mb-0  text-center max-w-full">
          <div className="max-w-[900px] mx-auto w-full  ">
            <div className="flex justify-center gap-1 items-center">
              <h1 className="antialiased ">CSS Loaders Gallery</h1>
            </div>

            <p>
              Enhance User Experience and Aesthetics with Our Range of Creative
              CSS Loaders for Seamless Loading Animations
            </p>
          </div>
          📌 To bookmark this page, simply press{' '}
          <kbd className="kbd">Ctrl+D</kbd>.
          <br />
          <br />
          {/* <Suspense fallback="Loadiing"> */}
          {/* <CustomizeLoader /> */}
          {/* </Suspense> */}
          <br />
          <br />
          {/* <AnimatePresence> */}
          {loaderId && <LoaderModel state={state} onClose={onClose} />}
          {/* </AnimatePresence> */}
          <div className="transition-all grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full  mx-auto ">
            {loaders.map(item => (
              <LoaderLoop
                key={item.id}
                html={item.html}
                id={item.id}
                css={item.css}
                href={`/css-loaders/?loaderId=${item.id}&${LOADER_PARAMS(
                  state,
                )}`}
                as={`/css-loaders/${item.id}?${LOADER_PARAMS(state)}`}
              />
            ))}
          </div>
        </article>
      </section>
      <br />
      <br />
    </ProjectLayout>
  )
}

export async function getStaticProps() {
  const response = LOADER
  return {
    props: {
      loaders: response,
    },
  }
}
