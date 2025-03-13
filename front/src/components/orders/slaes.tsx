"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import Image from "next/image";
import { formatPrice } from "@/lib/utils";
import { Avatar, AvatarImage } from "../ui/avatar";
import { OrderProduct } from "@/types/order-product";

const Sales = ({ totalOrders }: { totalOrders: OrderProduct[] }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>New sales</CardTitle>
        <CardDescription>Check your sales and orders</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>주문 고객</TableHead>
              <TableHead>상품</TableHead>
              <TableHead>가격</TableHead>
              <TableHead>상품 수량</TableHead>
              <TableHead>상품 이미지</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {totalOrders.map(
              ({ order, product, quantity, productVariants }) => (
                <TableRow className="font-medium" key={order.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar>
                        <AvatarImage
                          src={order.user.imageUri ?? "./placeholder-user.jpg"}
                          width={25}
                          height={25}
                          alt={order.user.name}
                          className="rounded-full"
                        />
                      </Avatar>
                      <p className="text-xs font-medium">{order.user.name}</p>
                    </div>
                  </TableCell>
                  <TableCell>{product.title}</TableCell>
                  <TableCell>{formatPrice(product.price)}원</TableCell>
                  <TableCell>{quantity}개</TableCell>
                  <TableCell>
                    <Image
                      src={productVariants.variantImages[0].url}
                      width={48}
                      height={48}
                      alt={order.user.name}
                      className="rounded-md"
                    />
                  </TableCell>
                </TableRow>
              ),
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default Sales;
