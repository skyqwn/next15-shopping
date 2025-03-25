import SortOptionsFilter from "@/components/shop/sort-options-filter";
import SearchBar from "@/components/common/search-bar";
import InfiniteProductGrid from "@/components/shop/infinite-product-grid";
import { Suspense } from "react";
import ProductSkeleton from "@/components/shop/product-skeleton";
import { ServerFetchBoundary } from "@/components/prefetch-boundary";
import { getVariantsFilterInfiniteQueryOptions } from "@/hooks/queries/product-variant/useInfinityVariantFilterQuery";
import SearchBarSkeleton from "@/components/shop/search-bar.skeleton";

interface PageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

const Shop = async ({ searchParams }: PageProps) => {
  const resolvedSearchParams = await searchParams;
  const variantParams = {
    search: resolvedSearchParams?.q as string | undefined,
    sort: resolvedSearchParams?.sort as string | undefined,
  };

  const serverFetchOptions = [
    getVariantsFilterInfiniteQueryOptions(variantParams),
  ];

  return (
    <div>
      <Suspense fallback={<SearchBarSkeleton />}>
        <SearchBar />
      </Suspense>
      {/* <Suspense fallback={<div>Loading filters...</div>}>
        <SortOptionsFilter />
      </Suspense> */}
      <Suspense fallback={<ProductSkeleton />}>
        <ServerFetchBoundary fetchOptions={serverFetchOptions}>
          <InfiniteProductGrid />
        </ServerFetchBoundary>
      </Suspense>
    </div>
  );
};

export default Shop;
