"use client";

import Link from "next/link";
import Image from "next/image";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import NoUserImage from "@/components/common/no-user";
import { Button } from "@/components/ui/button";
import axiosInstance from "@/api/axios";
import useImagePicker from "@/hooks/useImagePicker";
import { useMyProfileQuery } from "@/hooks/queries/userInfo/useUser";
import { ProfileSchema, ProfileType } from "@/schemas";
import ProfileImage from "./profile-image";

const ProfileForm = () => {
  const { data: userData } = useMyProfileQuery();

  console.log("userData", userData);

  const form = useForm({
    resolver: zodResolver(ProfileSchema),
    defaultValues: {
      name: userData?.data.name || "",
      profileImageUris: userData?.data.imageUri || "",
      description: userData?.data.description || "",
    },
  });

  //TODO: axios 제거
  const onSubmit = async (data: ProfileType) => {
    console.log(data);
    axiosInstance.patch("/user/me/profile", data);
  };

  return (
    <div>
      <section className="max-w-[520px] flex-1">
        <div className="mb-10 hidden md:block">
          <h2 className="text-2xl font-bold">프로필 관리</h2>
        </div>

        <h2 className="mb-2 text-xl font-bold">프로필 정보</h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div>
              {/* 프로파일 이미지 설정 */}
              <ProfileImage />

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>프로필 이름</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Jone Doe" type="text" />
                    </FormControl>
                    <FormDescription />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>소개</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          {...field}
                          placeholder="나를 소개하세요"
                          type="text"
                        />
                      </div>
                    </FormControl>
                    <FormDescription />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit">변경하기 </Button>
          </form>
        </Form>
      </section>
      <section className="mt-6 flex w-full flex-col gap-2 md:hidden">
        <h3 className="text-lg font-semibold">내 계정</h3>
        <nav>
          <ul className="*:cursor-pointer *:border-b *:border-secondary *:py-4">
            <li>
              <Link href={"/my/profile"}>프로필 관리</Link>
            </li>
            <li>
              <Link href={"/my/favorite"}>좋아요 한 글</Link>
            </li>
            <li>로그아웃</li>
          </ul>
        </nav>
      </section>
    </div>
  );
};

export default ProfileForm;
