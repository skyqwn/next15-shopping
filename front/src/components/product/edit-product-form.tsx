"use client";

import { useForm } from "react-hook-form";
import { useParams, useRouter } from "next/navigation";

import { useProductDetailQuery } from "@/hooks/queries/products/useProductDetailQuery";
import { zodResolver } from "@hookform/resolvers/zod";
import { PartialProductType, ProductSchema, ProductType } from "@/schemas";
import ProductCardForm from "./product-card-form.tsx";
import { useMyProfileQuery } from "@/hooks/queries/userInfo/useUserInfo";
import { usePatchProductMutation } from "@/hooks/queries/products/usePatchProductMutation";

const EditProductForm = () => {
  const params = useParams();
  const productId = Number(params.id);
  const router = useRouter();

  const { data } = useProductDetailQuery(productId);
  const { data: userData } = useMyProfileQuery();
  const { mutate: patchProductMutation, isPending } =
    usePatchProductMutation(productId);

  const form = useForm<ProductType>({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      title: data.result.title || "",
      price: data.result.price || 0,
      description: data.result.description || "",
    },
    mode: "onChange",
  });

  const onSubmit = (data: PartialProductType) => {
    patchProductMutation(
      { productId, createProductForm: data },
      {
        onSuccess: () => {
          router.push(`/admin/products`);
        },
      },
    );
  };

  return (
    <ProductCardForm form={form} onSubmit={onSubmit} isPending={isPending} />
  );
};

export default EditProductForm;
