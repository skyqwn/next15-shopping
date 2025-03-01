"use client";

import { motion } from "framer-motion";
import { useState } from "react";

import { ReviewType } from "@/types";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import ReviewCard from "./review-card";

const Review = ({ reviews }: { reviews: ReviewType[] }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const visibleReviews = reviews.slice(0, 4);
  const hasMoreReviews = reviews.length > 4;

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

      {reviews.length > 0 && (
        <>
          {visibleReviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}

          {hasMoreReviews && (
            <Button
              variant="outline"
              className="mt-2"
              onClick={() => setIsDialogOpen(true)}
            >
              모든 리뷰 보기 ({reviews.length}개)
            </Button>
          )}

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent className="max-h-[80vh] overflow-y-auto lg:max-w-5xl">
              <DialogHeader>
                <DialogTitle>고객 리뷰 ({reviews.length}개)</DialogTitle>
              </DialogHeader>
              <div className="flex flex-col gap-4 py-4">
                {reviews.map((review) => (
                  <ReviewCard key={review.id} review={review} />
                ))}
              </div>
            </DialogContent>
          </Dialog>
        </>
      )}
    </motion.div>
  );
};

export default Review;
