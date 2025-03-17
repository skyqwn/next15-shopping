"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import Image from "next/image";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useState } from "react";
import banner1 from "../../../public/banners/banner1.webp";
import banner2 from "../../../public/banners/banner2.webp";
import banner3 from "../../../public/banners/banner3.webp";
import { useRouter } from "next/navigation";

const bannerImages = [
  {
    id: 1,
    src: banner1,
    alt: "패치 카고 팬츠",
    title: "패치 카고 팬츠",
    description: "2025 패치 카고 팬츠",
    url: "/shop/81",
  },
  {
    id: 2,
    src: banner2,
    alt: "후드 윈드 카켓",
    title: "후드 윈드 카켓",
    description: "2025 후드 윈드 카켓",
    url: "/shop/71",
  },
  {
    id: 3,
    src: banner3,
    alt: "피그먼트 트레이닝 세트",
    title: "피그먼트 트레이닝 세트",
    description: "2025 피그먼트 트레이닝 세트",
    url: "/shop/87",
  },
];

const MainBannerSwiper = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const router = useRouter();

  return (
    <section>
      <Swiper
        className="h-[50vh] w-full"
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={50}
        slidesPerView={1}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        speed={500}
        navigation
        pagination={{ clickable: true }}
        onSlideChange={(e) => setActiveIndex(e.activeIndex)}
      >
        {bannerImages.map((banner) => (
          <SwiperSlide key={banner.id} className="relative cursor-pointer">
            <div
              className="relative h-full w-full"
              onClick={() => router.push(banner.url)}
            >
              <Image
                src={banner.src}
                alt={banner.alt}
                fill
                sizes="100vw"
                priority={banner.id === 1}
                className="object-contain object-center"
                objectFit="cover"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default MainBannerSwiper;
