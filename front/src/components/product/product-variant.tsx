"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { VariantSchema, VariantType } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import InputTags from "./input-tags";
import VariantImages from "./variant-images";

interface ProductVariantProps {
  editMode: boolean;
  productId: number;
  variant?: any;
  children: React.ReactNode;
}

const ProductVariant = ({
  children,
  editMode,
  productId,
  variant,
}: ProductVariantProps) => {
  const form = useForm<VariantType>({
    resolver: zodResolver(VariantSchema),
    defaultValues: {
      tags: [],
      variantImages: [],
      color: "#000000",
      id: undefined,
      productId,
      productType: "흰셔츠",
    },
    mode: "onChange",
  });

  const onSubmit = (data: VariantType) => {
    console.log(data);
  };

  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className="rouded-md max-h-[860px] overflow-y-scroll lg:max-w-screen-lg">
        <DialogHeader>
          <DialogTitle>상품 내용 등록하기</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <FormField
                control={form.control}
                name="productType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>상세 내용</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="상세 내용을 입력해주세요."
                        type="text"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="color"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>제품 색상</FormLabel>
                    <FormControl>
                      <Input {...field} type="color" className="py-2" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="tags"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>제품 태그</FormLabel>
                    <FormControl>
                      <InputTags
                        {...field}
                        onChange={(e) => field.onChange(e)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* VariantImage설정 */}
              <VariantImages />
            </div>
            <Button type="submit">변경하기 </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ProductVariant;
