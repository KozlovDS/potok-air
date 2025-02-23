import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonProductCard() {
  return (
    <div>
      <Skeleton className="h-10 w-[250px] mb-6" />
      <div className="grid grid-cols-1 gap-x-6 gap-y-10 tablet:grid-cols-2 tablet:gap-x-8 laptop:grid-cols-3">
        <div className="group flex flex-col bg-white rounded-xl p-8">
          <Skeleton className="h-[140px] w-full rounded-xl" />
          <Skeleton className="mt-4 h-5 w-4/5" />
          <Skeleton className="mt-2 h-6 w-1/5" />
        </div>
        <div className="group flex flex-col bg-white rounded-xl p-8">
          <Skeleton className="h-[140px] w-full rounded-xl" />
          <Skeleton className="mt-4 h-5 w-4/5" />
          <Skeleton className="mt-2 h-6 w-1/5" />
        </div>
        <div className="group flex flex-col bg-white rounded-xl p-8">
          <Skeleton className="h-[140px] w-full rounded-xl" />
          <Skeleton className="mt-4 h-5 w-4/5" />
          <Skeleton className="mt-2 h-6 w-1/5" />
        </div>
        <div className="group flex flex-col bg-white rounded-xl p-8">
          <Skeleton className="h-[140px] w-full rounded-xl" />
          <Skeleton className="mt-4 h-5 w-4/5" />
          <Skeleton className="mt-2 h-6 w-1/5" />
        </div>
        <div className="group flex flex-col bg-white rounded-xl p-8">
          <Skeleton className="h-[140px] w-full rounded-xl" />
          <Skeleton className="mt-4 h-5 w-4/5" />
          <Skeleton className="mt-2 h-6 w-1/5" />
        </div>
      </div>
    </div>
  );
}
