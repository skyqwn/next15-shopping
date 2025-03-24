import { useState } from "react";
import { UseFormGetValues, UseFormSetValue } from "react-hook-form";

import useMutateImages from "./queries/useMutateImages";

interface UseImagePickerProps {
  fieldName: string;
  isProfile?: boolean;
  setValue: UseFormSetValue<any>;
  getValues: UseFormGetValues<any>;
}

function useImagePicker({
  isProfile = false,
  fieldName,
  getValues,
  setValue,
}: UseImagePickerProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const uploadImages = useMutateImages();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (!files || files.length === 0) {
      return;
    }

    const formData = new FormData();
    const fileArray = isProfile ? [files[0]] : Array.from(files).slice(0, 5);

    const previewUrl = URL.createObjectURL(fileArray[0]);
    setPreviewUrl(previewUrl);

    fileArray.forEach((file) => {
      formData.append("images", file);
    });

    uploadImages.mutate(formData, {
      onSuccess: (data) => {
        if (!Array.isArray(data)) {
          console.error("잘못된 응답 형식:", data);
          return;
        }
        console.log("데이터", data);

        if (isProfile) {
          const profileImage = data.length > 0 ? data[0].url : null;
          setValue(fieldName, profileImage);
        } else {
          const existingImages = getValues(fieldName) || [];
          const newImages = data.map((img) => ({
            url: img.url,
            fileName: img.fileName,
            size: img.size,
            blurThumb: img.blurThumb,
          }));
          setValue(fieldName, [...existingImages, ...newImages]);
        }
      },
      onError: (error) => {
        console.error("업로드 실패: ", error);
      },
    });
  };

  const handleFileRemove = (url: string) => {
    if (isProfile) {
      setValue(fieldName, null);
    } else {
      const currentImages = getValues(fieldName) || [];
      console.log("currentImages", currentImages);
      const updatedImages = currentImages.filter(
        (image: any) => image.url !== url,
      );
      setValue(fieldName, updatedImages);
    }
  };

  return { handleImageChange, previewUrl, handleFileRemove };
}

export default useImagePicker;
