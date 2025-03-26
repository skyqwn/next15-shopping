"use client";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const LogoButton = () => {
  const { theme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDarkMode =
    mounted &&
    (theme === "dark" || (theme === "system" && systemTheme === "dark"));

  const logoSrc = isDarkMode ? "/cicardi-logo-dark.webp" : "/cicardi-logo.webp";

  return (
    <Link href={"/"} className="relative size-10 text-white md:size-14">
      <Image
        src={logoSrc}
        alt="cicardi"
        width={112}
        height={112}
        className="object-contain"
        sizes="(max-width: 768px) 40px, 56px"
        priority
        loading="eager"
      />
      <h1 className="hidden">시카디 | cicardi</h1>
    </Link>
  );
};

export default LogoButton;
