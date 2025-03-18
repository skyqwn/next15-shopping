"use client";

import Lottie from "lottie-react";
import { motion } from "framer-motion";

import { Button } from "../ui/button";
import { useCartStore } from "@/store";
import orderConfirmed from "../../../public/order-confirm.json";

const OrderConfirmed = () => {
  const { setCheckoutProgress, clearCart } = useCartStore();
  return (
    <div className="flex flex-col items-center gap-4">
      <motion.div
        animate={{ opacity: 1, scale: 1 }}
        initial={{ opacity: 0, scale: 0 }}
        transition={{ delay: 0.35 }}
      >
        <Lottie className="my-4 h-56" animationData={orderConfirmed} />
      </motion.div>
      <h2 className="text-2xl font-medium">구매해주셔서 감사합니다!</h2>
      <Button
        onClick={() => {
          setCheckoutProgress("cart-page");
          clearCart();
        }}
      >
        완료하기
      </Button>
    </div>
  );
};

export default OrderConfirmed;
