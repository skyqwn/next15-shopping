"use client";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const LogoButton = () => {
  const { theme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const isDarkMode =
    mounted &&
    (theme === "dark" || (theme === "system" && systemTheme === "dark"));

  useEffect(() => {
    setMounted(true);
  }, []);
  return (
    <Link href={"/"} className="relative size-10 text-white md:size-14">
      {mounted ? (
        isDarkMode ? (
          <Image src={"/cicardi-logo-dark.webp"} alt="cicardi" fill priority />
        ) : (
          <Image src={"/cicardi-logo.webp"} alt="cicardi" fill priority />
        )
      ) : (
        <div className="h-full w-full bg-gray-200 dark:bg-gray-800" />
      )}
      <h1 className="hidden">시카디 | cicardi</h1>
    </Link>
  );
};

export default LogoButton;
