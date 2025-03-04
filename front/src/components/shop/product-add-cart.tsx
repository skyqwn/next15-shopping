"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { Minus, Plus } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { useCartStore } from "@/store";
import { ProductVariantType } from "@/types";

const ProductAddCart = ({ variant }: { variant: ProductVariantType }) => {
  const { addToCart } = useCartStore();
  const [quantity, setQuantity] = useState(1);
  const params = useSearchParams();
  const type = params.get("type");

  console.log("추가해야할", variant);

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const handleAddToCart = () => {
    toast.success(`${type}상품이 ${quantity}개  장바구니에 추가되었습니다.`);
    addToCart({
      id: variant.product.id,
      variant: { variantId: variant.id, quantity },
      name: `${variant.product.title}  ${variant.productType}`,
      price: variant.product.price,
      image: variant.variantImages[0].url,
    });
  };
  return (
    <>
      <div className="my-4 flex items-center justify-stretch">
        <Button
          onClick={decreaseQuantity}
          variant={"outline"}
          className="text-primary"
        >
          <Minus size={18} strokeWidth={3} />
        </Button>
        <Button className="flex-1">수량: {quantity}</Button>
        <Button
          onClick={increaseQuantity}
          variant={"outline"}
          className="text-primary"
        >
          <Plus size={18} strokeWidth={3} />
        </Button>
      </div>
      <Button onClick={handleAddToCart}>장바구니에 추가</Button>
    </>
  );
};

export default ProductAddCart;
