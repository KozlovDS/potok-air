import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonSidebar() {
  return (
    <>
      <Skeleton className="h-8 w-2/3 mb-6" />
      <Skeleton className="h-6 w-1/3 mb-5" />
      <Skeleton className="h-6 w-2/3 mb-5" />
      <Skeleton className="h-6 w-full mb-5" />
      <Skeleton className="h-6 w-2/3 mb-5" />
      <Skeleton className="h-6 w-full mb-5" />
    </>
  );
}
