import React from "react";

import { cn, getReviewAverage } from "@/lib/utils";
import { Star } from "lucide-react";
import { ReviewType } from "@/types";

interface StarsProps {
  size?: number;
  reviews: ReviewType[];
}

const ProductReviewStarts = ({ reviews, size = 18 }: StarsProps) => {
  const totalReviewsCount = reviews.length;
  const ratingAverage = getReviewAverage(
    reviews.map((review) => review.rating),
  );

  return (
    <div className="flex items-center">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          size={size}
          key={star}
          className={cn(
            "bg-transparent text-primary transition-all duration-300 ease-in-out",
            ratingAverage >= star ? "fill-primary" : "fill-transparent",
          )}
        ></Star>
      ))}
      {totalReviewsCount ? (
        <span className="ml-2 text-sm font-bold text-secondary-foreground">
          {totalReviewsCount} reviews
        </span>
      ) : (
        <span className="text-xs">(0)</span>
      )}
    </div>
  );
};

export default ProductReviewStarts;
