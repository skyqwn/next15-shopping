"use client";

import Link from "next/link";
import Image from "next/image";

import { formatPrice } from "@/lib/utils";
import { ProductVariantType } from "@/types";
import { useViewedProductMutation } from "@/hooks/queries/product-variant/useViewedProductMutation";

const ProductItem = ({ variant }: { variant: ProductVariantType }) => {
  const { mutate: recordViewedProduct } = useViewedProductMutation();

  const blurThumb = variant.variantImages?.[0]?.blurThumb;

  const handleProductClick = (e: React.MouseEvent) => {
    recordViewedProduct(variant.id);
  };

  return (
    <figure className="group">
      <Link
        onClick={handleProductClick}
        href={`/shop/${variant.id}?type=${variant.productType}`}
        className="aspect-video w-full overflow-hidden rounded"
      >
        <div className="relative aspect-square w-full overflow-hidden">
          <Image
            src={variant.variantImages?.[0]?.url ?? "/placeholder.jpg"}
            alt={variant.variantImages?.[0]?.fileName ?? "상품 이미지"}
            fill
            placeholder={"blur"}
            blurDataURL={
              blurThumb ??
              "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAECAIAAADETxJQAAAACXBIWXMAAAPoAAAD6AG1e1JrAAAAMElEQVR4nGOQlpbW1dVVUlJiOHr0aGNjY3x8PENMTMzvf/9yc3MZODg41NXVJaUkAP0iDFjkxeP6AAAAAElFTkSuQmCC"
            }
            className="rounded-mdtransition-transform group-hover:scale-105"
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
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
