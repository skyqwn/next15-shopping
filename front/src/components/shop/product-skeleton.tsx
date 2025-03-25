import { Skeleton } from "../ui/skeleton";

const ProductSkeleton = () => {
  return (
    <div className="mx-auto flex h-full min-h-[calc(100vh-4rem)] max-w-screen-xl flex-col justify-between px-4 py-4">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
        {Array(8)
          .fill(0)
          .map((_, index) => (
            <div className="flex flex-col space-y-2" key={index}>
              <Skeleton className="aspect-square w-full rounded-md" />
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-4 w-1/3" />
            </div>
          ))}
      </div>
    </div>
  );
};

export default ProductSkeleton;
