"use client";

import Image from "next/image";
import { useMemo } from "react";
import { MinusCircle, PlusCircle } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import Lottie from "lottie-react";
import { createId } from "@paralleldrive/cuid2";
import {
  Table,
  TableBody,
  TableHeader,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/store";
import emptyCart from "../../../public/empty-box.json";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

const CartItems = () => {
  const router = useRouter();
  const { cart, addToCart, removeFromCart, setCheckoutProgress } =
    useCartStore();
  const totalPrice = useMemo(() => {
    return cart.reduce((acc, item) => {
      return acc + item.price * item.variant.quantity;
    }, 0);
  }, [cart]);

  const priceInLetters = useMemo(() => {
    return [...totalPrice.toString()].map((letter) => {
      return { letter, id: createId() };
    });
  }, [totalPrice]);

  return (
    <motion.div className="flex flex-col items-center">
      {cart.length === 0 && (
        <div className="flex w-full flex-col items-center justify-center">
          <motion.div
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-center text-2xl text-muted-foreground">
              장바구니가 비었습니다.
            </h2>
            <Lottie className="h-64" animationData={emptyCart} />
          </motion.div>
        </div>
      )}
      {cart.length > 0 && (
        <div className="max-h-80 w-full overflow-y-auto">
          <Table className="mx-auto max-w-2xl">
            <TableHeader>
              <TableRow>
                <TableCell>상품</TableCell>
                <TableCell>이미지</TableCell>
                <TableCell>수량</TableCell>
                <TableCell>가격</TableCell>
                <TableCell>총합</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cart.map((item) => (
                <TableRow key={item.variant.variantId}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>
                    <div>
                      <Image
                        className="rounded-md"
                        src={item.image}
                        width={48}
                        height={48}
                        alt={item.name}
                      />
                    </div>
                  </TableCell>
                  <TableCell>{item.variant.quantity}</TableCell>
                  <TableCell>{formatPrice(item.price)}원</TableCell>
                  <TableCell>
                    <div className="flex items-center justify-between gap-2">
                      <MinusCircle
                        className="cursor-pointer transition-colors duration-300 hover:text-muted-foreground"
                        onClick={() => {
                          removeFromCart({
                            ...item,
                            variant: {
                              quantity: 1,
                              variantId: item.variant.variantId,
                            },
                          });
                        }}
                        size={14}
                      />
                      <p className="text-md font-bold">
                        {item.variant.quantity}
                      </p>
                      <PlusCircle
                        className="cursor-pointer transition-colors duration-300 hover:text-muted-foreground"
                        onClick={() => {
                          addToCart({
                            ...item,
                            variant: {
                              quantity: 1,
                              variantId: item.variant.variantId,
                            },
                          });
                        }}
                        size={14}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
      <motion.div className="relative my-4 flex items-center justify-center overflow-hidden">
        <span className="text-md">총합: ₩ </span>
        <AnimatePresence mode="popLayout">
          {priceInLetters.map((letter, i) => (
            <motion.div key={letter.id}>
              <motion.span
                initial={{ y: 20 }}
                animate={{ y: 0 }}
                exit={{ y: -20 }}
                transition={{ delay: i * 0.1 }}
                className="text-md inline-block"
              >
                {letter.letter}
              </motion.span>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
      <Button
        onClick={() => {
          setCheckoutProgress("shippingInfo-page");
        }}
        className="w-full max-w-md"
        disabled={cart.length === 0}
      >
        구매하기
      </Button>
    </motion.div>
  );
};

export default CartItems;
