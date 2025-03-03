import { Row } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDeleteProductMutation } from "@/hooks/queries/products/useDeleteProductMutation";

import { Button } from "../ui/button";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { BannerTableType } from "./banner-columns";

const BannerActionCell = ({ row }: { row: Row<BannerTableType> }) => {
  const product = row.original;
  const { mutate: deleteProductMutate } = useDeleteProductMutation();
  const handleDeleteProduct = () => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      deleteProductMutate(product.id);
    } else {
      return;
    }
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"ghost"} className="size-8 p-0">
          <MoreHorizontal className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="*:cursor-pointer">
        <DropdownMenuItem asChild className="focus:bg-primary/30">
          <Link href={`/admin/products/${product.id}/edit`}>Edit</Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={handleDeleteProduct}
          className="focus:bg-destructive/50 dark:focus:bg-destructive"
        >
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default BannerActionCell;
