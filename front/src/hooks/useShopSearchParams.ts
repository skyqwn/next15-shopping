import { useQueryState } from "nuqs";
import { parseAsString } from "nuqs";
import { debounce } from "lodash";
import { useCallback, useState, useEffect } from "react";

const DEBOUNCE_DELAY = 300;
const validSorts = ["popular", "latest", "price_high", "price_low"] as const;
export type SortOption = "popular" | "latest" | "price_high" | "price_low";

export const useShopSearchParams = () => {
  const [searchQuery, setSearchQuery] = useQueryState(
    "q",
    parseAsString.withDefault("").withOptions({
      history: "push",
    }),
  );

  const [sort, setSort] = useQueryState<SortOption>("sort", {
    history: "push",
    defaultValue: "popular",
    parse: (value): SortOption => {
      return validSorts.includes(value as SortOption)
        ? (value as SortOption)
        : "popular";
    },
  });

  const [inputValue, setInputValue] = useState(searchQuery || "");

  useEffect(() => {
    setInputValue(searchQuery || "");
  }, [searchQuery]);

  const debouncedSetSearch = useCallback(
    debounce((value: string) => {
      setSearchQuery(value);
    }, DEBOUNCE_DELAY),
    [setSearchQuery],
  );

  const handleSearchChange = (value: string) => {
    setInputValue(value);
    debouncedSetSearch(value);
  };

  const handleSortChange = (value: SortOption) => {
    setSort(value);
  };

  return {
    searchQuery: searchQuery || "",
    inputValue,
    handleSearchChange,
    sort,
    handleSortChange,
  };
};
