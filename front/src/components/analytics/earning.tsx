"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Badge } from "../ui/badge";
import { useRouter, useSearchParams } from "next/navigation";
import { cn, formatPrice } from "@/lib/utils";
import { useMemo } from "react";
import { weeklyChart } from "./weekly-chart";
import { Bar, BarChart, ResponsiveContainer, Tooltip } from "recharts";
import { monthlyChart } from "./monthly.chart";
import { OrderProduct } from "@/types/order-product";

export default function Earnings({
  totalOrders,
}: {
  totalOrders: OrderProduct[];
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const filter = searchParams.get("filter") || "week";

  const chartItmes = totalOrders.map((order) => ({
    date: order.order.createdAt,
    revenue: order.order.totalPrice,
  }));

  const activeChart = useMemo(() => {
    const weekly = weeklyChart(chartItmes);
    const monthly = monthlyChart(chartItmes);

    if (filter === "week") return weekly;
    if (filter === "month") return monthly;
    return weekly;
  }, [filter]);

  const activeTotal = useMemo(() => {
    if (filter === "month") {
      return monthlyChart(chartItmes).reduce(
        (acc, item) => acc + item.revenue,
        0,
      );
    }
    return weeklyChart(chartItmes).reduce((acc, item) => acc + item.revenue, 0);
  }, [filter]);

  return (
    <Card className="h-full flex-1 shrink-0">
      <CardHeader>
        <CardTitle>총합: ₩{formatPrice(activeTotal)}</CardTitle>
        <CardDescription>최근 수익입니다.</CardDescription>
        <div className="flex items-center gap-2">
          <Badge
            className={cn(
              "cursor-pointer",
              filter === "week" ? "bg-primary" : "bg-primary/25",
            )}
            onClick={() =>
              router.push(`/admin/analytics/?filter=week`, {
                scroll: false,
              })
            }
          >
            This Week
          </Badge>
          <Badge
            className={cn(
              "cursor-pointer",
              filter === "month" ? "bg-primary" : "bg-primary/25",
            )}
            onClick={() =>
              router.push(`/admin/analytics/?filter=month`, {
                scroll: false,
              })
            }
          >
            This Month
          </Badge>
        </div>
        <CardContent className="h-96">
          <ResponsiveContainer width="100%" height={"100%"}>
            <BarChart data={activeChart}>
              <Tooltip
                content={(props) => (
                  <div>
                    {props.payload?.map((item) => (
                      <div
                        className="rounded-md bg-white px-4 py-2 shadow-lg"
                        key={item.payload.date}
                      >
                        <p>Revenue: {item.value}</p>
                        <p>Date: {item.payload.date}</p>
                      </div>
                    ))}
                  </div>
                )}
              />
              <Bar dataKey="revenue" className="fill-primary" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </CardHeader>
    </Card>
  );
}
