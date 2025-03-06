"use client";

import { motion } from "framer-motion";

import { useCartStore } from "@/store";
import { DrawerDescription, DrawerTitle } from "../ui/drawer";
import { ArrowLeft } from "lucide-react";

const CartMessage = () => {
  const { checkoutProgress, setCheckoutProgress } = useCartStore();
  return (
    <motion.div animate={{ opacity: 1, x: 0 }} initial={{ opacity: 0, x: 10 }}>
      <DrawerTitle>
        {checkoutProgress === "cart-page" ? "장바구니" : null}
        {checkoutProgress === "payment-page" ? "결제 하기" : null}
        {checkoutProgress === "confirmation-page" ? "결제 완료" : null}
      </DrawerTitle>
      <DrawerDescription className="py-1">
        {checkoutProgress === "cart-page" ? "장바구니 확인 또는 수정" : null}
        {checkoutProgress === "payment-page" ? (
          <span
            onClick={() => setCheckoutProgress("cart-page")}
            className="flex cursor-pointer items-center justify-center gap-1 hover:text-primary"
          >
            <ArrowLeft size={14} />
            이전 단계로 넘어가기
          </span>
        ) : null}
        {checkoutProgress === "confirmation-page" ? "확정단계" : null}
      </DrawerDescription>
    </motion.div>
  );
};

export default CartMessage;
