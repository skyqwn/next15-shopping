"use client";
import { useEffect, useState } from "react";

import { useShopSearchParams } from "@/hooks/useShopSearchParams";
import { ShopPagination } from "./shop-pagination";
import ProductItemSkeleton from "./product-item.skeleton";
import ProductItem from "./product-item";
import { useVariantsFilterQuery } from "@/hooks/queries/product-variant/useVariantsFilterQuery";

const ProductGrid = () => {
  const [mounted, setMounted] = useState(false);
  const { searchQuery, sort } = useShopSearchParams();
  const { data } = useVariantsFilterQuery({
    search: searchQuery,
    sort,
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <ProductItemSkeleton />;
  }

  const variants = data?.result ?? [];

  return (
    <div className="mx-auto flex h-full min-h-[calc(100vh-4rem)] max-w-screen-xl flex-col justify-between px-4 py-4">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
        {variants.map((variant) => (
          <ProductItem key={variant.id} variant={variant} />
        ))}
      </div>
      <div>
        <ShopPagination totalPage={3} />
      </div>
    </div>
  );
};

export default ProductGrid;
