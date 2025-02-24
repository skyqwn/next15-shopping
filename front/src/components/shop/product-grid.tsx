"use client";

import Image from "next/image";
import { formatNumber } from "@/lib/utils";
import { useShopSearchParams } from "@/hooks/useShopSearchParams";
import { useProductsFilterQuery } from "@/hooks/queries/products/useProductsFilterQuery";
import { ShopPagination } from "./shop-pagination";

const ProductGrid = () => {
  const { searchQuery, sort } = useShopSearchParams();
  const { data } = useProductsFilterQuery({
    search: searchQuery,
    sort,
  });

  console.log("productgrid:", data);
  const products = data?.result ?? [];
  console.log("프로덕츠", products);
  console.log("grid query:", searchQuery);
  console.log("grid sort:", sort);

  return (
    <div className="mx-auto flex h-full min-h-[calc(100vh-4rem)] max-w-screen-xl flex-col justify-between px-4 py-4">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
        {products?.map((product) => (
          <div key={product.id} className="cursor-pointer">
            <div className="relative aspect-square w-full overflow-hidden">
              <Image
                src={product.productVariants[0].variantImages[0].url}
                alt={product.productVariants[0].variantImages[0].fileName}
                fill
                className="object-cover"
              />
            </div>
            <div className="mt-2 font-bold">{product.title}</div>
            <div className="mt-1 text-sm text-gray-700">{product.price}원</div>
            <div className="mt-2 font-bold">
              {/* {formatNumber(product.price)}원 */}
            </div>
            <div className="mt-1">
              <div className="font-medium">
                {/* {formatNumber(product.immediatePrice)}원 */}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div>
        <ShopPagination totalPage={3} />
      </div>
    </div>
  );
};

export default ProductGrid;
