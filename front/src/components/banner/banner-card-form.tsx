// components/banner/banner-card-form.tsx
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UseFormReturn } from "react-hook-form";
import Image from "next/image";
import { BannerType } from "@/schemas/banner.schema";
import ProfileImage from "../my/profile/profile-image";
import { UseMutateFunction } from "@tanstack/react-query";
import { ApiResponse } from "@/api/httpMethod";

interface BannerCardFormProps {
  form: UseFormReturn<BannerType>;
  onSubmit: (data: BannerType) => void;
  isPending?: boolean;
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleFileRemove: (url: string) => void;
}

const BannerCardForm = ({
  form,
  onSubmit,
  isPending,
  handleFileRemove,
  handleImageChange,
}: BannerCardFormProps) => {
  return (
    <Card className="m-1">
      <CardHeader>
        <CardTitle>배너 등록</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <ProfileImage
              handleFileRemove={handleFileRemove}
              handleImageChange={handleImageChange}
              initialImage={form.getValues("imageUrl") ?? ""}
            />
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>타이틀</FormLabel>
                  <FormControl>
                    <Input placeholder="겨울 세일" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>설명</FormLabel>
                  <FormControl>
                    <Input placeholder="최대 50% 할인!" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isPending}>
              {isPending ? "저장 중..." : "저장"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default BannerCardForm;
