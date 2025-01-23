"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useState } from "react";

const MainBannerSwiper = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  console.log(activeIndex);
  return (
    <Swiper
      className="h-[500px] w-full"
      // install Swiper modules
      modules={[Navigation, Pagination, Autoplay]}
      spaceBetween={50}
      slidesPerView={1}
      // autoplay={{
      //   delay: 3500, // 지연 시간 (한 슬라이더에 머물르는 시간)
      //   disableOnInteraction: false, // 마우스 제어 이후 자동 재생을 막을지 말지
      // }}
      speed={500} // 슬라이드 속도
      navigation
      pagination={{ clickable: true }}
      onSwiper={(swiper) => console.log(swiper)}
      onSlideChange={(e) => setActiveIndex(e.activeIndex)}
    >
      <SwiperSlide className="relative bg-gray-200">
        <span className="flex h-full items-center justify-center">Slide 1</span>
      </SwiperSlide>
      <SwiperSlide className="flex h-96 w-full items-center justify-center bg-gray-300">
        <span>Slide 2</span>
      </SwiperSlide>
      <SwiperSlide className="flex h-96 w-full items-center justify-center bg-gray-400">
        <span>Slide 3</span>
      </SwiperSlide>
      <SwiperSlide className="flex h-96 w-full items-center justify-center bg-gray-500">
        <span>Slide 4</span>
      </SwiperSlide>
    </Swiper>
  );
};

export default MainBannerSwiper;
