import { Input } from "@/components/ui/input";
import { generateFakeProducts } from "./action";
import { formatNumber } from "@/lib/utils";
import Image from "next/image";

const Shop = () => {
  const products = generateFakeProducts(20);
  return (
    <div className="min-h-screen bg-white">
      {/* 검색바 */}
      <div className="sticky top-0 z-10 border-b bg-white">
        <div className="mx-auto max-w-screen-xl px-4 py-3">
          <div className="relative">
            <Input
              type="text"
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

      {/* 필터 */}
      <div className="border-b">
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
      </div>

      {/* 정렬 옵션 */}
      <div className="border-b">
        <div className="mx-auto max-w-screen-xl px-4 py-3">
          <div className="flex justify-between">
            <div className="flex gap-4 text-sm">
              <button className="font-bold">인기순</button>
              <button className="text-gray-500">최신순</button>
              <button className="text-gray-500">높은 가격순</button>
              <button className="text-gray-500">낮은 가격순</button>
            </div>
          </div>
        </div>
      </div>

      {/* 상품 그리드 */}
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
