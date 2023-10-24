import { projectMeta } from '@/common/constants'
import ProjectLayout from '@/components/projects/ProjectLayout'
import BasicCalculator from '@/components/projects/calculator/BasicCalculator'
import { HeadPara } from '@/components/shared/Heading'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: projectMeta.basicCalculator.title,
  description: projectMeta.basicCalculator.description,
  openGraph: {
    title: projectMeta.basicCalculator.title,
    description: projectMeta.basicCalculator.description,
  },
}

const page = () => {
  return (
    <ProjectLayout>
      <HeadPara
        title="Free Online Basic Calculator"
        description={`Perform simple arithmetic calculations quickly and easily with our free online basic calculator. Add, subtract, multiply, and divide with just a few clicks. It's a handy tool for everyday math tasks. Give it a try now!`}
        titleDelay={0.19}
        descriptionDelay={0.29}
      >
        <BasicCalculator />
      </HeadPara>
    </ProjectLayout>
  )
}

export default page
