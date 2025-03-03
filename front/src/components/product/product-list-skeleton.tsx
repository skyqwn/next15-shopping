import { Skeleton } from "@/components/ui/skeleton";
export default function ProductListSkeleton() {
  return (
    <div className="space-y-6 p-4">
      <div className="flex items-center justify-between">
        <Skeleton className="h-10 w-32" /> <Skeleton className="h-10 w-72" />
      </div>
      <div className="mb-6 flex items-center gap-4">
        <Skeleton className="h-10 w-64" /> <Skeleton className="h-10 w-24" />
      </div>
      <div className="rounded-lg border">
        <div className="flex items-center bg-muted/50 p-4">
          <Skeleton className="mr-4 h-6 w-8" />
          <Skeleton className="mr-6 h-6 w-1/4" />
          <Skeleton className="mr-6 h-6 w-20" />
          <Skeleton className="mr-6 h-6 w-24" />
          <Skeleton className="h-6 w-1/5" />
        </div>

        {Array.from({ length: 10 }).map((_, index) => (
          <div key={index} className="flex items-center border-t p-4">
            <Skeleton className="mr-4 h-4 w-4" />
            <Skeleton className="mr-4 h-12 w-12 rounded-md" />
            <div className="mr-6 flex flex-1 flex-col">
              <Skeleton className="mb-1 h-5 w-full max-w-xs" />
              <Skeleton className="h-4 w-24" />
            </div>
            <div className="flex space-x-2">
              <Skeleton className="h-9 w-9 rounded-md" />
              <Skeleton className="h-9 w-9 rounded-md" />
              <Skeleton className="h-9 w-9 rounded-md" />
            </div>
          </div>
        ))}
        <div className="flex items-center justify-between border-t p-4">
          <Skeleton className="h-6 w-48" />
          <div className="flex space-x-2">
            <Skeleton className="h-8 w-8 rounded" />
            <Skeleton className="h-8 w-8 rounded" />
            <Skeleton className="h-8 w-8 rounded" />
            <Skeleton className="h-8 w-8 rounded" />
          </div>
        </div>
      </div>
    </div>
  );
}
