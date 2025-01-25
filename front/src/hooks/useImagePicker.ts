import { useEffect, useState } from "react";
import useMutateImages from "./queries/useMutateImages";
import { Control, FieldValues, useFieldArray } from "react-hook-form";
import { url } from "inspector";

interface ImageUri {
  id?: number;
  url: string;
  fileName: string;
  size: number;
}

interface UseImagePickerProps {
  fields: any[];
  append: (value: any) => void;
  remove: (index: number) => void;
  isProfile?: boolean;
}

function useImagePicker({
  isProfile = false,
  fields,
  append,
  remove,
}: UseImagePickerProps) {
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  const uploadImages = useMutateImages();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (!files || files.length === 0) {
      return;
    }

    const formData = new FormData();
    const fileArray = isProfile ? [files[0]] : Array.from(files).slice(0, 5);

    //blob url 생성 후 previewImages에 추가
    const newUrls = fileArray.map((file) => URL.createObjectURL(file));
    setPreviewImages((prev) => [...prev, ...newUrls]);

    fileArray.forEach((file) => {
      formData.append("images", file);
    });

    uploadImages.mutate(formData, {
      onSuccess: (data) => {
        // setImages((prev) => {
        //   const newImages = data.filter(
        //     (image: ImageUri) =>
        //       !prev.some((existingImage) => existingImage.url === image.url),
        //   );
        //   return isProfile ? newImages : [...prev, ...newImages];
        // });
        // 필드에 업로드된 이미지를 추가
        if (isProfile) {
          remove(0); // 프로필 이미지이므로 항상 첫 번째 필드만 남김
          data.slice(0, 1).forEach((uploadedImage: any) => {
            append({
              url: uploadedImage.url,
            });
          });
        } else {
          data.forEach((uploadedImage: any) => {
            append({
              url: uploadedImage.url,
              size: uploadedImage.size,
              fileName: uploadedImage.fileName,
            });
          });
        }
      },
      onError: (error) => {
        console.error("업로드 실패: ", error);
      },
    });
  };

  const handleFileRemove = (index: number) => {
    remove(index);
  };

  return { handleImageChange, previewImages, handleFileRemove };
}

export default useImagePicker;
