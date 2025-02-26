"use client";

import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ProductVariant } from "@/hooks/queries/products/useProductDetailQuery";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface ProductShowcaseProps {
  variants: ProductVariant[];
}

const ProductShowcase = ({ variants }: ProductShowcaseProps) => {
  const [api, setApi] = useState<CarouselApi>();
  const [activeThumbnail, setActiveThumbnail] = useState([0]);
  const searchParams = useSearchParams();
  // const selectedColor = searchParams.get("type") || variants[0].productType;
  console.log("variants", variants);
  const updatePreview = (index: number) => {
    api?.scrollTo(index);
  };
  useEffect(() => {
    if (!api) {
      return;
    }
    api.on("slidesInView", (e) => {
      setActiveThumbnail(e.slidesInView());
    });
  }, [api]);

  return (
    <div>test</div>
    // <Carousel setApi={setApi} opts={{ loop: true }}>
    //   <CarouselContent>
    //     {variants.map(
    //       (variant) =>
    //         variant.productType === selectedColor &&
    //         variant.variantImages.map((img: any) => {
    //           return (
    //             <CarouselItem key={img.url}>
    //               {img.url ? (
    //                 <Image
    //                   priority
    //                   className="rounded-md"
    //                   width={1280}
    //                   height={720}
    //                   src={img.url}
    //                   alt={img.name}
    //                 />
    //               ) : null}
    //             </CarouselItem>
    //           );
    //         }),
    //     )}
    //   </CarouselContent>
    //   <div className="flex gap-4 overflow-clip py-2">
    //     {variants.map(
    //       (variant) =>
    //         variant.productType === selectedColor &&
    //         variant.variantImages.map((img, index) => {
    //           return (
    //             <div key={img.url}>
    //               {img.url ? (
    //                 <Image
    //                   priority
    //                   onClick={() => updatePreview(index)}
    //                   className={cn(
    //                     index === activeThumbnail[0]
    //                       ? "opacity-100"
    //                       : "opacity-75",
    //                     "cursor-pointer rounded-md transition-all duration-300 ease-in-out hover:opacity-75",
    //                   )}
    //                   width={72}
    //                   height={48}
    //                   src={img.url}
    //                   alt={img.fileName}
    //                 />
    //               ) : null}
    //             </div>
    //           );
    //         }),
    //     )}
    //   </div>
    // </Carousel>
  );
};

export default ProductShowcase;
