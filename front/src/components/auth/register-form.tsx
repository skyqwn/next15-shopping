"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { SignupSchema, SignupType } from "@/schemas/sign-up-schema";
import useAuth from "@/hooks/queries/useAuth";
import Image from "next/image";

const RegisterForm = () => {
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

  const onSubmit = async (values: any) => {
    signupMutation.mutate(values);
  };

  const handleKakaoSignup = () => {
    window.location.href = "http://localhost:4000/api/auth/kakao/signin";
  };

  return (
    <div>
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
                    <Input
                      {...field}
                      placeholder="********"
                      type="password"
                      autoComplete="current-password"
                    />
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
                    <Input
                      {...field}
                      placeholder="********"
                      type="password"
                      autoComplete="current-password"
                    />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button size={"sm"} variant={"link"}>
              <Link href={"/auth/reset"}>비밀번호를 잊어버리셨나요?</Link>
            </Button>
          </div>
          <Button
            type="submit"
            className={cn(
              "my-2 w-full",
              // status === "executing" ? "animate-pulse" : "",
            )}
          >
            {"가입하기"}
          </Button>
        </form>
        <Button
          type="button"
          onClick={handleKakaoSignup}
          className={cn("my-2 w-full")}
        >
          {"카카오가입하기"}
        </Button>
        <div className="flex items-center justify-center gap-[23px]">
          <Image
            src="/svg/ic-login-kakao.svg"
            width={47}
            height={46}
            alt="kakao_login"
          />
        </div>
      </Form>
    </div>
  );
};

export default RegisterForm;
