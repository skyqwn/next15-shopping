"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { ArrowUpDown } from "lucide-react";
import ParserHtml from "../common/parser-html";
import BannerActionCell from "./banner-action-cell";

export interface BannerTableType {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
}

export const bannerColumns: ColumnDef<BannerTableType>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "imageUrl",
    header: "배너 이미지",
    cell: ({ row }) => {
      const imageUrl: string = row.getValue("imageUrl");
      return (
        <div className="relative h-16 w-16 overflow-hidden rounded-md">
          <Image
            src={imageUrl || "/placeholder.jpg"}
            alt={row.getValue("title")}
            fill
            className="object-cover"
          />
        </div>
      );
    },
  },
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          제목
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "description",
    header: "설명",
    cell: ({ row }) => {
      const description = row.getValue("description") as string;
      return (
        <div className="max-w-[300px] truncate">
          <ParserHtml dirtyHtml={description} />
        </div>
      );
    },
  },
  {
    id: "actions",
    header: "관리",
    cell: ({ row }) => {
      const banner = row.original;
      return <BannerActionCell row={row} />;
    },
  },
];
