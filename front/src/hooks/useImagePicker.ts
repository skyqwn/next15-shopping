import { useEffect, useState } from "react";
import useMutateImages from "./queries/useMutateImages";
import {
  Control,
  FieldValues,
  useFieldArray,
  useFormContext,
  UseFormGetValues,
  UseFormSetValue,
} from "react-hook-form";
import { url } from "inspector";

interface ImageUri {
  id?: number;
  url: string;
  fileName: string;
  size: number;
}

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
        if (isProfile) {
          // 프로필 이미지: 문자열로 저장
          const profileImage = data[0]?.url || null;
          setValue(fieldName, profileImage);
        } else {
          // 배열로 설정
          const existingImages = getValues(fieldName) || [];
          setValue(fieldName, [...existingImages, ...data]);
        }
      },
      onError: (error) => {
        console.error("업로드 실패: ", error);
      },
    });
  };

  const handleFileRemove = (url: string) => {
    if (isProfile) {
      setValue(fieldName, null); // 프로필은 단일 값이므로 null로 초기화
    } else {
      const currentImages = getValues(fieldName) || [];
      console.log("currentImages", currentImages);
      const updatedImages = currentImages.filter(
        (image: any) => image.url !== url,
      );
      setValue(fieldName, updatedImages);
    }
  };

  return { handleImageChange, previewImages, handleFileRemove };
}

export default useImagePicker;
