"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import { useCreateProductMutation } from "@/hooks/queries/products/useCreateProductMutation";
import { useMyProfileQuery } from "@/hooks/queries/userInfo/useUserInfo";
import { ProductSchema, ProductType } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import ProductCardForm from "./product-card-form.tsx";

const ProductForm = () => {
  const router = useRouter();
  const form = useForm<ProductType>({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      title: "",
      price: 0,
      description: "",
    },
    mode: "onChange",
  });

  const { data: userData } = useMyProfileQuery();

  const { mutate: CreateProductMutation, isPending } =
    useCreateProductMutation();

  const onSubmit = (data: ProductType) => {
    console.log(data);
    CreateProductMutation(data, {
      onSuccess: () => {
        router.push("/admin/products");
      },
    });
  };

  return <ProductCardForm form={form} onSubmit={onSubmit} />;
};

export default ProductForm;
