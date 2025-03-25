import { Skeleton } from "@/components/ui/skeleton";

const SearchBarSkeleton = () => {
  return (
    <div className="sticky top-0 z-10 border-b bg-white dark:bg-black">
      <div className="mx-auto max-w-screen-xl px-4 py-3">
        <div className="relative">
          <Skeleton className="h-12 w-full rounded-lg" />
          <div className="absolute left-3 top-1/2 -translate-y-1/2">
            <Skeleton className="h-5 w-5 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBarSkeleton;
