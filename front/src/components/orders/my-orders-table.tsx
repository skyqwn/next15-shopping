"use client";

import { useEffect, useState } from "react";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import { useMyProfileQuery } from "@/hooks/queries/userInfo/useUserInfo";
import { useUserOrderQuery } from "@/hooks/queries/orders/useUserOrdersQuery";
import { Skeleton } from "../ui/skeleton";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { MoreHorizontal } from "lucide-react";
import Image from "next/image";
import { OrderProductType } from "@/types/order";
dayjs.extend(relativeTime);
dayjs.locale("ko");

const MyOrdersTable = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const { data: profileData, isLoading: isProfileLoading } =
    useMyProfileQuery();

  const userId = profileData?.data?.id;

  const { data: ordersData, isLoading: isOrdersLoading } =
    useUserOrderQuery(userId);

  const orders = ordersData?.result || [];
  const isLoading = isProfileLoading || isOrdersLoading || !isMounted;

  if (!isMounted || isLoading) {
    return (
      <div className="space-y-4">
        <h2 className="text-xl font-bold">내 주문 내역</h2>
        <div className="space-y-2">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-20 w-full" />
          ))}
        </div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="space-y-4">
        <h2 className="text-xl font-bold">내 주문 내역</h2>
        <p className="py-10 text-center text-muted-foreground">
          아직 주문 내역이 없습니다.
        </p>
      </div>
    );
  }

  return (
    <Card className="p-6">
      <CardHeader>
        <CardTitle>주문 내역</CardTitle>
        <CardDescription>Card Description</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>주문 번호</TableHead>
              <TableHead>총합</TableHead>
              <TableHead>주문 상태</TableHead>
              <TableHead>주문 일자</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.id}</TableCell>
                <TableCell>{order.totalPrice}원</TableCell>
                <TableCell>
                  <Badge
                    className={
                      order.status === "cancelled"
                        ? "bg-green-500"
                        : "bg-secondary-foreground"
                    }
                  >
                    {order.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-xs font-medium">
                  {dayjs(order.createdAt).format("YYYY-MM-DD HH:mm")}
                </TableCell>
                <TableCell>
                  <Dialog>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant={"ghost"}>
                          <MoreHorizontal size={16} />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem>
                          <DialogTrigger asChild>
                            <Button className="w-full" variant={"ghost"}>
                              자세히 보기
                            </Button>
                          </DialogTrigger>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>주문 상세보기 #{order.id}</DialogTitle>
                        <DialogDescription>
                          모든 주문의 총액: ${order.totalPrice}
                        </DialogDescription>
                        <Card className="flex flex-col gap-4 overflow-auto p-2">
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>상품 이미지</TableHead>
                                <TableHead>가격</TableHead>
                                <TableHead>상품</TableHead>
                                <TableHead>색상</TableHead>
                                <TableHead>수량</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {order.orderProducts.map(
                                ({
                                  product,
                                  productVariants,
                                  quantity,
                                }: OrderProductType) => (
                                  <TableRow key={product?.id}>
                                    <TableCell>
                                      <Image
                                        src={
                                          productVariants?.variantImages[0]
                                            .url ?? ""
                                        }
                                        width={48}
                                        height={48}
                                        alt={product!.title}
                                      />
                                    </TableCell>
                                    <TableCell>{product!.title}</TableCell>
                                    <TableCell>
                                      {productVariants!.productType}
                                    </TableCell>
                                    <TableCell>
                                      <div
                                        style={{
                                          background: productVariants!.color,
                                        }}
                                        className="size-4 rounded-full"
                                      />
                                    </TableCell>
                                    <TableCell>{quantity}</TableCell>
                                  </TableRow>
                                ),
                              )}
                            </TableBody>
                          </Table>
                        </Card>
                      </DialogHeader>
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default MyOrdersTable;
