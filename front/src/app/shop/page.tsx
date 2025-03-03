import SortOptionsFilter from "@/components/shop/sort-options-filter";
import SearchBar from "@/components/common/search-bar";
import InfiniteProductGrid from "@/components/shop/infinite-product-grid";

const Shop = async ({
  searchParams,
}: {
  searchParams: { q?: string; sort?: string };
}) => {
  const search = searchParams?.q;
  const sort = searchParams?.sort;
  return (
    <div className="">
      <SearchBar />
      <SortOptionsFilter />
      <InfiniteProductGrid search={search} sort={sort} />
    </div>
  );
};

export default Shop;
