import SortOptionsFilter from "@/components/shop/sort-options-filter";
import SearchBar from "@/components/common/search-bar";
import InfiniteProductGrid from "@/components/shop/infinite-product-grid";

const Shop = async () => {
  return (
    <div>
      <SearchBar />
      <SortOptionsFilter />
      <InfiniteProductGrid />
    </div>
  );
};

export default Shop;
