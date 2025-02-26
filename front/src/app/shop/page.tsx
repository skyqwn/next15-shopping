import { Suspense } from "react";

import SortOptionsFilter from "@/components/shop/sort-options-filter";
import SearchBar from "@/components/common/search-bar";
import ProductGrid from "@/components/shop/product-grid";
import ProductGridSkeleton from "@/components/shop/product-grid-skeleton";

import { ServerFetchBoundary } from "@/components/prefetch-boundary";
import { getProductsFilterQueryOptions } from "@/hooks/queries/products/useProductsFilterQuery";
import { getMyProfileQueryOptions } from "@/hooks/queries/userInfo/useUserInfo";

const Shop = async ({
  searchParams,
}: {
  searchParams: { q?: string; sort?: string };
}) => {
  const search = searchParams?.q;
  const sort = searchParams?.sort;
  return (
    <div className="min-h-screen bg-white">
      <SearchBar />
      <SortOptionsFilter />
      <Suspense fallback={<ProductGridSkeleton />}>
        <ServerFetchBoundary
          fetchOptions={[
            getProductsFilterQueryOptions({
              search,
              sort: sort as any,
            }),
            getMyProfileQueryOptions(),
          ]}
        >
          <ProductGrid />
        </ServerFetchBoundary>
      </Suspense>
    </div>
  );
};

export default Shop;
