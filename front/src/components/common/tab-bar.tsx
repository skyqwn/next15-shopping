"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const TabBar = () => {
  const pathname = usePathname();
  return (
    <nav className="fixed bottom-0 left-0 h-16 w-full border-t border-gray-200 bg-white text-sm lg:hidden">
      <ul className="grid h-full grid-cols-3 items-center border-t text-center">
        <li>
          <Link href="/" className="flex flex-col items-center">
            <Image
              src={
                pathname === "/"
                  ? "/svg/home-fill.svg"
                  : "/svg/home-outline.svg"
              }
              width={24}
              height={24}
              alt="home"
            />
            <span className="text-xs">Home</span>
          </Link>
        </li>
        <li>
          <Link href="/shop" className="flex flex-col items-center">
            <Image
              src={
                pathname === "/shop"
                  ? "/svg/chat-fill.svg"
                  : "/svg/chat-outline.svg"
              }
              width={26}
              height={26}
              alt="shop"
            />
            <span className="text-xs">Shop</span>
          </Link>
        </li>
        <li>
          <Link href="/my/profile" className="flex flex-col items-center">
            <Image
              src={
                pathname === "/my"
                  ? "/svg/profile-fill.svg"
                  : "/svg/profile-outline2.svg"
              }
              width={32}
              height={32}
              alt="My"
            />
            <span className="text-xs">My</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default TabBar;
