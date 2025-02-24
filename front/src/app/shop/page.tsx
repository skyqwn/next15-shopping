import Image from "next/image";
import { Suspense } from "react";

import ProductGridSkeleton from "@/components/shop/product-grid-skeleton";
import { ServerFetchBoundary } from "@/components/prefetch-boundary";
import SortOptionsFilter from "@/components/shop/sort-options-filter";
import SearchBar from "@/components/common/search-bar";
import ProductGrid from "@/components/shop/product-grid";

import { generateFakeProducts } from "./action";
import { formatNumber } from "@/lib/utils";
import { getProductsFilterQueryOptions } from "@/hooks/queries/products/useProductsFilterQuery";

const Shop = ({
  searchParams,
}: {
  searchParams: { q?: string; sort?: string };
}) => {
  const products = generateFakeProducts(20);
  console.log("파람스: ", searchParams);
  return (
    <div className="min-h-screen bg-white">
      <SearchBar />
      <SortOptionsFilter />
      <Suspense fallback={<ProductGridSkeleton />}>
        <ServerFetchBoundary
          fetchOptions={[
            getProductsFilterQueryOptions({
              search: searchParams.q,
              sort: searchParams.sort as any,
            }),
          ]}
        >
          <ProductGrid />
        </ServerFetchBoundary>
      </Suspense>
      {/* <div className="mx-auto max-w-screen-xl px-4 py-4">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {products.map((product) => (
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
      </div> */}
    </div>
  );
};

export default Shop;
