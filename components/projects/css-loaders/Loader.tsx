import { cn } from '@/components/utils'
import React from 'react'

const Loader = ({ css = '', html = '' }: { html: string; css: string }) => {
  return (
    <>
      {/* // <sectionS
    //   key={`loaders${element.id}`}
    //   className={cn('flex items-center justify-center', className)}
      // className="aspect-video w-full flex justify-center items-center card  shadow-base-200 hover:bg-base-200 border border-base-300"
      // onClick={click(item)}
      //   style={{
      //     boxShadow:
      //       'inset rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px',
      //   }}
    // > */}
      <style type="text/css">{css}</style>
      <span dangerouslySetInnerHTML={{ __html: html }} />
    </>
  )
}

export default Loader
