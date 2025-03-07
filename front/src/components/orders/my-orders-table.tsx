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
  CardFooter,
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

  if (!isMounted) {
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

  if (isLoading) {
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
                              더 보기
                            </Button>
                          </DialogTrigger>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>주문 상세보기 #{order.id}</DialogTitle>
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
                                ({ product, productVariants, quantity }) => (
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

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">내 주문 내역 ({orders.length})</h2>

      <div className="space-y-4">
        {orders.map((order) => (
          <Card key={order.id} className="p-4">
            <div className="mb-2 flex items-center justify-between">
              <div>
                <span className="mr-2 text-sm text-muted-foreground">
                  주문번호: {order.id}
                </span>
                {/* <span className="text-sm text-muted-foreground">
                  {order.createdAt
                    ? format(new Date(order.createdAt), "yyyy-MM-dd HH:mm")
                    : "날짜 정보 없음"}
                </span> */}
              </div>
              {/* <Badge variant={getStatusBadgeVariant(order.status as string)}>
                {getStatusText(order.status as string)}
              </Badge> */}
            </div>

            <div className="space-y-2">
              {order.orderProducts.map((item) => (
                <div key={item.id} className="flex items-center border-b pb-2">
                  <div className="mr-3 h-16 w-16 flex-shrink-0">
                    {item.productVariants?.variantImages?.[0]?.url ? (
                      <img
                        src={item.productVariants.variantImages[0].url}
                        alt={item.product?.title || "상품 이미지"}
                        className="h-full w-full rounded object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center rounded bg-muted">
                        이미지 없음
                      </div>
                    )}
                  </div>

                  <div className="flex-grow">
                    <div className="font-medium">
                      {item.product?.title || "상품명 없음"}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {item.productVariants?.productType || "타입 정보 없음"} /
                      {item.quantity}개
                    </div>
                  </div>

                  <div className="font-medium">
                    {Intl.NumberFormat("ko-KR").format(
                      (item.product?.price || 0) * item.quantity,
                    )}
                    원
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 text-right font-bold">
              총 결제금액: {Intl.NumberFormat("ko-KR").format(order.totalPrice)}
              원
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MyOrdersTable;
