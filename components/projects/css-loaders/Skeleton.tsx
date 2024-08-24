import React from 'react'

export const CustomizeSkeleton = () => {
  return (
    <div className="w-full grid gap-4 max-w-[1000px] grid-cols-2 md:grid-cols-6 mx-auto">
      <div className="flex gap-2 flex-col h-14">
        <div className="bg-muted w-full h-5 animate-pulse rounded-lg"></div>
        <div className="bg-muted w-full h-full  animate-pulse rounded-lg"></div>
      </div>
      <div className="flex gap-2 flex-col h-14">
        <div className="bg-muted w-full h-5 animate-pulse rounded-lg"></div>
        <div className="bg-muted w-full h-full  animate-pulse rounded-lg"></div>
      </div>
      <div className="flex gap-2 flex-col h-14">
        <div className="bg-muted w-full h-5 animate-pulse rounded-lg"></div>
        <div className="bg-muted w-full h-full  animate-pulse rounded-lg"></div>
      </div>
      <div className="flex gap-2 flex-col h-14">
        <div className="bg-muted w-full h-5 animate-pulse rounded-lg"></div>
        <div className="bg-muted w-full h-full  animate-pulse rounded-lg"></div>
      </div>
      <div className="flex gap-2 flex-col h-14">
        <div className="bg-muted w-full h-5 animate-pulse rounded-lg"></div>
        <div className="bg-muted w-full h-full  animate-pulse rounded-lg"></div>
      </div>
      <div className="flex gap-2 flex-col h-14">
        <div className="bg-muted w-full h-5 animate-pulse rounded-lg"></div>
        <div className="bg-muted w-full h-full  animate-pulse rounded-lg"></div>
      </div>
    </div>
  )
}
