"use client";

import { useForm } from "react-hook-form";
import { ProductSchema, ProductType } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

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

const ProductForm = () => {
  const form = useForm<ProductType>({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      productName: "",
      price: 0,
      description: "",
      brandName: "",
      imageUris: [],
    },
    mode: "onChange",
  });

  const onSubmit = (data: ProductType) => {
    console.log(data);
  };

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
              name="productName"
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
              name="brandName"
              render={({ field }) => (
                <FormItem className="py-1">
                  <FormLabel>브랜드명</FormLabel>
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
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default ProductForm;
