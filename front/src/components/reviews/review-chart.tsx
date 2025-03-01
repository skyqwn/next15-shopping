"use client";

import { getReviewAverage } from "@/lib/utils";
import { ReviewType } from "@/types";
import React, { useMemo } from "react";
import { Card, CardDescription, CardTitle } from "../ui/card";
import Stars from "./stars";
import { Progress } from "../ui/progress";

const ReviewChart = ({ reviews }: { reviews: ReviewType[] }) => {
  const totalRating = getReviewAverage(reviews.map((review) => review.rating));

  const getRatingByStars = useMemo(() => {
    const ratingValues = Array.from({ length: 5 }, () => 0);
    const totalReviews = reviews.length;
    reviews.forEach((review) => {
      const starIndex = review.rating - 1;
      if (starIndex >= 0 && starIndex < 5) {
        ratingValues[starIndex]++;
      }
    });
    return ratingValues.map((rating) => (rating / totalReviews) * 100);
  }, [reviews]);

  return (
    <Card className="flex flex-col gap-4 rounded-md p-8">
      <div className="flex flex-col gap-2">
        <CardTitle>Product Rating:</CardTitle>
        <Stars size={18} rating={totalRating} totalReviews={reviews.length} />
        <CardDescription className="text-lg font-medium">
          {totalRating.toFixed(1)}
        </CardDescription>
      </div>
      {getRatingByStars.map((rating, index) => (
        <div key={index} className="flex items-center justify-between gap-2">
          <p className="flex gap-1 text-xs font-medium">
            {index + 1} <span>stars</span>
          </p>
          <Progress value={rating} />
        </div>
      ))}
    </Card>
  );
};

export default ReviewChart;
