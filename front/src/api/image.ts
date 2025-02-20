import { createInit, POST } from "./httpMethod";
import { END_POINTS } from "@/constants";

export interface UploadImageResponse {
  url: string;
  fileName: string;
  size: number;
}

export async function uploadImagesRequest(
  formData: FormData,
): Promise<UploadImageResponse[]> {
  const result = await POST<{ result: UploadImageResponse[] }>(
    END_POINTS.IMAGES_UPLOAD,
    createInit(formData),
  );

  if (!result) {
    throw new Error("이미지 업로드에 실패했습니다.");
  }

  return result.result;
}
