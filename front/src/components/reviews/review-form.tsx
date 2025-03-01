"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { ReviewsSchema, ReviewType } from "@/schemas";
import { useCreateReviewMutation } from "@/hooks/queries/reviews/useCreateReviewMutation";
toast;
const ReviewsForm = ({ productId }: { productId: number }) => {
  const form = useForm<ReviewType>({
    resolver: zodResolver(ReviewsSchema),
    defaultValues: {
      rating: 0,
      comment: "",
      productId,
    },
  });
  const { mutate: createReviewMutate, isPending } = useCreateReviewMutation();

  const onSubmit = (data: ReviewType) => {
    createReviewMutate(data);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="w-full">
          <Button className="w-full font-medium">리뷰 남기기</Button>
        </div>
      </PopoverTrigger>
      <PopoverContent>
        <Form {...form}>
          <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="comment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>리뷰를 남겨주세요</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="이 제품에 대해 생각하시는 점을 적어주세요"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="rating"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>별점을 남겨주세요</FormLabel>
                  <FormControl>
                    <Input type="hidden" placeholder="Star Rating" {...field} />
                  </FormControl>
                  <FormMessage />
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((value) => {
                      return (
                        <motion.div
                          className="reltive cursor-pointer"
                          whileTap={{ scale: 0.8 }}
                          whileHover={{ scale: 1.2 }}
                          key={value}
                        >
                          <Star
                            key={value}
                            onClick={() => {
                              form.setValue("rating", value, {
                                shouldValidate: true,
                              });
                            }}
                            className={cn(
                              "bg-transparent text-primary transition-all duration-300 ease-in-out",
                              form.getValues("rating") >= value
                                ? "fill-primary"
                                : "fill-muted",
                            )}
                          />
                        </motion.div>
                      );
                    })}
                  </div>
                </FormItem>
              )}
            />
            <Button disabled={isPending} className="w-full" type="submit">
              {isPending ? "리뷰 등록중.." : "리뷰 작성하기"}
            </Button>
          </form>
        </Form>
      </PopoverContent>
    </Popover>
  );
};

export default ReviewsForm;
