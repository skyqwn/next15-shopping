"use client";

import Image from "next/image";
import { formatNumber } from "@/lib/utils";
import { useShopSearchParams } from "@/hooks/useShopSearchParams";
import { useProductsFilterQuery } from "@/hooks/queries/products/useProductsFilterQuery";
import { ShopPagination } from "./shop-pagination";
import Link from "next/link";
import { useEffect, useState } from "react";
import ProductItemSkeleton from "./product-item.skeleton";
import ProductItem from "./product-item";

const ProductGrid = () => {
  const [mounted, setMounted] = useState(false);
  const { searchQuery, sort } = useShopSearchParams();
  const { data } = useProductsFilterQuery({
    search: searchQuery,
    sort,
  });

  const product = data.result;

  console.log(product);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <ProductItemSkeleton />;
  }

  const products = data?.result ?? [];

  return (
    <div className="mx-auto flex h-full min-h-[calc(100vh-4rem)] max-w-screen-xl flex-col justify-between px-4 py-4">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
        {products.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>
      <div>
        <ShopPagination totalPage={3} />
      </div>
    </div>
  );
};

export default ProductGrid;
