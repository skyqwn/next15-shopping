"use client";

import Image from "next/image";
import { formatNumber } from "@/lib/utils";
import { useShopSearchParams } from "@/hooks/useShopSearchParams";
import { useProducts } from "@/hooks/queries/products/useProductsQuery";
import { ShopPagination } from "./shop-pagination";

const ProductGrid = () => {
  const { searchQuery, sort } = useShopSearchParams();
  const { data } = useProducts({
    search: searchQuery,
    sort,
  });
  const products = data?.result ?? [];

  return (
    <div className="mx-auto max-w-screen-xl px-4 py-4">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
        {products?.map((product) => (
          <div key={product.id} className="cursor-pointer">
            <div className="relative aspect-square w-full overflow-hidden">
              <Image
                src={product.imageUrl}
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="mt-2 font-bold">{product.brand}</div>
            <div className="mt-1 text-sm text-gray-700">{product.name}</div>
            <div className="mt-2 font-bold">
              {formatNumber(product.price)}원
            </div>
            <div className="mt-1">
              <div className="text-xs text-gray-500">즉시 구매가</div>
              <div className="font-medium">
                {formatNumber(product.immediatePrice)}원
              </div>
            </div>
          </div>
        ))}
      </div>
      <ShopPagination totalPage={10} />
    </div>
  );
};

export default ProductGrid;
