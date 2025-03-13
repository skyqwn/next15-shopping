import { Skeleton } from "../ui/skeleton";

const ProductSkeleton = () => {
  return (
    <div className="flex flex-col space-y-2">
      <Skeleton className="aspect-square w-full rounded-md" />
      <Skeleton className="h-4 w-2/3" />
      <Skeleton className="h-4 w-1/3" />
    </div>
  );
};

export default ProductSkeleton;
