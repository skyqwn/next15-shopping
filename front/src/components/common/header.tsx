import Link from "next/link";
import Image from "next/image";

import AuthButtonsWrapper from "./header/auth-button-wrapper";
import { ThemeButton } from "./header/theme.button";
import CartHeader from "../cart/cart-header";

const Header = () => {
  const routes = [
    { path: "/", label: "Home" },
    { path: "/shop", label: "Shop" },
    { path: "/style", label: "Style" },
  ];

  return (
    <header className="sticky top-0 z-50 border border-b bg-white dark:bg-black">
      <nav className="container mx-auto px-4 py-4">
        <ul className="flex h-6 w-full items-center justify-between py-2 md:h-10">
          <Link href={"/"} className="relative size-10 text-white md:size-14">
            <Image src={"/cicardi-logo.png"} alt="cicardi" fill />
          </Link>
          <div className="flex items-center gap-4">
            <li className="flex gap-5">
              {routes.map((page) => (
                <div
                  key={page.label}
                  className="transition-colors ease-in-out"
                  data-tha
                >
                  <Link href={page.path} className="invisible md:visible">
                    <div>
                      <span className="text-xl font-thin">{page.label}</span>
                    </div>
                  </Link>
                </div>
              ))}
            </li>
            <li className="flex items-center">
              <CartHeader />
            </li>
            <li>
              <AuthButtonsWrapper />
            </li>
          </div>
        </ul>
        {/* <div className="display hidden justify-end gap-5 text-sm text-secondary md:flex">
          <AuthButtonsWrapper />
        </div> */}
      </nav>
    </header>
  );
};

export default Header;
