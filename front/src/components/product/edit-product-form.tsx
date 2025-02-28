"use client";

import { useForm } from "react-hook-form";
import { useParams, useRouter } from "next/navigation";

import { usePatchProductMutation } from "@/hooks/queries/products/usePatchProductMutation";
import { useProductDetailQuery } from "@/hooks/queries/products/useProductDetailQuery";
import { zodResolver } from "@hookform/resolvers/zod";
import { PartialProductType, ProductSchema, ProductType } from "@/schemas";
import ProductCardForm from "./product-card-form.tsx";

const EditProductForm = () => {
  const params = useParams();
  const productId = Number(params.id);
  const router = useRouter();

  const { data } = useProductDetailQuery(productId);
  const product = data?.result;
  const { mutate: patchProductMutation, isPending } =
    usePatchProductMutation(productId);

  const form = useForm<ProductType>({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      title: product.title || "",
      price: product.price || 0,
      description: product.description || "",
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
