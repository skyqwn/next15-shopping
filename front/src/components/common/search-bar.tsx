"use client";

import { Input } from "@/components/ui/input";
import { useShopSearchParams } from "@/hooks/useShopSearchParams";

const SearchBar = () => {
  const { inputValue, handleSearchChange } = useShopSearchParams();

  return (
    <div className="sticky top-0 z-10 border-b bg-white">
      <div className="mx-auto max-w-screen-xl px-4 py-3">
        <div className="relative">
          <Input
            type="text"
            value={inputValue}
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder="브랜드명, 모델명, 모델번호 등"
            className="h-12 w-full rounded-lg bg-gray-100 pl-10 pr-4"
          />
          <svg
            className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
