const ProductGridSkeleton = () => {
  return (
    <div className="mx-auto max-w-screen-xl px-4 py-4">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
        {[...Array(12)].map((_, i) => (
          <div key={i} className="cursor-pointer">
            {/* 이미지 스켈레톤 */}
            <div className="relative aspect-square w-full">
              <div className="h-full w-full animate-pulse rounded-md bg-gray-200" />
            </div>

            {/* 브랜드명 스켈레톤 */}
            <div className="mt-2">
              <div className="h-4 w-20 animate-pulse rounded bg-gray-200" />
            </div>

            {/* 상품명 스켈레톤 */}
            <div className="mt-1">
              <div className="h-4 w-32 animate-pulse rounded bg-gray-200" />
            </div>

            {/* 가격 스켈레톤 */}
            <div className="mt-2">
              <div className="h-5 w-24 animate-pulse rounded bg-gray-200" />
            </div>

            {/* 즉시 구매가 스켈레톤 */}
            <div className="mt-1">
              <div className="h-3 w-16 animate-pulse rounded bg-gray-200" />
              <div className="mt-1 h-4 w-28 animate-pulse rounded bg-gray-200" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductGridSkeleton;
