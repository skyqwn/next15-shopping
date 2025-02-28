"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { Minus, Plus } from "lucide-react";
import { redirect, useSearchParams } from "next/navigation";
import { toast } from "sonner";

const ProductAddCart = () => {
  const [quantity, setQuantity] = useState(1);
  const params = useSearchParams();
  const type = params.get("type");
  return (
    <>
      <div className="my-4 flex items-center justify-stretch">
        <Button
          onClick={() => {
            if (quantity > 1) {
              setQuantity(quantity - 1);
            }
          }}
          variant={"outline"}
          className="text-primary"
        >
          <Minus size={18} strokeWidth={3} />
        </Button>
        <Button className="flex-1">수량: {quantity}</Button>
        <Button
          onClick={() => {
            setQuantity(quantity + 1);
          }}
          variant={"outline"}
          className="text-primary"
        >
          <Plus size={18} strokeWidth={3} />
        </Button>
      </div>
      <Button onClick={() => {}}>장바구니에 추가</Button>
    </>
  );
};

export default ProductAddCart;
