"use client";

import { useShopSearchParams } from "@/hooks/useShopSearchParams";

export const sortOptions = [
  { value: "popular" as const, label: "인기순" },
  { value: "latest" as const, label: "최신순" },
  { value: "price_high" as const, label: "높은 가격순" },
  { value: "price_low" as const, label: "낮은 가격순" },
] as const;

const SortOptionsFilter = () => {
  const { sort, handleSortChange } = useShopSearchParams();

  return (
    <div className="border-b">
      <div className="mx-auto max-w-screen-xl px-4 py-3">
        <div className="flex justify-between">
          <div className="flex gap-4 text-sm">
            {sortOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => handleSortChange(option.value)}
                className={`${
                  sort === option.value
                    ? "font-bold text-black"
                    : "text-gray-500 hover:text-gray-800"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SortOptionsFilter;
