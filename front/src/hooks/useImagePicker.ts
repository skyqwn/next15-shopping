import { useState } from "react";
import useMutateImages from "./queries/useMutateImages";

interface ImageUri {
  id?: number;
  uri: string;
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
  const uploadImages = useMutateImages();
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (!files || files.length === 0) {
      return;
    }
    const fileArray = isProfile ? [files[0]] : Array.from(files).slice(0, 5);

    const formData = new FormData();

    fileArray.forEach((file) => {
      formData.append("images", file);
    });

    uploadImages.mutate(formData, {
      onSuccess: (data) => {
        setImages(data);
      },
    });
  };
  return { handleImageChange, images };
}

export default useImagePicker;
