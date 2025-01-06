"use client";

import React from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import Image from "next/image";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Button } from "../ui/button";
import { SigninSchema, SigninType } from "@/schemas/sign-in-schema";
import { usePasswordEyes } from "@/hooks/common/usePasswordEyes";
import { zodResolver } from "@hookform/resolvers/zod";
import useAuth from "@/hooks/queries/useAuth";
import { cn } from "@/lib/utils";
import { Input } from "../ui/input";

const LoginForm = () => {
  const form = useForm<SigninType>({
    resolver: zodResolver(SigninSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { loginMutation } = useAuth();
  const { clickedEyes, handleClickedEyes } = usePasswordEyes();

  const onSubmit = async (values: SigninType) => {
    loginMutation.mutate(values);
  };

  const handleKakaoSignup = () => {
    window.location.href = "http://localhost:4000/api/auth/kakao/signin";
  };

  return (
    <div className="mx-auto h-full max-w-[400px] py-20">
      <div className="mb-12 flex w-full flex-col text-3xl font-bold">
        <span>이메일로</span>
        <span>로그인 / 회원가입 하기</span>
      </div>
      <div className="w-full">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>이메일(아이디)</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="example@gmail.com"
                        type="email"
                        autoComplete="email"
                      />
                    </FormControl>
                    <FormDescription />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>비밀번호</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          {...field}
                          placeholder="8자 이상의 비밀번호"
                          type={clickedEyes ? "text" : "password"}
                          autoComplete="current-password"
                        />
                        <div onClick={handleClickedEyes}>
                          {clickedEyes ? (
                            <Image
                              src={"/svg/eye.svg"}
                              alt="eye"
                              className="absolute right-3 top-1/2 -translate-y-1/2 transform cursor-pointer text-gray-500"
                              width={24}
                              height={24}
                            />
                          ) : (
                            <Image
                              src={"/svg/eye-off.svg"}
                              alt="eye-off"
                              className="absolute right-3 top-1/2 -translate-y-1/2 transform cursor-pointer text-gray-500"
                              width={24}
                              height={24}
                            />
                          )}
                        </div>
                      </div>
                    </FormControl>
                    <FormDescription />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button
              type="submit"
              size={"lg"}
              className={cn(
                "my-6 w-full",
                // status === "executing" ? "animate-pulse" : "",
              )}
            >
              로그인
            </Button>
          </form>
        </Form>
        <div className="flex flex-col gap-5">
          <Button
            className="w-full outline outline-1"
            size={"lg"}
            variant={"link"}
          >
            <Link href={"/auth/email-register"}>이메일로 가입하기</Link>
          </Button>
          <Button
            onClick={handleKakaoSignup}
            className="relative flex w-full cursor-pointer items-center justify-center gap-2 rounded-md outline outline-1"
            variant={"link"}
            size={"lg"}
          >
            <Image
              className="absolute left-3"
              src={"/svg/kakao-outline.svg"}
              alt="kakao"
              width={32}
              height={32}
            />
            <span>카카오 로그인</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
