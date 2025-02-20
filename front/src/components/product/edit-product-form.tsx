"use client";

import { useForm } from "react-hook-form";
import { useParams, useRouter } from "next/navigation";

import { useProductDetailQuery } from "@/hooks/queries/products/useProductDetailQuery";
import { zodResolver } from "@hookform/resolvers/zod";
import { PartialProductType, ProductSchema, ProductType } from "@/schemas";
import { useCreateProductMutation } from "@/hooks/queries/products/useCreateProductMutation";
import ProductCardForm from "./product-card-form.tsx";
import { useMyProfileQuery } from "@/hooks/queries/userInfo/useUserInfo.js";
import { usePatchProductMutation } from "@/hooks/queries/products/usePatchProductMutation";

const EditProductForm = () => {
  const params = useParams();
  const productId = Number(params.id);
  const router = useRouter();

  const { data } = useProductDetailQuery(productId);
  const { data: userData } = useMyProfileQuery();

  if (userData) {
    if (userData?.data.role !== "ADMIN") router.push("/");
  }

  const form = useForm<ProductType>({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      title: data.product.title || "",
      price: data.product.price || 0,
      description: data.product.description || "",
    },
    mode: "onChange",
  });

  const { mutate: patchProductMutation, isPending } =
    usePatchProductMutation(productId);

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

  return <ProductCardForm form={form} onSubmit={onSubmit} />;
};

export default EditProductForm;
