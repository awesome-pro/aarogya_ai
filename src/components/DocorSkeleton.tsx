import { Skeleton } from "@/components/ui/skeleton"

export default function DoctorSkeleton() {
  return (
    <div className="flex items-center space-x-4 px-8 py-6 border-2 border-neutral-600 m-4 w-[600px] rounded-xl">
      <Skeleton className="h-32 w-32 rounded-full" />
      <div className="space-y-2 ">
        <Skeleton className="h-4 w-[350px] "/>
        <Skeleton className="h-4 w-[350px] "/>
        <Skeleton className="h-4 w-[300px] " />
      </div>
    </div>
  )
}
