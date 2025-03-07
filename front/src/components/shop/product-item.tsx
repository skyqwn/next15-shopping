"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import { formatPrice } from "@/lib/utils";
import { ProductVariantType } from "@/types";

const ProductItem = ({ variant }: { variant: ProductVariantType }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="group h-[300px] animate-pulse bg-gray-200" />;
  }

  return (
    <figure className="group">
      <Link href={`/shop/${variant.id}?type=${variant.productType}`}>
        <div className="relative aspect-square w-full overflow-hidden">
          <Image
            src={variant.variantImages?.[0]?.url ?? "/placeholder.jpg"}
            alt={variant.variantImages?.[0]?.fileName ?? "상품 이미지"}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            className="rounded-md object-cover transition-transform group-hover:scale-105"
          />
        </div>
        <div className="mt-2 space-y-1">
          <h3 className="font-bold">{variant.productType}</h3>
          <p className="text-sm text-gray-700">
            {formatPrice(variant.product.price)}원
          </p>
        </div>
      </Link>
    </figure>
  );
};

export default ProductItem;
