import { createInit, POST } from "./httpMethod";
import { END_POINTS } from "@/constants";

export interface UploadImageResponse {
  url: string;
  fileName: string;
  size: number;
  blurThumb?: string;
}

export async function uploadImagesRequest(
  formData: FormData,
): Promise<UploadImageResponse[]> {
  const result = await POST<UploadImageResponse[]>(
    END_POINTS.IMAGES_UPLOAD,
    createInit(formData),
  );

  if (!result.success || !result.result) {
    throw new Error("이미지 업로드에 실패했습니다.");
  }

  return result.result;
}
