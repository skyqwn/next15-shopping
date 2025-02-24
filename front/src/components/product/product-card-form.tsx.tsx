import React from "react";

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
import Image from "next/image";
import Tiptap from "../common/tiptab";
import { ProductType } from "@/schemas";
import { UseFormReturn } from "react-hook-form";

interface CardFormProps {
  form: UseFormReturn<
    {
      title: string;
      description: string;
      price: number;
    },
    any,
    undefined
  >;
  onSubmit: (data: any) => void;
  isPending?: boolean;
}

const ProductCardForm = ({ form, onSubmit, isPending }: CardFormProps) => {
  return (
    <Card className="m-1">
      <CardHeader>
        <CardTitle>상품 등록</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="py-1">
                  <FormLabel>상품명</FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn" {...field} />
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
                  <FormLabel>상품설명</FormLabel>
                  <FormControl>
                    <Tiptap val={field.value} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>상품설명</FormLabel>
                  <FormControl>
                    <div className="flex items-center">
                      <Image
                        src={"/svg/won-sign.svg"}
                        width={28}
                        height={28}
                        alt="won-sign"
                      />
                      <Input
                        {...field}
                        type="number"
                        placeholder="100,000"
                        step="1000"
                        min={0}
                      />
                    </div>
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

export default ProductCardForm;
