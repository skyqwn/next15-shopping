import uploadImage from "@/api/image";
import { useMutation } from "@tanstack/react-query";

function useMutateImages() {
  return useMutation({
    mutationFn: uploadImage,
  });
}

export default useMutateImages;
