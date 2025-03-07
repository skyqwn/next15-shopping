"use client";

import { usePathname } from "next/navigation";

const ProfileAsideMenu = () => {
  const pathname = usePathname();
  return (
    <aside className="hidden w-[180px] flex-col md:flex">
      <h2 className="mb-8 text-2xl font-bold">마이 페이지</h2>
      <h3 className="mb-2 text-lg font-semibold">내 정보</h3>
      <nav>
        <ul className="flex flex-col gap-2 text-[15px] text-secondary">
          <li
            className={`${pathname === "/my/profile" ? "font-bold text-primary" : ""}`}
          >
            <a href="/my/profile">프로필 관리</a>
          </li>
          <li
            className={`${pathname === "/my/orders" ? "font-bold text-primary" : ""}`}
          >
            <a href="/my/orders">주문 목록</a>
          </li>
          <li>
            <a href="#">로그아웃</a>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default ProfileAsideMenu;
