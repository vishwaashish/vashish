'use client'
import { HeadPara } from '@/components/shared/Heading'
import { transition } from '@/components/utils/animation'
import { motion } from 'framer-motion'
import dynamic from 'next/dynamic'

const EditorContainer = dynamic(async () => import('./EditorContainer'), {
  loading: () => (
    <div className="flex justify-center flex-wrap animate-pulse gap-3 bg-muted w-full h-60 rounded-lg"></div>
  ),
})
const EditorFilterOptions = dynamic(
  async () => import('./EditorFilterOptions'),
  {
    loading: () => (
      <div className="flex justify-center flex-wrap border border-input h-full rounded-lg p-3 animate-pulse gap-3">
        <div className=" bg-muted w-full h-12 rounded-lg"></div>
        <div className=" bg-muted w-full h-12 rounded-lg "></div>
        <div className=" bg-muted w-full h-12 rounded-lg "></div>
        <div className=" bg-muted w-full h-12 rounded-lg "></div>
        <div className=" bg-muted w-full h-12 rounded-lg "></div>
        <div className=" bg-muted w-full h-12 rounded-lg "></div>
        <div className=" bg-muted w-full h-12 rounded-lg "></div>
        <div className=" bg-muted w-full h-12 rounded-lg "></div>
      </div>
    ),
  },
)
function CodeSnapShot() {
  return (
    <>
      <HeadPara
        title="Code Snapshot"
        className="prose lg:prose-md max-w-screen-xl min-w-min prose-h1:leading-none   prose-h1:mb-0  text-center  pb-8"
        titleDelay={0.1}
      >
        <motion.p {...transition(0.2)}>
          CodeSnapshot offers seamless customization for your code snippets.
          Easily adjust styling elements such as padding, font size, and color
          to suit your preferences. Export your customized code as high-quality
          images in JPG, PNG, and other formats. Perfect for showcasing your
          code in presentations, documentation, and social media posts.
        </motion.p>
        <motion.p {...transition(0.3)}>
          📌 To bookmark this page, simply press{' '}
          <kbd className="kbd">Ctrl+D</kbd>.
        </motion.p>
      </HeadPara>
      <motion.div
        className="grid lg:grid-cols-8 gap-5 w-full"
        {...transition(0.4)}
      >
        <div className="lg:max-w-lg lg:col-span-2">
          <EditorFilterOptions />
        </div>
        <div className="lg:col-span-6">
          <EditorContainer />
        </div>
      </motion.div>
    </>
  )
}

export default CodeSnapShot
