"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";

const MobileMenu = () => {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  return (
    <li className="cursor-pointer lg:hidden">
      <button
        className="w-50 relative z-50 flex h-8 flex-col justify-between text-white"
        onClick={() => setOpen((prev) => !prev)}
      >
        <div className="h-1 w-10 origin-left rounded bg-black" />
        <div className="h-1 w-10 rounded bg-black" />
        <div className="h-1 w-10 origin-left rounded bg-black" />
      </button>
      {/* {open && (
        <div className="absolute left-0 top-0 z-40 flex h-screen w-screen flex-col items-center justify-center gap-8 bg-black text-4xl text-white">
          {routes.map((link) => (
            <div
              className=""
              key={link.label}
              onClick={() => {
                router.push(link.path);
                setOpen(false);
              }}
            >
              <div>{link.label}</div>
            </div>
          ))}
        </div>
      )} */}
    </li>
  );
};

export default MobileMenu;
