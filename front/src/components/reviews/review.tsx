"use client";

import Image from "next/image";

import { motion } from "framer-motion";
import { Card } from "../ui/card";
import Stars from "./stars";
import { ReviewType } from "@/types";
const Review = ({ reviews }: { reviews: ReviewType[] }) => {
  console.log(`reviewsss`, reviews);
  return (
    <motion.div className="flex flex-col gap-4">
      {reviews.length === 0 && (
        <div className="mt-4 flex flex-col items-center justify-center rounded-xl border border-dashed border-muted-foreground/20 bg-muted/30 p-8">
          <div className="relative mb-4 h-24 w-24">
            <div className="absolute inset-0 flex animate-pulse items-center justify-center rounded-full bg-primary/10">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 text-primary"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"
                />
              </svg>
            </div>
          </div>

          <h3 className="mb-1 text-center text-lg font-semibold">
            아직 리뷰가 없습니다
          </h3>
          <p className="mb-4 text-center text-sm text-muted-foreground">
            가장 먼저 리뷰를 남겨 다른 고객들에게 도움을 주세요!
          </p>
        </div>
      )}
      {reviews.length > 0 &&
        reviews.map((review) => (
          <Card key={review.id} className="p-4">
            <div className="flex items-center gap-2">
              <Image
                className="size-10 rounded-full"
                width={32}
                height={32}
                alt={"asdasdsa"}
                src={review.user.imageUri ?? "/placeholder.jpn"}
              />
              <div>
                <p className="text-sm font-bold">{review.user.name}</p>
                <div className="flex items-center gap-2">
                  <Stars rating={review.rating} />
                  <p className="text-bold text-xs text-muted-foreground">
                    {/* {formatDistance(subDays(review.created!, 0), new Date())} */}
                  </p>
                </div>
              </div>
            </div>
            <p className="py-2 font-medium">{review.comment}</p>
          </Card>
        ))}
    </motion.div>
  );
};

export default Review;
