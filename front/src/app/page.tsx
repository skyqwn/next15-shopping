import CallToAction from "@/components/main/call-to-action";
import Faqs from "@/components/main/faqs";
import Hero from "@/components/main/hero";
import Intro from "@/components/main/intro";
import MainBannerSwiper from "@/components/main/main-banner-swiper";
import NewHomeScreen from "@/components/main/new-home-screen";
import PopularHomeScreen from "@/components/main/popular-home-screen";

export default function Home() {
  return (
    <>
      {/* <MainBannerSwiper /> */}
      <Hero />
      <div className="container mx-auto flex flex-col gap-4 p-4 pb-16 lg:pb-0">
        <Intro />
        <NewHomeScreen />
        <PopularHomeScreen />
        <Faqs />
        <CallToAction />
      </div>
    </>
  );
}
