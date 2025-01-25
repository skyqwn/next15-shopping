"use client";

import Image from "next/image";
import { useFormContext } from "react-hook-form";

import NoUserImage from "@/components/common/no-user";
import { FormField, FormItem, FormLabel } from "@/components/ui/form";
import useImagePicker from "@/hooks/useImagePicker";
import { ProfileType } from "@/schemas";

const ProfileImage = () => {
  const { control, getValues, setValue } = useFormContext<ProfileType>();

  const profileImage = getValues("profileImageUris");

  const { handleFileRemove, handleImageChange } = useImagePicker({
    isProfile: true,
    fieldName: "profileImageUris",
    setValue,
    getValues,
  });

  return (
    <div>
      <FormField
        control={control}
        name="profileImageUris"
        render={({ field }) => (
          <FormItem>
            <FormLabel>사진 업로드</FormLabel>
            <article className="mb-8 flex gap-4">
              {profileImage ? (
                <div className="relative mb-4 size-24 rounded-md">
                  <Image
                    src={profileImage}
                    alt="profileImage"
                    fill
                    className="rounded-md"
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
                    onChange={handleImageChange}
                  />
                  <label htmlFor="file-input">
                    <span className="cursor-pointer rounded-md border border-slate-300 p-[10px] text-xs">
                      이미지 변경
                    </span>
                  </label>
                  <span
                    onClick={(e) => {
                      e.preventDefault();
                      handleFileRemove(profileImage!);
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
