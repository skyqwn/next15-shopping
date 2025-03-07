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
import CartMessage from "./cart-message";
import { useEffect, useState } from "react";
import CheckoutPage from "./cart-checkout";
import OrderConfirmed from "./order-confirm";
import CartShipInfo from "./cart-ship-info";
import CartProgres from "./cart-progress";

const CartDrawer = () => {
  const { cart, checkoutProgress, isDrawerOpen } = useCartStore();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(isDrawerOpen);
  }, [isDrawerOpen]);

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    useCartStore.setState({ isDrawerOpen: isOpen });
  };

  return (
    <Drawer open={open} onOpenChange={handleOpenChange}>
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
            <CartMessage />
          </DrawerTitle>
        </DrawerHeader>
        <CartProgres />
        <div className="overflow-auto p-4">
          {checkoutProgress === "cart-page" && <CartItems />}
          {checkoutProgress === "shippingInfo-page" && <CartShipInfo />}
          {checkoutProgress === "payment-page" && <CheckoutPage />}
          {checkoutProgress === "confirmation-page" && <OrderConfirmed />}
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default CartDrawer;
