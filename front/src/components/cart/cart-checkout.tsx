"use client";

import React, { useEffect, useMemo, useRef } from "react";
import {
  loadPaymentWidget,
  PaymentWidgetInstance,
} from "@tosspayments/payment-widget-sdk";
import { nanoid } from "nanoid";
import { useCartStore } from "@/store";
import { toast } from "sonner";
import { useMyProfileQuery } from "@/hooks/queries/userInfo/useUserInfo";
import { Button } from "../ui/button";
import { useCreateOrderMutation } from "@/hooks/queries/orders/useCreateOrderMutation";

export default function CheckoutPage() {
  const { data } = useMyProfileQuery();
  const userData = data?.data;

  const { mutate: createOrderMutation, isPending } = useCreateOrderMutation();
  const { cart, setCartOpen } = useCartStore();

  const paymentWidgetRef = useRef<PaymentWidgetInstance | null>(null);
  const paymentMethodsWidgetRef = useRef<ReturnType<
    PaymentWidgetInstance["renderPaymentMethods"]
  > | null>(null);
  const clientKey =
    process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY ||
    "test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm";

  const customerKey = nanoid();

  const totalPrice = useMemo(() => {
    return cart.reduce((acc, item) => {
      return acc + item.price * item.variant.quantity;
    }, 0);
  }, [cart]);

  useEffect(() => {
    (async () => {
      const paymentWidget = await loadPaymentWidget(clientKey, customerKey);
      const paymentMethodsWidget = paymentWidget.renderPaymentMethods(
        "#payment-widget",
        { value: totalPrice },
      );

      paymentWidgetRef.current = paymentWidget;
      paymentMethodsWidgetRef.current = paymentMethodsWidget;
    })();
  }, [clientKey, customerKey, totalPrice]);

  useEffect(() => {
    const paymentMethodsWidget = paymentMethodsWidgetRef.current;
    if (paymentMethodsWidget) {
      paymentMethodsWidget.updateAmount(totalPrice);
    }
  }, [totalPrice]);

  const handlePaymentRequest = async () => {
    setCartOpen(false);

    const paymentWidget = paymentWidgetRef.current;
    if (!paymentWidget) return;

    try {
      await paymentWidget.requestPayment({
        orderId: nanoid(),
        orderName: "테스트 상품",
        // successUrl: `${window.location.origin}/success`,
        // failUrl: `${window.location.origin}/fail`,
        customerEmail: userData.email,
        customerName: userData.name,
      });
      createOrderMutation({
        orderProducts: cart.map((item) => ({
          productId: item.id,
          productVariantId: item.variant.variantId,
          quantity: item.variant.quantity,
        })),
        totalPrice,
        tossOrderId: nanoid(),
      });
      useCartStore.setState({
        cart: [],
        userInfo: null,
        isDrawerOpen: true,
        checkoutProgress: "confirmation-page",
      });
    } catch (error: any) {
      toast.error("결제를 취소하였습니다.");
    }
  };

  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center justify-center">
      <div id="payment-widget" className="w-full" />
      <Button
        disabled={isPending}
        className="w-full"
        onClick={handlePaymentRequest}
      >
        {isPending ? "결제중입니다..." : "결제하기"}
      </Button>
    </div>
  );
}
