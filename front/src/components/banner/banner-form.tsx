"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import BannerCardForm from "./banner-card-form";
import { BannerSchema, BannerType } from "@/schemas/banner.schema";
import useImagePicker from "@/hooks/useImagePicker";
import { useCreateBannerMutation } from "@/hooks/queries/banners/useCreateBannerMutation";

const BannerForm = () => {
  const router = useRouter();
  const form = useForm<BannerType>({
    resolver: zodResolver(BannerSchema),
    defaultValues: {
      imageUrl: "",
      title: "",
      description: "",
    },
    mode: "onChange",
  });

  const { handleImageChange, handleFileRemove } = useImagePicker({
    isProfile: true,
    fieldName: "imageUrl",
    setValue: form.setValue,
    getValues: form.getValues,
  });

  const { mutate: createBanner, isPending } = useCreateBannerMutation();
  const onSubmit = (data: BannerType) => {
    console.log(data);
    createBanner(data, {
      onSuccess: () => {
        router.push("/admin/banners");
      },
    });
  };

  return (
    <BannerCardForm
      form={form}
      onSubmit={onSubmit}
      isPending={isPending}
      handleImageChange={handleImageChange}
      handleFileRemove={handleFileRemove}
    />
  );
};

export default BannerForm;
