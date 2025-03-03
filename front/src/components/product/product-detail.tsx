import React from "react";

import { formatPrice } from "@/lib/utils";
import { ProductVariantType } from "@/types";

import ProductShowcase from "../shop/product-showcase";
import { Separator } from "../ui/separator";
import ReviewsContainer from "../reviews/reviews-container";
import ProductPick from "../shop/product-pick";
import ProductType from "../shop/product-type";
import ProductReviewStarts from "../shop/product-review-stars";
import { Truck } from "lucide-react";
import ProductAddCart from "../shop/product-add-cart";
import ParserHtml from "../common/parser-html";

interface ProductDetailProps {
  productVariant: ProductVariantType;
}

const ProductDetail = ({ productVariant }: ProductDetailProps) => {
  if (productVariant === null) return null;
  return (
    <main className="min-h-screen p-4">
      <div className="flex flex-col gap-4 lg:flex-row lg:gap-12">
        <section className="flex-1">
          <ProductShowcase variant={productVariant} />
        </section>

        <div className="flex flex-1 flex-col gap-2">
          <h2 className="text-2xl font-bold">
            {productVariant?.product.title}
          </h2>
          <ProductType variant={productVariant?.product.productVariants!} />
          <div>
            <ProductReviewStarts reviews={productVariant?.product.reviews} />
          </div>
          <Separator className="my-2" />
          <p className="py-2 text-2xl font-medium">
            {formatPrice(productVariant.product!.price!)}원
          </p>
          <figure className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <Truck />
              <p className="font-semibold">무료배송</p>
            </div>
          </figure>
          <Separator />
          <ParserHtml dirtyHtml={productVariant.product.description} />
          <Separator />
          <p className="mb-2 font-medium text-secondary-foreground">
            Available Colors
          </p>
          <div className="flex gap-4">
            {productVariant?.product.productVariants?.map((prodVariant) => (
              <ProductPick
                key={prodVariant.id}
                prodcutVariantId={prodVariant.id}
                productType={prodVariant.productType}
                color={prodVariant.color}
              />
            ))}
          </div>
          <ProductAddCart />
        </div>
      </div>
      <div className="mt-10">
        <ReviewsContainer productId={productVariant.productId} />
      </div>
    </main>
  );
};

export default ProductDetail;
