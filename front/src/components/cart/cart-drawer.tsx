"use client";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useCartStore } from "@/store";
import { AnimatePresence, motion } from "framer-motion";

import { ShoppingBag } from "lucide-react";
import CartItems from "./cart-items";

const CartDrawer = () => {
  const { cart } = useCartStore();
  console.log("cart", cart.length);
  return (
    <Drawer>
      <DrawerTrigger>
        <div className="relative px-2">
          <AnimatePresence>
            {cart.length > 0 && (
              <motion.span
                animate={{ scale: 1, opacity: 1 }}
                initial={{ opacity: 0, scale: 0 }}
                exit={{ opacity: 0, scale: 0 }}
                className="absolute -top-0.5 right-0 flex size-4 items-center justify-center rounded-full bg-green-300/80 text-xs font-bold text-black dark:bg-primary"
              >
                {cart.length}
              </motion.span>
            )}
          </AnimatePresence>
          <ShoppingBag className="size-6" />
        </div>
      </DrawerTrigger>
      <DrawerContent className="min-h-50vh">
        <DrawerHeader>
          <DrawerTitle className="text-center">
            <span>장바구니 진행사항</span>
          </DrawerTitle>
        </DrawerHeader>
        <div className="overflow-auto p-4">
          <CartItems />
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default CartDrawer;
