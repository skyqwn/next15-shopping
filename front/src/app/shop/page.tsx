import SortOptionsFilter from "@/components/shop/sort-options-filter";
import SearchBar from "@/components/common/search-bar";
import InfiniteProductGrid from "@/components/shop/infinite-product-grid";
import { Suspense } from "react";

const Shop = async () => {
  return (
    <div>
      <Suspense fallback={<div></div>}>
        <SearchBar />
      </Suspense>
      {/* <Suspense fallback={<div>Loading filters...</div>}>
        <SortOptionsFilter />
      </Suspense> */}
      <Suspense fallback={<div></div>}>
        <InfiniteProductGrid />
      </Suspense>
    </div>
  );
};

export default Shop;
