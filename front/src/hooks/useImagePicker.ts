import { useState } from "react";
import useMutateImages from "./queries/useMutateImages";

interface ImageUri {
  id?: number;
  url: string;
  fileName: string;
  size: number;
}

interface UseImagePickerProps {
  initialImages: ImageUri[];
  isProfile?: boolean;
}

function useImagePicker({
  initialImages = [],
  isProfile = false,
}: UseImagePickerProps) {
  const [images, setImages] = useState(initialImages);
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  const uploadImages = useMutateImages();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (!files || files.length === 0) {
      return;
    }

    const formData = new FormData();
    const fileArray = isProfile ? [files[0]] : Array.from(files).slice(0, 5);

    console.log("파일 어레이: ", fileArray);

    //blob url 생성 후 previewImages에 추가
    const newUrls = fileArray.map((file) => URL.createObjectURL(file));
    setPreviewImages((prev) => [...prev, ...newUrls]);

    fileArray.forEach((file) => {
      formData.append("images", file);
    });

    uploadImages.mutate(formData, {
      onSuccess: (data) => {
        console.log("upload된 데이타", data);
        setImages((prev) => [...prev, ...data]);
      },
      onError: (error) => {
        console.error("업로드 실패: ", error);
      },
    });
  };

  const handleFileRemove = (url: string, index: number) => {
    URL.revokeObjectURL(url);
    setPreviewImages((prev) => prev.filter((_, i) => i !== index));
  };
  return { handleImageChange, images, previewImages, handleFileRemove };
}

export default useImagePicker;
