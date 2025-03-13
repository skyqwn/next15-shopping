import { ApiResponse, createInit, PATCH } from "@/api/httpMethod";
import { END_POINTS, queryKeys } from "@/constants";
import { ProfileType } from "@/schemas";
import { GetUserInfoResponseType } from "@/types";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

async function updateProfileRequest(
  data: ProfileType,
): Promise<GetUserInfoResponseType> {
  const result = await PATCH<{ user: GetUserInfoResponseType }>(
    END_POINTS.USER_PROFILE_UPDATE,
    createInit(data),
  );

  if (!result) {
    throw new Error("프로필 업데이트에 실패했습니다.");
  }
  console.log("응답 데이터:", result);

  return result.result.user;
}

export const useUpdateProfileMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProfileRequest,
    onSuccess: () => {
      toast.success("프로필이 업데이트되었습니다.");
      queryClient.invalidateQueries({
        queryKey: [queryKeys.USER_INFO],
      });
    },
    onError: (error) => {
      console.error("프로필 업데이트 에러:", error);
      toast.error("프로필 업데이트에 실패했습니다.");
    },
  });
};
