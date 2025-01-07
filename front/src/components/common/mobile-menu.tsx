"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";

const MobileMenu = () => {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  return <li className="cursor-pointer lg:hidden"></li>;
};

export default MobileMenu;
