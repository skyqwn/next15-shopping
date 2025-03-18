"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

import { useTheme } from "next-themes";
import { Home, ShoppingBag, User } from "lucide-react";

const TabBar = () => {
  const pathname = usePathname();
  const { theme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDarkMode =
    mounted &&
    (theme === "dark" || (theme === "system" && systemTheme === "dark"));

  const isActive = (path: string): boolean => {
    if (path === "/") return pathname === path;
    return pathname.startsWith(path);
  };

  const getIconColor = (path: string): string => {
    if (!mounted) return "#888";

    const active = isActive(path);
    if (isDarkMode) {
      return active ? "#ffffff" : "#666666";
    }
    return active ? "#000000" : "#888888";
  };

  return (
    <nav className="fixed bottom-0 left-0 z-40 h-16 w-full border-t border-gray-200 bg-white text-sm shadow-lg dark:border-gray-800 dark:bg-gray-950 lg:hidden">
      <ul className="grid h-full grid-cols-3 items-center text-center">
        <li>
          <Link href="/" className="flex flex-col items-center">
            <Home size={24} color={getIconColor("/")} />
            <span
              className={`text-xs ${
                isActive("/")
                  ? "font-bold text-black dark:text-white"
                  : "text-gray-500 dark:text-gray-400"
              }`}
            >
              Home
            </span>
          </Link>
        </li>
        <li>
          <Link href="/shop" className="flex flex-col items-center">
            <ShoppingBag size={24} color={getIconColor("/shop")} />
            <span
              className={`text-xs ${
                isActive("/shop")
                  ? "font-bold text-black dark:text-white"
                  : "text-gray-500 dark:text-gray-400"
              }`}
            >
              Shop
            </span>
          </Link>
        </li>
        <li>
          <Link href="/my/profile" className="flex flex-col items-center">
            <User size={24} color={getIconColor("/my")} />
            <span
              className={`text-xs ${
                isActive("/my")
                  ? "font-bold text-black dark:text-white"
                  : "text-gray-500 dark:text-gray-400"
              }`}
            >
              My
            </span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default TabBar;
