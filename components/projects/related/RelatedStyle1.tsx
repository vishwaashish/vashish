import { projectMeta } from '@/common/constants'
import { cn } from '@/components/utils'
import { RelatedProjectMetaType } from '@/types/common.model'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'

const RelatedStyle1 = () => {
  const router = useRouter()
  const relatedArray: RelatedProjectMetaType[] = Object.values(
    projectMeta,
  ).filter(val => !router.pathname.includes(val.path))
  const click = (item: string) => () => {
    router.push('/' + item)
  }
  return (
    <section className="bg-base-200">
      <div className=" prose prose-headings:m-0 py-12 max-w-[900px] mx-auto w-full ">
        <h3 className="text-center">More Projects</h3>
        <div className="divider max-w-sm mx-auto"></div>
        <br />
        <div className=" relative mx-auto flex lg:gap-4 flex-wrap  ">
          {relatedArray.map(item => (
            <section
              className="transition-all group/item group/edit flex flex-col md:flex-row gap-5 flex-[1_1_350px] px-4 py-4 md:rounded hover:bg-base-100 hover:cursor-pointer no-underline"
              key={item.title}
              onClick={click(item.path)}
            >
              <div className="">
                {item.icon(
                  'transition-all h-10 w-10 shrink-0 p-2 rounded-lg shadow-md shadow-indigo-500/[.12] group-hover/edit:scale-105',
                )}
              </div>
              <div className="">
                <h2 className="text-sm font-semibold leading-6 ">
                  {item.title}
                </h2>
                <p className="mt-2 mb-0 text-sm leading-6 ">
                  {item.description}
                </p>
              </div>
            </section>
          ))}
        </div>
      </div>
    </section>
  )
}

export default RelatedStyle1
