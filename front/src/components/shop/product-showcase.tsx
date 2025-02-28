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
import { ProductVariantType } from "@/types";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface ProductShowcaseProps {
  variant: ProductVariantType;
}

const ProductShowcase = ({ variant }: ProductShowcaseProps) => {
  const [api, setApi] = useState<CarouselApi>();
  const [activeThumbnail, setActiveThumbnail] = useState([0]);
  const searchParams = useSearchParams();
  // const selectedColor = searchParams.get("type") || variants[0].productType;

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
    <>
      <figure>
        <Carousel setApi={setApi} opts={{ loop: true }}>
          <CarouselContent>
            {variant?.variantImages?.map((image, index) => (
              <CarouselItem key={index}>
                <Image
                  src={image.url}
                  width={1080}
                  height={220}
                  alt={image.fileName}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </figure>
      <figure className="flex gap-4 overflow-clip py-2">
        {variant?.variantImages?.map((image, index) => (
          <Image
            onClick={() => updatePreview(index)}
            key={index}
            src={image.url}
            width={72}
            height={48}
            alt={index.toString()}
            className={cn(
              index === activeThumbnail[0] ? "opacity-100" : "opacity-75",
              "cursor-pointer rounded-md transition-all duration-300 ease-in-out hover:opacity-75",
            )}
          />
        ))}
      </figure>
    </>
  );
};

export default ProductShowcase;
