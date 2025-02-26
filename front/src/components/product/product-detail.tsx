"use client";

import { useProductDetailQuery } from "@/hooks/queries/products/useProductDetailQuery";
import React from "react";
import ProductShowcase from "../shop/product-showcase";

const ProductDetail = ({ productId }: { productId: number }) => {
  const { data } = useProductDetailQuery(productId);
  if (!data) return null;

  return (
    <main>
      <section>
        <div>
          <ProductShowcase variants={data.result.productVariants} />
        </div>
      </section>
    </main>
  );
};

export default ProductDetail;
