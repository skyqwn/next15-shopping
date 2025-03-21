import Link from "next/link";

import AuthButtonsWrapper from "./header/auth-button-wrapper";
import CartHeader from "../cart/cart-header";
import LogoButton from "./header/logo-button";

const Header = () => {
  const routes = [
    { path: "/", label: "Home" },
    { path: "/shop", label: "Shop" },
  ];

  return (
    <header className="sticky top-0 z-50 border border-b backdrop-blur dark:bg-neutral-950/70">
      <nav className="container mx-auto px-4 py-4">
        <ul className="flex h-6 w-full items-center justify-between py-2 md:h-10">
          <LogoButton />
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
                      <span className="text-xl font-bold">{page.label}</span>
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
      </nav>
    </header>
  );
};

export default Header;
