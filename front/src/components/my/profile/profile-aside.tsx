"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navigation = [
  { name: "프로필 관리", href: "/my/profile" },
  { name: "주문 목록", href: "/my/orders" },
  { name: "로그아웃", href: "#" },
];

const ProfileAsideMenu = () => {
  const pathname = usePathname();
  return (
    <aside className="hidden w-[180px] flex-col md:flex">
      <h2 className="mb-8 text-2xl font-bold">마이 페이지</h2>
      <h3 className="mb-2 text-lg font-semibold">내 정보</h3>
      <nav>
        <ul className="flex flex-col gap-2 text-[15px] text-secondary">
          {navigation.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`${
                  pathname === item.href
                    ? "bg-gray-100 font-bold text-gray-900 dark:bg-gray-900 dark:text-white"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-900 dark:hover:text-white"
                } hover:font-bold`}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default ProfileAsideMenu;
