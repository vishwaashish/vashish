import { projectMeta } from '@/common/constants'
import Container from '@/components/shared/Container'
import { HeadPara } from '@/components/shared/Heading'
import { type RelatedProjectMetaType } from '@/types/common.model'
import Image from 'next/image'
import Link from 'next/link'
import { QuoteCards } from '../quotes/StyledComponent'
import { GlareCard } from '@/components/ui/glare-card'

const RelatedProject = ({
  type = 'all',
}: {
  type?: 'tool' | 'project' | 'all'
}) => {
  const projects =
    type !== 'all'
      ? Object.values(projectMeta).filter(item => item.type === type)
      : Object.values(projectMeta)
  return (
    <section>
      <Container className="py-0">
        <HeadPara
          title={`Explore More ${type === 'tool' ? 'Tools' : 'Projects'}`}
          titleDelay={0.19}
        ></HeadPara>

        <QuoteCards
          delay={0.29}
          className=" grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4"
        >
          {projects.map((item: RelatedProjectMetaType, index: number) => (
            <Link
              href={item.path}
              className="after:content group relative"
              target={item.target}
              key={item.title}
            >
              <GlareCard
                containerClassName="rounded-3xl"
                className="transform brightness-90 transition will-change-auto rounded-3xl overflow-hidden group-hover:brightness-100"
              >
                <Image
                  className=" "
                  src={item.img}
                  width={300}
                  height={300}
                  sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, (max-width: 1536px) 33vw, 25vw"
                  alt={'Project' + index}
                />
              </GlareCard>
              <p className="font-semibold mt-3 text-sm md:text-md">
                {item.title}
              </p>
            </Link>
          ))}
        </QuoteCards>
      </Container>
    </section>
  )
}

export default RelatedProject
