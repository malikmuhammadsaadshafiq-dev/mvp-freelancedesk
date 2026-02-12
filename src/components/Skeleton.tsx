'use client'

export function SkeletonCard() {
  return (
    <div className="bg-white border-b-2 border-gray-200 pb-6 p-4">
      <div className="skeleton h-8 w-3/4 mb-4 rounded" />
      <div className="skeleton h-4 w-1/2 mb-6 rounded" />
      <div className="skeleton h-2 w-full mb-2 rounded" />
      <div className="flex gap-4 mt-4">
        <div className="skeleton h-10 flex-1 rounded" />
        <div className="skeleton h-10 w-20 rounded" />
      </div>
    </div>
  )
}

export function SkeletonStats() {
  return (
    <div className="bg-white border-b-2 border-gray-200 p-6">
      <div className="skeleton h-4 w-24 mb-2 rounded" />
      <div className="skeleton h-8 w-32 rounded" />
    </div>
  )
}