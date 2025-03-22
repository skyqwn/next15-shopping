"use client";

import Image from "next/image";

import { Button } from "../ui/button";
import { ChevronDown } from "lucide-react";
import SplitType from "split-type";
import { useEffect, useRef } from "react";
import {
  stagger,
  useAnimate,
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRouter } from "next/navigation";

const Hero = () => {
  const [titleScope, titleAnimate] = useAnimate();
  const scollingDiv = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: scollingDiv,
    offset: ["start end", "end end"],
  });

  const portraitWidth = useTransform(scrollYProgress, [0, 1], ["100%", "250%"]);

  const router = useRouter();

  useEffect(() => {
    new SplitType(titleScope.current, {
      types: "lines,words",
      tagName: "span",
    });

    titleAnimate(
      titleScope.current.querySelectorAll(".word"),
      {
        transform: "translateY(0%)",
      },
      {
        duration: 0.5,
        delay: stagger(0.2),
      },
    );
  }, []);
  return (
    <section className="px-4">
      <div className="sticky top-0 grid items-stretch md:min-h-[calc(100vh-4rem)] md:grid-cols-12">
        <div className="flex flex-col justify-center md:col-span-7">
          <div className="container flex !max-w-full flex-col gap-6">
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-10 font-serif text-5xl uppercase md:mt-0 md:text-6xl lg:text-7xl"
              ref={titleScope}
            >
              Welcome to Cicardi, the epitome of sophisticated shopping.
            </motion.h2>
            <div className="mt-10 flex flex-col items-start gap-6 md:mt-0 md:flex-row">
              <motion.div
                initial={{ opacity: 0, y: "100%" }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.7 }}
              >
                <Button
                  onClick={() => router.push("/shop")}
                  variant={"outline"}
                >
                  <span>상품 둘러보기</span>
                  <ChevronDown />
                </Button>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: "100%" }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 2.3 }}
              >
                <Button
                  className="hidden items-center md:inline-flex"
                  variant={"ghost"}
                >
                  Discover More
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
        <div className="relative md:col-span-5">
          <motion.div
            className="mt-20 max-md:!w-full md:absolute md:right-0 md:mt-0 md:size-full"
            style={{ width: portraitWidth }}
          >
            <Image
              src={"/banners/banner2.webp"}
              alt="hero"
              className="size-full object-cover"
              width={500}
              height={500}
            />
          </motion.div>
        </div>
      </div>
      <div ref={scollingDiv} className="h-[100vh] md:h-[300vh]"></div>
    </section>
  );
};

export default Hero;
