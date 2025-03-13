"use client";

import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/lib/utils";
import { useViewedProductsQuery } from "@/hooks/queries/product-variant/useViewedProductsQuery";

interface ViewedProductsSidebarProps {
  className?: string;
}

const ViewedProductsSidebar = ({
  className = "",
}: ViewedProductsSidebarProps) => {
  const { data, isLoading, isError } = useViewedProductsQuery();

  if (
    isLoading ||
    isError ||
    !data?.success ||
    !data?.result ||
    data.result.length === 0
  ) {
    return null;
  }

  const variants = data.result;

  return (
    <div className={`rounded-lg p-2 shadow-md ${className}`}>
      <h3 className="mb-2 text-center text-xs font-bold">최근 본 상품</h3>
      <div className="space-y-3">
        {variants.slice(0, 5).map((variant) => (
          <Link
            key={variant.id}
            href={`/shop/${variant.id}?type=${variant.productType}`}
            className="block hover:opacity-80"
          >
            <div className="relative mx-auto aspect-square w-14 overflow-hidden rounded-md">
              <Image
                src={variant.variantImages?.[0]?.url}
                alt={variant.productType}
                fill
                sizes="56px"
                className="object-cover"
              />
            </div>
            <p className="mt-1 line-clamp-1 text-center text-[10px]">
              {formatPrice(variant.product.price)}원
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ViewedProductsSidebar;
