"use client";

import { AnimationPlaybackControls, motion, useAnimate } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const CallToAction = () => {
  const animation = useRef<AnimationPlaybackControls>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [scope, animate] = useAnimate();

  useEffect(() => {
    animation.current = animate(
      scope.current,
      { x: "-50%" },
      { duration: 40, ease: "linear", repeat: Infinity },
    );

    animation.current.speed = 0.5;
  }, []);

  useEffect(() => {
    if (animation.current) {
      if (isHovered) {
        animation.current.speed = 0.3;
      } else {
        animation.current.speed = 1;
      }
    }
  }, [isHovered]);
  return (
    <section className="py-10">
      <div className="flex overflow-x-clip p-4">
        <motion.div
          ref={scope}
          className="group flex flex-none gap-16 pr-16 text-7xl font-medium md:text-8xl"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="flex items-center gap-16">
              <span className="text-lime-400">&#10038;</span>
              <span className="group-hover:text-lime-400">
                시카디에서는 모든 상품 배송비가 무료!
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default CallToAction;
