"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect } from "react";
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

const ProfileForm = () => {
  const { data: userData } = useMyProfileQuery();
  const { data } = userData;
  const { handleImageChange, images } = useImagePicker({
    initialImages: [],
    isProfile: true,
  });
  const form = useForm({
    resolver: zodResolver(ProfileSchema),
    defaultValues: {
      name: data.name,
      profileImageUris: [],
      description: data.description || "",
    },
  });

  console.log(data);

  useEffect(() => {
    //TODO type error 해결할것;;
    //@ts-ignore
    form.setValue("profileImageUris", images);
  }, [images]);

  const handleImageDelete = () => {
    // window.confirm("정말 삭제하시겠습니까?");
  };

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
        <article className="mb-8 flex gap-4">
          {data.imageUri ? (
            <div className="relative size-24 rounded-full">
              <Image src={data.imageUri} alt="pic" fill />
            </div>
          ) : (
            <NoUserImage />
          )}

          <div className="flex flex-col justify-center gap-2">
            <div className="flex gap-2">
              <h2 className="text-xl font-bold">이름</h2>
              <span className="text-xs text-gray-500">
                {userData?.data.name}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <input
                id="file-input"
                name="file-input"
                accept="image/*"
                type="file"
                className="hidden"
                onChange={handleImageChange}
              />
              <label htmlFor="file-input">
                <span className="cursor-pointer rounded-md border border-slate-300 p-[10px] text-xs">
                  이미지 변경
                </span>
              </label>
              <span
                onClick={handleImageDelete}
                className="cursor-pointer rounded-md border border-slate-300 p-[10px] text-xs text-red-500"
              >
                삭제
              </span>
            </div>
          </div>
        </article>
        <h2 className="mb-2 text-xl font-bold">프로필 정보</h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div>
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
