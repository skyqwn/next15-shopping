import Link from "next/link";
import MobileMenu from "./mobile-menu";

const Header = () => {
  const routes = [
    { path: "/", label: "Home" },
    { path: "/contact", label: "Chat" },
    { path: "/portfolio", label: "Style" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <nav className="container mx-auto px-4 py-4">
        <div className="display hidden justify-end gap-5 text-sm text-gray-500 lg:flex">
          <Link className="cursor-pointer" href={"/my"}>
            <span>마이페이지</span>
          </Link>
          <Link className="cursor-pointer" href={"/auth/login"}>
            <span>로그인</span>
          </Link>
        </div>
        <ul className="flex w-full items-center justify-between py-2">
          <li className="text-4xl font-bold text-primary">
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
                    <span className="text-lg">{page.label}</span>
                    {/* <ShoppingBag size={32} /> */}
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
