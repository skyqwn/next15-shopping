import { createInit, POST } from "@/api/httpMethod";
import { END_POINTS, queryKeys } from "@/constants";
import { BannerType } from "@/schemas/banner.schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const postCreateBanner = async (createBannerForm: BannerType) => {
  const data = await POST(
    END_POINTS.CREATE_BANNER,
    createInit(createBannerForm),
  );

  return data;
};

export const useCreateBannerMutation = () => {
  const queryClient = useQueryClient();

  const createBannerMutation = useMutation({
    mutationFn: postCreateBanner,
    onSuccess: () => {
      toast.success("배너가 등록되었습니다.");
      queryClient.invalidateQueries({ queryKey: [queryKeys.BANNER] });
    },
    onError: (error: unknown) => {
      if (error instanceof Error) {
        console.log(error);
        toast.error(error.message);
      } else {
        toast.error("예기치 못한 에러가 발생했습니다.");
      }
    },
  });

  return createBannerMutation;
};
