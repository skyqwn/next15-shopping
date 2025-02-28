"use client";

import { ProductVariantType } from "@/types";
import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

interface ProductTypeProps {
  variant: ProductVariantType[];
}

const ProductType = ({ variant }: ProductTypeProps) => {
  const searchParams = useSearchParams();
  const selectedType = searchParams.get("type");

  return variant?.map((variant) => {
    if (variant.productType === selectedType)
      return (
        <motion.div
          key={variant.id}
          animate={{ y: 0, opacity: 1 }}
          initial={{ opacity: 0, y: 6 }}
          className="font-medium text-secondary-foreground"
        >
          {selectedType}
        </motion.div>
      );
  });
};

export default ProductType;
