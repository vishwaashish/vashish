import { projectMeta } from '@/common/constants'
import Container from '@/components/shared/Container'
import { HeadPara } from '@/components/shared/Heading'
import { RelatedProjectMetaType } from '@/types/common.model'
import Image from 'next/image'
import Link from 'next/link'
import { QuoteCards } from '../quotes/StyledComponent'

const RelatedProject = () => {
  return (
    <section>
      <Container className="pt-0">
        <HeadPara title="Explore More Tools" titleDelay={0.19}></HeadPara>
        <QuoteCards delay={0.29} className="max-w-[900px] grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
          {Object.values(projectMeta).map((item: RelatedProjectMetaType) => (
            <Link
              href={item.path}
              key={item.title}
              className="after:content group relative"
            >
              <Image
                className="rounded-2xl transform brightness-90 transition will-change-auto group-hover:brightness-110 "
                src={item.img}
                sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, (max-width: 1536px) 33vw, 25vw"
                alt={item.title}
              />
              <h3 className="font-semibold mt-3 text-md"> {item.title}</h3>
            </Link>
          ))}
        </QuoteCards>
      </Container>
    </section>
  )
}

export default RelatedProject
