"use client";

import { useReviewDetailQuery } from "@/hooks/queries/reviews/useReviewsQuery";
import Review from "./review";
import ReviewForm from "./review-form";
import ReviewChart from "./review-chart";

const Reviews = ({ productId }: { productId: number }) => {
  const { data } = useReviewDetailQuery(productId);
  const reviewData = data?.result || [];
  return (
    <section className="py-4">
      <div className="flex flex-col justify-stretch gap-2 lg:flex-row lg:gap-12">
        <div className="flex-1">
          <h2 className="mb-4 text-2xl font-bold">상품 리뷰</h2>
          <ReviewForm productId={productId} />
          <Review reviews={reviewData} />
        </div>
        <div className="flex flex-1 flex-col gap-2">
          <ReviewChart reviews={reviewData} />
        </div>
      </div>
    </section>
  );
};

export default Reviews;
