import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(num: number): string {
  return num.toLocaleString("ko-KR");
}

export const getReviewAverage = (reviews: number[]) => {
  if (reviews.length === 0) return 0;
  return reviews.reduce((acc, review) => acc + review, 0) / reviews.length;
};
