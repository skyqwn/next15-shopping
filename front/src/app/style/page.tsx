import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Style() {
  return (
    <div className="min-h-screen bg-white">
      {/* 상단 탭 메뉴 */}
      <div className="sticky top-0 z-10 bg-white">
        <div className="mx-auto max-w-screen-xl px-4">
          <Tabs defaultValue="discovery" className="w-full">
            <TabsList className="flex h-12 justify-start gap-8 border-0">
              <TabsTrigger value="discovery" className="text-base">
                발견
              </TabsTrigger>
              <TabsTrigger value="following" className="text-base">
                팔로잉
              </TabsTrigger>
              <TabsTrigger value="myFeed" className="text-base">
                마이
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      {/* 스타일 그리드 */}
      <div className="mx-auto max-w-screen-xl px-4 py-4">
        {/* 태그 필터 */}
        <div className="mb-4 flex gap-2 overflow-x-auto pb-2">
          {["전체", "럭셔리", "스트릿", "스포츠", "컨템포러리"].map((tag) => (
            <button
              key={tag}
              className="rounded-full border px-4 py-1.5 text-sm hover:border-black"
            >
              {tag}
            </button>
          ))}
        </div>

        {/* 스타일 카드 그리드 */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="group cursor-pointer">
              {/* 이미지 */}
              <div className="relative aspect-[3/4] w-full animate-pulse bg-gray-200">
                {/* 좋아요 버튼 */}
                <button className="absolute right-2 top-2 rounded-full bg-white/80 p-2 opacity-0 group-hover:opacity-100">
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </button>
              </div>

              {/* 프로필 정보 */}
              <div className="mt-2 flex items-center gap-2">
                <div className="h-6 w-6 animate-pulse rounded-full bg-gray-200" />
                <span className="text-sm font-medium">@username</span>
              </div>

              {/* 상품 태그 */}
              <div className="mt-2">
                <div className="h-4 w-24 animate-pulse rounded bg-gray-200" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
