"use client";

import { useEffect, useRef } from "react";
import ProductItem from "./product-item";
import { useInfinityVariantFilterQuery } from "@/hooks/queries/product-variant/useInfinityVariantFilterQuery";
import { useShopSearchParams } from "@/hooks/useShopSearchParams";
import ProductSkeleton from "./product-skeleton";

const InfiniteProductGrid = () => {
  const loadMoreRef = useRef<HTMLDivElement>(null);
  const { sort, searchQuery: search } = useShopSearchParams();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfinityVariantFilterQuery({ search, sort });

  const products = data?.pages.flatMap((page) => page.result.data) || [];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 },
    );

    const currentRef = loadMoreRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <div className="mx-auto flex h-full min-h-[calc(100vh-4rem)] max-w-screen-xl flex-col justify-between px-4 py-4">
      {isLoading ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {Array(8)
            .fill(0)
            .map((_, index) => (
              <ProductSkeleton key={index} />
            ))}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
            {products.map((variant) => (
              <ProductItem key={variant.id} variant={variant} />
            ))}
          </div>

          <div ref={loadMoreRef} className="py-4 text-center">
            {isFetchingNextPage
              ? "상품을 불러오는 중 입니다.."
              : hasNextPage
                ? "상품을 불러오는 중 입니다.."
                : ""}
          </div>
        </>
      )}
    </div>
  );
};

export default InfiniteProductGrid;

// "use client";

// import { useInfinityVariantFilterQuery } from "@/hooks/queries/product-variant/useInfinityVariantFilterQuery";
// import { VirtuosoGrid } from "react-virtuoso"; // VirtuosoGrid로 변경
// import ProductItem from "./product-item";

// interface InfiniteProductGridProps {
//   search?: string;
//   sort?: string;
// }

// const InfiniteProductGrid = ({ search, sort }: InfiniteProductGridProps) => {
//   const {
//     data,
//     fetchNextPage,
//     hasNextPage,
//     isFetchingNextPage,
//     isLoading,
//     isError,
//   } = useInfinityVariantFilterQuery({ search, sort });

//   console.log("data test", data);
//   const products = data?.pages.flatMap((page) => page.result.data) || [];
//   console.log("프로덕츠 테스트", products);

//   return (
//     <div>
//       {isLoading ? (
//         <div>Loading...</div>
//       ) : isError ? (
//         <div>Error loading products</div>
//       ) : (
//         <VirtuosoGrid
//           style={{ height: "80vh" }}
//           data={products}
//           endReached={() => {
//             if (hasNextPage && !isFetchingNextPage) {
//               fetchNextPage();
//             }
//           }}
//           itemContent={(index, variant) => (
//             <ProductItem key={variant.id} variant={variant} />
//           )}
//           listClassName="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 mx-auto max-w-screen-xl px-4 py-4"
//           components={{
//             Footer: () => (
//               <div className="py-4 text-center">
//                 {isFetchingNextPage
//                   ? "Loading more..."
//                   : hasNextPage
//                     ? "Scroll to load more"
//                     : "No more items"}
//               </div>
//             ),
//           }}
//         />
//       )}
//     </div>
//   );
// };

// export default InfiniteProductGrid;
