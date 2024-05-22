import React from 'react'
import { Skeleton } from './ui/skeleton'

function ProfileSkeleton() {
  return (
    <div className='flex flex-col gap-2 items-center justify-center w-2/3'>
        
        <div className='flex w-full gap-4 items-center justify-between mb-6'>
            <Skeleton className="size-60 rounded-full" />
            
        </div>

        <div className='flex flex-col gap-2 w-full'>
            <Skeleton className="h-5" />
            <Skeleton className="h-5" />
            <Skeleton className="h-5" />
        </div>
    </div>
  )
}

export default ProfileSkeleton