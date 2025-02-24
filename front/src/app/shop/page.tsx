import { Suspense } from "react";
import Image from "next/image";

import ProductGridSkeleton from "@/components/shop/product-grid-skeleton";
import { ServerFetchBoundary } from "@/components/prefetch-boundary";
import SortOptionsFilter from "@/components/shop/sort-options-filter";
import SearchBar from "@/components/common/search-bar";
import ProductGrid from "@/components/shop/product-grid";

import { generateFakeProducts } from "./action";
import { formatNumber } from "@/lib/utils";
import { getProductsQueryOptions } from "@/hooks/queries/products/useProductsQuery";
import { ShopPagination } from "@/components/shop/shop-pagination";

const Shop = ({
  searchParams,
}: {
  searchParams: { q?: string; sort?: string };
}) => {
  const products = generateFakeProducts(20);
  return (
    <div className="min-h-screen bg-white">
      <SearchBar />
      {/* 필터 */}
      {/* <div className="border-b">
        <div className="mx-auto max-w-screen-xl px-4">
          <div className="flex gap-4 overflow-x-auto py-3">
            {["전체", "신발", "의류", "패션잡화", "테크", "라이프"].map(
              (category) => (
                <button
                  key={category}
                  className="whitespace-nowrap rounded-full border px-4 py-1.5 text-sm hover:border-black"
                >
                  {category}
                </button>
              ),
            )}
          </div>
        </div>
      </div> */}

      <SortOptionsFilter />
      {/* <Suspense fallback={<ProductGridSkeleton />}>
        <ServerFetchBoundary
          fetchOptions={[
            getProductsQueryOptions({
              search: searchParams.q,
              sort: searchParams.sort as any,
            }),
          ]}
        >
          <ProductGrid />
        </ServerFetchBoundary>
      </Suspense> */}
      <div className="mx-auto max-w-screen-xl px-4 py-4">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {products.map((product) => (
            <div key={product.id} className="cursor-pointer">
              {/* 상품 이미지 */}
              <div className="relative aspect-square w-full overflow-hidden">
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>

              {/* 브랜드명 */}
              <div className="mt-2 font-bold">{product.brand}</div>

              {/* 상품명 */}
              <div className="mt-1 text-sm text-gray-700">{product.name}</div>

              {/* 가격 */}
              <div className="mt-2 font-bold">
                {formatNumber(product.price)}원
              </div>

              {/* 즉시 구매가 */}
              <div className="mt-1">
                <div className="text-xs text-gray-500">즉시 구매가</div>
                <div className="font-medium">
                  {formatNumber(product.immediatePrice)}원
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Shop;
