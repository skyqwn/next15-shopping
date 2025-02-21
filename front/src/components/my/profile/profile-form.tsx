"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

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
import useImagePicker from "@/hooks/useImagePicker";
import { useMyProfileQuery } from "@/hooks/queries/userInfo/useUserInfo";
import { ProfileSchema, ProfileType } from "@/schemas";
import ProfileImage from "./profile-image";
import { useUpdateProfileMutation } from "@/hooks/queries/userInfo/useUpdateUserMutation";
import useAuth from "@/hooks/queries/useAuth";
import { useEffect } from "react";

const ProfileForm = () => {
  const router = useRouter();
  const { data: userData } = useMyProfileQuery();
  const updateProfileMutation = useUpdateProfileMutation();
  const { logoutMutation } = useAuth();
  const form = useForm({
    resolver: zodResolver(ProfileSchema),
    defaultValues: {
      name: "",
      profileImageUris: "",
      description: "",
    },
  });

  useEffect(() => {
    if (userData?.data) {
      form.reset({
        name: userData.data.name || "",
        profileImageUris: userData.data.imageUri || "",
        description: userData.data.description || "",
      });
    }
  }, [userData, form]);

  const { handleFileRemove, handleImageChange } = useImagePicker({
    isProfile: true,
    fieldName: "profileImageUris",
    setValue: form.setValue,
    getValues: form.getValues,
  });

  const handleLogout = () => {
    const isConfirmed = window.confirm("로그아웃 하시겠습니까?");

    if (!isConfirmed) {
      return;
    }

    logoutMutation.mutate(undefined, {
      onSuccess: () => router.push("/"),
    });
  };

  const onSubmit = async (data: ProfileType) => {
    updateProfileMutation.mutate(data);
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
              <ProfileImage
                handleFileRemove={handleFileRemove}
                handleImageChange={handleImageChange}
                initialImage={userData?.data?.imageUri}
              />

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
            <li onClick={handleLogout}>로그아웃</li>
          </ul>
        </nav>
      </section>
    </div>
  );
};

export default ProfileForm;
