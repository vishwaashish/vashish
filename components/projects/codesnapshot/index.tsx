'use client'
import { HeadPara } from '@/components/shared/Heading'
import { transition } from '@/components/utils/animation'
import { motion } from 'framer-motion'
import dynamic from 'next/dynamic'
const EditorSetting = dynamic(async () => import('./EditorSetting'), {
  loading: () => (
    <div className="flex justify-center flex-wrap animate-pulse gap-3">
      <div className=" bg-base-200 w-28 h-12 rounded-lg"></div>
      <div className=" bg-base-200 w-28 h-12 rounded-lg "></div>
      <div className=" bg-base-200 w-28 h-12 rounded-lg "></div>
      <div className=" bg-base-200 w-28 h-12 rounded-lg "></div>
    </div>
  ),
})
const EditorContainer = dynamic(async () => import('./EditorContainer'), {
  loading: () => (
    <div className="flex justify-center flex-wrap animate-pulse gap-3 bg-base-200 w-full h-60 rounded-lg"></div>
  ),
})
const EditorFilterOptions = dynamic(
  async () => import('./EditorFilterOptions'),
  {
    loading: () => (
      <div className="flex justify-center flex-wrap animate-pulse gap-3">
        <div className=" bg-base-200 w-28 h-12 rounded-lg"></div>
        <div className=" bg-base-200 w-28 h-12 rounded-lg "></div>
        <div className=" bg-base-200 w-28 h-12 rounded-lg "></div>
        <div className=" bg-base-200 w-28 h-12 rounded-lg "></div>
      </div>
    ),
  },
)
function CodeSnapShot() {
  return (
    <HeadPara
      title="Code Snapshot"
      className="prose lg:prose-md  prose-h1:leading-none  prose-h1:mb-0  text-center max-w-full min-h-[75vh]"
      titleDelay={0.1}
    >
      <motion.p {...transition(0.2)}>
        CodeSnapshot offers seamless customization for your code snippets.
        Easily adjust styling elements such as padding, font size, and color to
        suit your preferences. Export your customized code as high-quality
        images in JPG, PNG, and other formats. Perfect for showcasing your code
        in presentations, documentation, and social media posts.
      </motion.p>
      <motion.p {...transition(0.3)}>
        📌 To bookmark this page, simply press <kbd className="kbd">Ctrl+D</kbd>
        .
      </motion.p>

      <motion.div className="flex flex-col gap-5" {...transition(0.4)}>
        <EditorFilterOptions />
        <EditorSetting />
        <EditorContainer />
      </motion.div>
    </HeadPara>
  )
}

export default CodeSnapShot
