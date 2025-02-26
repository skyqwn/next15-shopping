import { formatNumber } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const ProductItem = ({ product }: { product: any }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="group h-[300px] animate-pulse bg-gray-200" />;
  }

  return (
    <div className="group">
      <Link href={`/shop/${product.id}`} prefetch={false}>
        <div className="relative aspect-square w-full overflow-hidden">
          <Image
            src={
              product.productVariants[0]?.variantImages?.[0]?.url ??
              "/placeholder.jpg"
            }
            alt={
              product.productVariants[0]?.variantImages?.[0]?.fileName ??
              "상품 이미지"
            }
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            className="object-cover transition-transform group-hover:scale-105"
          />
        </div>
        <div className="mt-2 space-y-1">
          <h3 className="font-bold">{product.title}</h3>
          <p className="text-sm text-gray-700">
            {formatNumber(product.price)}원
          </p>
        </div>
      </Link>
    </div>
  );
};

export default ProductItem;
