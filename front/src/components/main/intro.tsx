"use client";

import { useEffect } from "react";
import SplitType from "split-type";
import { stagger, useAnimate, useInView } from "framer-motion";

const Intro = () => {
  const [scope, animate] = useAnimate();
  const isInView = useInView(scope, {
    once: true,
    margin: "0px 0px -100px 0px",
  });

  useEffect(() => {
    if (isInView && scope.current) {
      const splitText = new SplitType(scope.current, {
        types: "lines,words",
        tagName: "span",
      });

      const words = scope.current.querySelectorAll(".word");
      if (words.length === 0) {
        console.error("No .word elements found after SplitType");
        return;
      }

      // 초기 스타일 설정
      words.forEach((word: any) => {
        word.style.opacity = "0";
        word.style.transform = "translateY(100%)";
        word.style.display = "inline-block"; // 단어들이 줄바꿈되지 않도록
      });

      // 애니메이션 실행
      animate(
        words,
        {
          y: 0,
          opacity: 1,
        },
        {
          duration: 0.5,
          delay: stagger(0.2),
        },
      );

      return () => {
        splitText.revert();
      };
    }
  }, [isInView, scope, animate]);

  return (
    <section id="intro" className="py-10">
      <div className="flex justify-center">
        <h2
          ref={scope}
          className="text-center font-serif text-4xl font-bold md:text-5xl lg:w-[80%] lg:text-6xl"
        >
          Thank you for visiting Cicardi. We strive to be a shopping destination
          that consistently offers the finest quality clothing and utmost
          satisfaction. Feel free to reach out anytime with your needs or
          inquiries.
        </h2>
      </div>
    </section>
  );
};

export default Intro;
