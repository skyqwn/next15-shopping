"use client";

import { Sidebar } from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  ShoppingCart,
  Settings,
  Package,
  LucideIcon,
  ChartNoAxesCombined,
} from "lucide-react";

interface NavItem {
  title: string;
  href: string;
  icon: LucideIcon;
}

const navItems: NavItem[] = [
  {
    title: "상품 등록",
    href: "/admin/add-product",
    icon: LayoutDashboard,
  },
  {
    title: "상품 관리",
    href: "/admin/products",
    icon: Package,
  },
  {
    title: "주문 관리",
    href: "/admin/analytics",
    icon: ChartNoAxesCombined,
  },
  {
    title: "배너 등록",
    href: "/admin/banners/add",
    icon: ShoppingCart,
  },
  {
    title: "설정",
    href: "#",
    icon: Settings,
  },
];

export function AdminSidebar() {
  return (
    <Sidebar className="mt-24 p-4">
      <div className="px-3 py-2">
        <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
          관리자 메뉴
        </h2>
        <div className="space-y-1">
          <NavItems items={navItems} />
        </div>
      </div>
    </Sidebar>
  );
}

function NavItems({ items }: { items: NavItem[] }) {
  const pathname = usePathname();

  return (
    <nav className="grid gap-1">
      {items.map((item, index) => {
        const isActive = pathname === item.href;
        const Icon = item.icon;

        return (
          <Link
            key={index}
            href={item.href}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium",
              isActive
                ? "bg-accent text-accent-foreground"
                : "hover:bg-accent/50 hover:text-accent-foreground",
            )}
          >
            <Icon className="h-4 w-4" />
            <span>{item.title}</span>
          </Link>
        );
      })}
    </nav>
  );
}
