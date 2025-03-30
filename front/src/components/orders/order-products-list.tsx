"use client";

import React from "react";

import { useOrderProductsQuery } from "@/hooks/queries/orders/useOrderProductQuery";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import Sales from "./slaes";
import Earnings from "../analytics/earning";

const OrderProductsList = () => {
  const { data } = useOrderProductsQuery();
  const totalOrders = data.result;

  if (!totalOrders) return null;

  if (totalOrders.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>새로운 주문이 없습니다.</CardTitle>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Analytics</CardTitle>
        <CardDescription>새로운 주문들을 확인해주세요.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-8 lg:flex-row">
        <Sales totalOrders={totalOrders} />
        <Earnings totalOrders={totalOrders} />
      </CardContent>
    </Card>
  );
};

export default OrderProductsList;
