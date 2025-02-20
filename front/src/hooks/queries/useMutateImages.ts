import { uploadImagesRequest } from "@/api/image";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

function useMutateImages() {
  return useMutation({
    mutationFn: uploadImagesRequest,
    onError: (error) => {
      console.error("이미지 업로드 에러:", error);
      toast.error("이미지 업로드에 실패했습니다.");
    },
  });
}

export default useMutateImages;
