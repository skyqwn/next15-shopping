import Image from "next/image";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";
dayjs.extend(relativeTime);
dayjs.locale("ko");

import { ReviewType } from "@/types";
import { Card } from "../ui/card";
import Stars from "./stars";

const ReviewCard = ({ review }: { review: ReviewType }) => (
  <Card className="p-4">
    <div className="flex items-center gap-2">
      <Image
        className="size-10 rounded-full"
        width={32}
        height={32}
        alt={review.user.name || "사용자"}
        src={review.user.imageUri ?? "/placeholder.jpg"}
      />
      <div>
        <p className="text-sm font-bold">{review.user.name}</p>
        <div className="flex items-center gap-2">
          <Stars rating={review.rating} />
          <p className="text-xs text-muted-foreground">
            {dayjs(review.createdAt).fromNow()}
          </p>
        </div>
      </div>
    </div>
    <p className="py-2 font-medium">{review.comment}</p>
  </Card>
);

export default ReviewCard;
