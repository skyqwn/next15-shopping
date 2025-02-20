"use client";

import Image from "next/image";
import { useFormContext } from "react-hook-form";

import NoUserImage from "@/components/common/no-user";
import { FormField, FormItem, FormLabel } from "@/components/ui/form";
import { ProfileType } from "@/schemas";
import { useEffect, useState } from "react";
import useImagePicker from "@/hooks/useImagePicker";

interface ProfileImageProps {
  handleFileRemove: (url: string) => void;
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  initialImage?: string;
}

const ProfileImage = ({
  handleFileRemove,
  handleImageChange,
  initialImage,
}: ProfileImageProps) => {
  const { control } = useFormContext<ProfileType>();
  const [mounted, setMounted] = useState(false);
  const [image, setImage] = useState(initialImage);
  useEffect(() => {
    setMounted(true);
    setImage(initialImage);
  }, [initialImage]);

  const onImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setImage(previewUrl);
    }
    handleImageChange(e); // 상위 컴포넌트의 이벤트 핸들러 호출
  };

  // handleFileRemove가 호출될 때 이미지 초기화
  const onFileRemove = (imageUrl: string) => {
    setImage(undefined);
    handleFileRemove(imageUrl);
  };

  if (!mounted) {
    return <div className="relative mb-4 size-24 rounded-full bg-gray-200" />;
  }
  return (
    <div>
      <FormField
        control={control}
        name="profileImageUris"
        render={({ field }) => (
          <FormItem>
            <FormLabel>사진 업로드</FormLabel>
            <article className="mb-8 flex gap-4">
              {image ? (
                <div className="relative mb-4 size-24 rounded-md">
                  <Image
                    src={image}
                    alt="profileImage"
                    fill
                    className="rounded-full object-cover"
                  />
                </div>
              ) : (
                <NoUserImage />
              )}

              <div className="flex flex-col justify-center gap-2">
                <div className="flex items-center gap-2">
                  <input
                    id="file-input"
                    name="file-input"
                    accept="image/*"
                    type="file"
                    className="hidden"
                    multiple={false}
                    onChange={onImageChange}
                  />
                  <label htmlFor="file-input">
                    <span className="cursor-pointer rounded-md border border-slate-300 p-[10px] text-xs">
                      이미지 변경
                    </span>
                  </label>
                  <span
                    onClick={(e) => {
                      e.preventDefault();
                      onFileRemove(image!);
                      setImage(undefined);
                    }}
                    className="cursor-pointer rounded-md border border-slate-300 p-[10px] text-xs text-red-500"
                  >
                    삭제
                  </span>
                </div>
              </div>
            </article>

            {/* <FormError message={errors.picture?.message} /> */}
          </FormItem>
        )}
      />
    </div>
  );
};

export default ProfileImage;
