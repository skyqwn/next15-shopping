"use client";

import { motion } from "framer-motion";

import { useCartStore } from "@/store";
import { Check, CreditCard, Notebook, ShoppingCart } from "lucide-react";

const CartProgres = () => {
  const { checkoutProgress } = useCartStore();
  return (
    <div className="flex items-center justify-center">
      <div className="relative h-3 w-64 rounded-md bg-muted">
        <div className="absolute left-0 top-0 flex h-full w-full items-center justify-between">
          <motion.span
            className="absolute left-1 top-0 z-30 h-full bg-primary ease-in-out"
            initial={{ width: 0 }}
            animate={{
              width:
                checkoutProgress === "cart-page"
                  ? "10%"
                  : checkoutProgress === "shippingInfo-page"
                    ? "35%"
                    : checkoutProgress === "payment-page"
                      ? "65%"
                      : "90%",
            }}
          />
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.25 }}
            className="z-50 rounded-full bg-primary p-2"
          >
            <ShoppingCart className="text-white dark:text-black" size={14} />
          </motion.div>
          <motion.div
            initial={{ scale: 0 }}
            animate={{
              scale:
                checkoutProgress === "shippingInfo-page"
                  ? 1
                  : 0 || checkoutProgress === "payment-page"
                    ? 1
                    : 0 || checkoutProgress === "confirmation-page"
                      ? 1
                      : 0,
            }}
            transition={{ delay: 0.25 }}
            className="z-50 rounded-full bg-primary p-2"
          >
            <Notebook className="text-white dark:text-black" size={14} />
          </motion.div>
          <motion.div
            initial={{ scale: 0 }}
            animate={{
              scale:
                checkoutProgress === "payment-page"
                  ? 1
                  : 0 || checkoutProgress === "confirmation-page"
                    ? 1
                    : 0,
            }}
            transition={{ delay: 0.25 }}
            className="z-50 rounded-full bg-primary p-2"
          >
            <CreditCard className="text-white dark:text-black" size={14} />
          </motion.div>
          <motion.div
            initial={{ scale: 0 }}
            animate={{
              scale: checkoutProgress === "confirmation-page" ? 1 : 0,
            }}
            transition={{ delay: 0.25 }}
            className="z-50 rounded-full bg-primary p-2"
          >
            <Check className="text-white dark:text-black" size={14} />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CartProgres;
