import CallToAction from "@/components/main/call-to-action";
import Faqs from "@/components/main/faqs";
import MainBannerSwiper from "@/components/main/main-banner-swiper";
import NewHomeScreen from "@/components/main/new-home-screen";
import PopularHomeScreen from "@/components/main/popular-home-screen";

export default function Home() {
  return (
    <>
      <MainBannerSwiper />
      <div className="flex flex-col gap-4 p-4">
        <NewHomeScreen />
        <PopularHomeScreen />
        <Faqs />
        <CallToAction />
      </div>
    </>
  );
}
