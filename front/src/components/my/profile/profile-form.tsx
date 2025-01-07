"use client";

import NoUserImage from "@/components/common/no-user";
import { Button } from "@/components/ui/button";
import React from "react";

import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { ProfileSchema, ProfileType } from "@/schemas/profile-schema";
import { usePathname } from "next/navigation";

const ProfileForm = () => {
  const pathname = usePathname();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.files);
  };
  const form = useForm({
    resolver: zodResolver(ProfileSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });
  const { handleSubmit, formState, control } = form;
  const onSubmit = (data: ProfileType) => {};
  return (
    <div>
      <section className="max-w-[520px] flex-1">
        <div className="mb-10 hidden md:block">
          <h2 className="text-2xl font-bold">프로필 관리</h2>
        </div>
        <article className="mb-8 flex gap-4">
          <NoUserImage />
          <div className="flex flex-col justify-center gap-2">
            <h2 className="text-xl font-bold">이름</h2>
            <div className="flex items-center gap-2">
              <input
                id="file-input"
                name="file-input"
                accept="image/*"
                type="file"
                className="hidden"
                onChange={handleFileChange}
              />
              <label htmlFor="file-input">
                <span className="rounded-md border border-slate-300 p-[10px] text-xs">
                  이미지 변경
                </span>
                {/* <Button variant={"outline"} size={"sm"}>
                  </Button> */}
              </label>
              <span className="rounded-md border border-slate-300 p-[10px] text-xs">
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
            <Button>변경하기 </Button>
          </form>
        </Form>
      </section>
      <section className="mt-6 flex w-full flex-col gap-2 md:hidden">
        <h3 className="text-lg font-semibold">내 계정</h3>
        <nav>
          <ul className="*:cursor-pointer *:border-b *:border-secondary *:py-4">
            <li>프로필 관리</li>
            <li>좋아요 한 글</li>
            <li>로그아웃</li>
          </ul>
        </nav>
      </section>
    </div>
  );
};

export default ProfileForm;
