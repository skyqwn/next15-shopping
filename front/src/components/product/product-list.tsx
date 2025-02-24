"use client";

import placeholder from "../../../public/placeholder.jpg";
import React from "react";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { useProductsQuery } from "@/hooks/queries/products/useProductsQuery";

const ProductList = () => {
  const data = useProductsQuery();

  console.log(data);

  const dataTable = data?.data?.result.map((product: any) => {
    console.log("product", product);
    if (product.productVariants.length === 0) {
      return {
        id: product.id,
        title: product.title,
        price: product.price,
        image: placeholder.src,
        variants: [],
      };
    }
    const image = product.productVariants[0]?.variantImages[0]?.url;
    return {
      id: product.id,
      title: product.title,
      price: product.price,
      variants: product.productVariants,
      image,
    };
  });

  return (
    <div className="p-4">
      <DataTable columns={columns} data={dataTable} />
    </div>
  );
};

export default ProductList;
