import Link from "next/link";
import MobileMenu from "./mobile-menu";
import { ShoppingBag } from "lucide-react";

const Header = () => {
  const routes = [
    { path: "/", label: "홈" },
    { path: "/contact", label: "문의하기" },
    { path: "/portfolio", label: "포트폴리오" },
    { path: "/aboutus", label: "회사소개" },
  ];

  return (
    <header className="sticky top-0 z-50 shadow-md">
      <nav className="container mx-auto px-4 py-4">
        <ul className="flex w-full items-center justify-between">
          <li className="text-primary text-4xl font-bold">
            <Link href={"/"}>
              <h1>NEXT</h1>
            </Link>
          </li>
          <li className="flex gap-5">
            {routes.map((page) => (
              <div
                key={page.label}
                className="transition-colors ease-in-out"
                data-tha
              >
                <Link href={page.path} className="invisible lg:visible">
                  <div>
                    <ShoppingBag size={32} />
                  </div>
                </Link>
              </div>
            ))}
          </li>
          <MobileMenu />
        </ul>
      </nav>
    </header>
  );
};

export default Header;
