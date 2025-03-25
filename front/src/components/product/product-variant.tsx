"use client";

import {
  Dialog,
  DialogContent,
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
import { useCreateVariantMutation } from "@/hooks/queries/product-variant/useCreateVariantMutation";
import { useEffect, useState } from "react";
import { usePatchVariantMutation } from "@/hooks/queries/product-variant/usePatchVariantMutation";
import { useDeleteVariantMutation } from "@/hooks/queries/product-variant/useDeleteVariantMutation";
import { ProductVariantType } from "@/types";

interface ProductVariantProps {
  editMode?: boolean;
  productId: number;
  variant?: ProductVariantType;
  children: React.ReactNode;
}

const ProductVariant = ({
  children,
  editMode,
  productId,
  variant,
}: ProductVariantProps) => {
  const [open, setOpen] = useState(false);
  const { mutate: createVariantMutate } = useCreateVariantMutation();
  const { mutate: updateVariantMutate } = usePatchVariantMutation();
  const { mutate: deleteVariantMutate } = useDeleteVariantMutation();

  const form = useForm<VariantType>({
    resolver: zodResolver(VariantSchema),
    defaultValues: {
      tags: [],
      variantImages: [],
      color: "#000000",
      id: variant?.id,
      productId,
      productType: "흰셔츠",
    },
    mode: "onChange",
  });

  const setEdit = () => {
    if (editMode && variant) {
      form.setValue("id", variant.id);
      form.setValue("productId", variant.productId);
      form.setValue("productType", variant.productType);
      form.setValue("color", variant.color);
      form.setValue(
        "tags",
        variant.variantTags.map((tag) => tag.tag),
      );
      form.setValue(
        "variantImages",
        variant.variantImages.map((img) => ({
          fileName: img.fileName,
          size: img.size,
          url: img.url,
          blurThumb: img.blurThumb,
        })),
      );
    }
  };

  useEffect(() => {
    setEdit();
  }, []);

  const onSubmit = (data: VariantType) => {
    if (editMode) {
      updateVariantMutate(data);
    } else {
      createVariantMutate(data);
      form.reset();
      setOpen(false);
    }
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!variant?.id) return;

    if (window.confirm("정말 삭제하시겠습니까?")) {
      deleteVariantMutate(variant.id, {
        onSuccess: () => {
          setOpen(false);
        },
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className="rouded-md max-h-[860px] overflow-y-scroll lg:max-w-screen-lg">
        <DialogHeader>
          <DialogTitle>상품 내용 {editMode ? "수정" : "등록"}하기</DialogTitle>
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

              <VariantImages />
            </div>
            {editMode && variant && (
              <Button
                variant={"destructive"}
                className="mr-2"
                type="button"
                onClick={handleDelete}
              >
                삭제하기
              </Button>
            )}
            <Button type="submit">{editMode ? "변경하기" : "등록하기"} </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ProductVariant;
