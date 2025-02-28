"use client";

import Image from "next/image";

import { ColumnDef } from "@tanstack/react-table";
import ActionCell from "./action-cell";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { PlusCircle } from "lucide-react";
import ProductVariant from "./product-variant";
import { ProductVariantType } from "@/types";

export type ProductColumn = {
  title: string;
  price: number;
  image: string;
  variants: ProductVariantType[];
  id: number;
};

export const columns: ColumnDef<ProductColumn>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "title",
    header: "TITLE",
  },
  {
    accessorKey: "variants",
    header: "Variants",
    cell: ({ row }) => {
      const variants = row.getValue("variants") as ProductVariantType[];
      return (
        <div className="flex gap-2">
          {variants.map((variant) => (
            <div key={variant.id}>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <ProductVariant
                      productId={variant.productId}
                      variant={variant}
                      editMode={true}
                    >
                      <div
                        className="size-5 rounded-full"
                        key={variant.id}
                        style={{
                          background: variant.color,
                          border: "1px solid #c0b7b7",
                        }}
                      />
                    </ProductVariant>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{variant.productType}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          ))}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <span>
                  <ProductVariant editMode={false} productId={row.original.id}>
                    <PlusCircle className="size-5" />
                  </ProductVariant>
                </span>
              </TooltipTrigger>
              <TooltipContent>
                <p>Create a new product Variant</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      );
    },
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => {
      const price = parseInt(row.getValue("price"));
      const formaated = new Intl.NumberFormat("ko-KR", {
        style: "currency",
        currency: "KRW",
      }).format(price);
      return <span className="text-xs font-medium">{formaated}</span>;
    },
  },
  {
    accessorKey: "image",
    header: "Image",
    cell: ({ row }) => {
      const cellImage = row.getValue("image") as string;
      const cellTitle = row.getValue("title") as string;
      return (
        <div className="">
          <Image
            src={cellImage}
            alt={cellTitle}
            width={50}
            height={50}
            className="rounded-md"
          />
        </div>
      );
    },
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: ActionCell,
  },
];
