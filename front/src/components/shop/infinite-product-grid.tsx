"use client";

import { useEffect, useRef } from "react";
import ProductItem from "./product-item";
import { useInfinityVariantFilterQuery } from "@/hooks/queries/product-variant/useInfinityVariantFilterQuery";
import { useShopSearchParams } from "@/hooks/useShopSearchParams";

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
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
        {products.map((variant, index) => (
          <ProductItem key={variant.id} variant={variant} />
        ))}
      </div>

      <div ref={loadMoreRef} className="py-4 text-center">
        {isFetchingNextPage
          ? "상품을 불러오는 중 입니다.."
          : hasNextPage
            ? "상품을 불러오는 중입니다.."
            : ""}
      </div>
    </div>
  );
};

export default InfiniteProductGrid;
