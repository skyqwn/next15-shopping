"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const TabBar = () => {
  const pathname = usePathname();
  return (
    <nav className="fixed bottom-0 left-0 h-16 w-full border-t border-gray-200 bg-white text-sm lg:hidden">
      <ul className="grid h-full grid-cols-4 items-center border-t text-center">
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
          <Link href="/chat" className="flex flex-col items-center">
            <Image
              src={
                pathname === "/chat"
                  ? "/svg/chat-fill.svg"
                  : "/svg/chat-outline.svg"
              }
              width={26}
              height={26}
              alt="chat"
            />
            <span className="text-xs">Chat</span>
          </Link>
        </li>
        <li>
          <Link href="/community" className="flex flex-col items-center">
            <Image
              src={
                pathname === "/community"
                  ? "/svg/clothes-fill.svg"
                  : "/svg/clothes-outline.svg"
              }
              width={28}
              height={28}
              alt="Clothes"
            />
            <span className="text-xs">Style</span>
          </Link>
        </li>
        <li>
          <Link href="/my" className="flex flex-col items-center">
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
