import { Suspense } from "react";
import Reviews from "./reviews";
import { ServerFetchBoundary } from "../prefetch-boundary";
import { getReviewDetailQueryOptions } from "@/hooks/queries/reviews/useReviewsQuery";

const ReviewsContainer = ({ productId }: { productId: number }) => {
  const serverFetchOptions = [getReviewDetailQueryOptions(productId)];

  return (
    <Suspense fallback={"프로덕트로딩 "}>
      <ServerFetchBoundary fetchOptions={serverFetchOptions}>
        <Reviews productId={productId} />
      </ServerFetchBoundary>
    </Suspense>
  );
};

export default ReviewsContainer;
