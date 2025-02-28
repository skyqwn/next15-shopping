"use client";

import { cn } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";

interface ProductPickProps {
  color: string;
  productType: string;
  prodcutVariantId: number;
}

const ProductPick = ({
  color,
  productType,
  prodcutVariantId,
}: ProductPickProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const seletedColor = searchParams.get("color") || productType;
  return (
    <div
      style={{ background: color }}
      className={cn(
        "h-8 w-8 cursor-pointer rounded-full border-4 transition-all duration-300 ease-in-out hover:opacity-75",
        seletedColor === productType ? "opacity-100" : "opacity-50",
      )}
      onClick={() => {
        router.push(`/shop/${prodcutVariantId}?type=${productType}`, {
          scroll: false,
        });
      }}
    ></div>
  );
};

export default ProductPick;
