import { Skeleton } from "../ui/skeleton";

const BannerListSkeleton = () => {
  return (
    <div className="space-y-4 p-4">
      <div className="rounded-md border p-4">
        <Skeleton className="mb-4 h-8 w-full" />
        <div className="space-y-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-12 w-full" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BannerListSkeleton;
