"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  loadPaymentWidget,
  PaymentWidgetInstance,
} from "@tosspayments/payment-widget-sdk";
import { nanoid } from "nanoid";
import { useCartStore } from "@/store";
import { toast } from "sonner";
import { useMyProfileQuery } from "@/hooks/queries/userInfo/useUserInfo";
import { Button } from "../ui/button";

export default function CheckoutPage() {
  const { data } = useMyProfileQuery();
  const userData = data?.data;

  console.log("userData", userData);

  const { checkoutProgress, setCheckoutProgress, cart, isDrawerOpen } =
    useCartStore();
  const paymentWidgetRef = useRef<PaymentWidgetInstance | null>(null);
  const paymentMethodsWidgetRef = useRef<ReturnType<
    PaymentWidgetInstance["renderPaymentMethods"]
  > | null>(null);
  const [price, setPrice] = useState(50000); // 결제 금액 (예: 50,000원)
  const clientKey =
    process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY ||
    "test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm";
  const customerKey = nanoid(); // 고객 식별용 고유 키 (비회원 결제 시 랜덤 생성)
  const totalPrice = useMemo(() => {
    return cart.reduce((acc, item) => {
      return acc + item.price * item.variant.quantity;
    }, 0);
  }, [cart]);

  // 결제 위젯 초기화 및 렌더링
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

  // 금액 업데이트 (예: 쿠폰 적용 시)
  useEffect(() => {
    const paymentMethodsWidget = paymentMethodsWidgetRef.current;
    if (paymentMethodsWidget) {
      paymentMethodsWidget.updateAmount(totalPrice);
    }
  }, [totalPrice]);

  // 결제 요청 함수
  const handlePaymentRequest = async () => {
    useCartStore.setState({ isDrawerOpen: false });

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
      useCartStore.setState({
        cart: [],
        isDrawerOpen: true,
        checkoutProgress: "confirmation-page",
      });
    } catch (error) {
      console.log(error);
      console.error("결제 요청 실패:", error);
    }
  };

  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center justify-center">
      <div id="payment-widget" className="w-full" />
      {/* <div>
        <label>
          <input
            type="checkbox"
            onChange={(e) =>
              setPrice(e.target.checked ? price - 10000 : price + 10000)
            }
            onClick={(e) => e.stopPropagation()}
          />
          10,000원 할인 쿠폰 적용
        </label>
      </div> */}
      <Button className="w-2/3 p-6" onClick={handlePaymentRequest}>
        결제하기
      </Button>
    </div>
  );
}
