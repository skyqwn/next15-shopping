import MainBannerSwiper from "@/components/main/main-banner-swiper";

export default function Home() {
  return (
    <div className="">
      <MainBannerSwiper />
      {/* Just Dropped */}
      <section className="px-4">
        <h2 className="mb-4 text-xl font-bold">Just Dropped</h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="aspect-square w-full animate-pulse bg-gray-200"
            />
          ))}
        </div>
      </section>

      {/* Brand Focus */}
      <section className="px-4 py-8">
        <h2 className="mb-4 text-xl font-bold">Brand Focus</h2>
        <div className="grid grid-cols-3 gap-4 md:grid-cols-6">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="aspect-square w-full animate-pulse rounded-full bg-gray-200"
            />
          ))}
        </div>
      </section>

      {/* Most Popular */}
      <section className="px-4">
        <h2 className="mb-4 text-xl font-bold">Most Popular</h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="aspect-[3/4] w-full animate-pulse bg-gray-200"
            />
          ))}
        </div>
      </section>

      {/* Style Picks */}
      <section className="px-4 py-8">
        <h2 className="mb-4 text-xl font-bold">Style Picks</h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="aspect-[4/5] w-full animate-pulse bg-gray-200"
            />
          ))}
        </div>
      </section>
    </div>
  );
}
