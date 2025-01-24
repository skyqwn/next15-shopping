"use client";

import { useFieldArray, useFormContext } from "react-hook-form";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Camera, XIcon } from "lucide-react";
import { VariantType } from "@/schemas";
import { useEffect } from "react";
import useImagePicker from "@/hooks/useImagePicker";

const VariantImages = () => {
  const { getValues, control, setError, setValue } =
    useFormContext<VariantType>();
  const { handleImageChange, images, previewImages, handleFileRemove } =
    useImagePicker({
      initialImages: [],
      isProfile: false,
    });

  const { fields, remove, append, move } = useFieldArray({
    control,
    name: "variantImages",
  });
  useEffect(() => {
    images.map((image) => {
      append({
        url: image.url,
        size: image.size,
        fileName: image.fileName,
      });
    });
  }, [images, setValue]);

  return (
    <div>
      <FormField
        control={control}
        name="color"
        render={({ field }) => (
          <FormItem>
            <FormLabel>사진 업로드</FormLabel>
            <div className="mt-4 flex items-center gap-10">
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageChange}
                className="hidden"
                id="file-input"
              />
              <label htmlFor="file-input" className="cursor-pointer">
                <Camera className="rounded-md border p-2" size={100} />
              </label>

              {/* 스크롤 가능한 사진 리스트 */}
              <div className="scrollbar-hide flex min-w-0 gap-4 overflow-x-auto">
                {previewImages.map((url, index) => (
                  <div key={index} className="relative flex-shrink-0">
                    <img
                      src={url}
                      alt={`Preview ${index}`}
                      className="h-24 w-24 rounded-md object-cover"
                    />
                    <button
                      type="button"
                      className="absolute right-0 top-0 rounded-full bg-black p-1 text-white"
                      onClick={() => handleFileRemove(url, index)}
                    >
                      <XIcon size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* <FormError message={errors.picture?.message} /> */}
          </FormItem>
        )}
      />
    </div>
  );
};

export default VariantImages;
