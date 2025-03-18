"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import useAuth from "@/hooks/queries/useAuth";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useMyProfileQuery } from "@/hooks/queries/userInfo/useUserInfo";
import { LogOut, Moon, Settings, Sun, TruckIcon, UserCog } from "lucide-react";
import { useTheme } from "next-themes";
import { Switch } from "@/components/ui/switch";

const AuthButton = () => {
  const { setTheme, theme } = useTheme();
  const [checked, setChecked] = useState(false);

  const { data: userInfo } = useMyProfileQuery();
  const { logoutMutation } = useAuth();
  const [mounted, setMounted] = useState(false);
  const setSwitchState = () => {
    switch (theme) {
      case "dark":
        return setChecked(true);
      case "light":
        return setChecked(false);
      case "system":
        return setChecked(false);
    }
  };

  useEffect(() => {
    setMounted(true);
    setSwitchState();
  }, []);

  if (!mounted) {
    return null;
  }

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  return userInfo?.isLoggedIn ? (
    <div className="mr-1 flex items-center gap-4">
      <DropdownMenu>
        <DropdownMenuTrigger>
          {userInfo.data.imageUri ? (
            <Avatar className="size-8">
              <AvatarImage src={userInfo.data.imageUri} />
            </Avatar>
          ) : (
            <div className="flex size-8 items-center justify-center rounded-full bg-gray-200 font-bold">
              {userInfo.data.name?.charAt(0).toUpperCase()}
            </div>
          )}
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-64 p-6">
          <div className="mb-4 flex flex-col items-center gap-1 rounded-lg p-4">
            {userInfo.data.imageUri && (
              <Image
                src={userInfo.data.imageUri}
                alt={userInfo.data.name}
                className="rounded-full"
                width={48}
                height={48}
              />
            )}
            <p className="text-xs font-bold">{userInfo.data.name}</p>
            <span className="text-xs font-medium text-secondary-foreground">
              {userInfo.data.email}
            </span>
          </div>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="group cursor-pointer py-2 font-medium transition-all duration-500 ease-in-out">
            <Link href="/my/orders" className="flex items-center">
              <TruckIcon
                size={14}
                className="mr-3 transition-all duration-300 ease-in-out group-hover:translate-x-1"
              />
              <span>주문 목록</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="group cursor-pointer py-2 font-medium transition-all duration-500 ease-in-out">
            <Link href="/my/profile" className="flex items-center">
              <Settings
                size={14}
                className="mr-3 transition-all duration-300 ease-in-out group-hover:rotate-180"
              />
              <span>내 정보</span>
            </Link>
          </DropdownMenuItem>
          {userInfo.data.role === "ADMIN" && (
            <DropdownMenuItem>
              <Link href="/admin" className="group flex items-center">
                <UserCog
                  size={14}
                  className="mr-3 transition-all duration-300 ease-in-out group-hover:scale-75"
                />

                <span>관리자 페이지</span>
              </Link>
            </DropdownMenuItem>
          )}
          {theme ? (
            <DropdownMenuItem className="cursor-pointer py-2 font-medium ease-in-out">
              <div
                className="group flex items-center"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative mr-3 flex">
                  <Sun
                    className="absolute transition-all duration-500 ease-in-out group-hover:rotate-180 group-hover:text-yellow-600 dark:-rotate-90 dark:scale-0"
                    size={14}
                  />
                  <Moon
                    className="scale-0 group-hover:text-blue-400 dark:scale-100"
                    size={14}
                  />
                </div>
                <p className="text-xs font-bold text-secondary-foreground/75 text-yellow-600 dark:text-blue-400">
                  {theme[0].toUpperCase() + theme?.slice(1)} Mode
                </p>
                <Switch
                  className="scale-75"
                  checked={checked}
                  onCheckedChange={(e) => {
                    setChecked((prev) => !prev);
                    if (e) setTheme("dark");
                    else setTheme("light");
                  }}
                />
              </div>
            </DropdownMenuItem>
          ) : null}
          <DropdownMenuItem
            onClick={handleLogout}
            className="group cursor-pointer py-2 font-medium transition-all duration-500 focus:bg-destructive/25"
          >
            <LogOut
              size={14}
              className="mr-3 transition-all duration-300 ease-in-out group-hover:scale-75"
            />
            로그아웃
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  ) : (
    <div className="flex items-center gap-4">
      <Link href="/auth/login" className="cursor-pointer">
        <span>로그인</span>
      </Link>
      <Link href="/auth/register" className="cursor-pointer">
        <span>회원가입</span>
      </Link>
    </div>
  );
};
export default AuthButton;
