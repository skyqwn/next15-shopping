"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { usePasswordEyes } from "@/hooks/common/usePasswordEyes";
import useAuth from "@/hooks/queries/useAuth";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import { SignupSchema, SignupType } from "@/schemas";

const EmailRegisterForm = () => {
  const form = useForm<SignupType>({
    resolver: zodResolver(SignupSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
      passwordConfirm: "",
    },
  });

  const { signupMutation } = useAuth();
  const { clickedEyes, handleClickedEyes } = usePasswordEyes();

  const onSubmit = async (values: SignupType) => {
    signupMutation.mutate(values);
  };

  return (
    <div className="mx-auto h-full max-w-[400px] px-4 py-10">
      <div className="mb-12 flex w-full flex-col text-3xl font-bold">
        <h2>Next Shopping에</h2>
        <span>오신걸 환영합니다!</span>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>이메일</FormLabel>
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
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>이름</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="홍길동" />
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
                        type={clickedEyes ? "text" : "password"}
                        placeholder="8자 이상의 비밀번호"
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
            <FormField
              control={form.control}
              name="passwordConfirm"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>비밀번호 확인</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        {...field}
                        type={clickedEyes ? "text" : "password"}
                        placeholder="8자 이상의 비밀번호"
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
              "my-2 w-full",
              // status === "executing" ? "animate-pulse" : "",
            )}
          >
            {"가입하기"}
          </Button>
        </form>
      </Form>
      <Button size={"sm"} variant={"link"}>
        <Link href={"/auth/email-login"}>이미 아이디가 있으신가요??</Link>
      </Button>
    </div>
  );
};

export default EmailRegisterForm;
