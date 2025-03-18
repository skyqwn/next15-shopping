"use client";

import { Home, ShoppingBag, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const TabBar = () => {
  const pathname = usePathname();
  return (
    <nav className="fixed bottom-0 left-0 h-16 w-full border-t border-gray-200 bg-white text-sm dark:bg-black lg:hidden">
      <ul className="grid h-full grid-cols-3 items-center text-center">
        <li>
          <Link href="/" className="flex flex-col items-center">
            <Home size={24} color={pathname === "/" ? "#000" : "#888"} />
            <span className={`text-xs ${pathname === "/" ? "font-bold" : ""}`}>
              Home
            </span>
          </Link>
        </li>
        <li>
          <Link href="/shop" className="flex flex-col items-center">
            <ShoppingBag
              size={24}
              color={pathname.startsWith("/shop") ? "#000" : "#888"}
            />
            <span
              className={`text-xs ${pathname.startsWith("/shop") ? "font-bold" : ""}`}
            >
              Shop
            </span>
          </Link>
        </li>
        <li>
          <Link href="/my/profile" className="flex flex-col items-center">
            <User
              size={24}
              color={pathname.startsWith("/my") ? "#000" : "#888"}
            />
            <span
              className={`text-xs ${pathname.startsWith("/my") ? "font-bold" : ""}`}
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
