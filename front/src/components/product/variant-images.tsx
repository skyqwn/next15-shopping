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

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Camera, Trash, XIcon } from "lucide-react";
import { VariantType } from "@/schemas";
import useImagePicker from "@/hooks/useImagePicker";
import Image from "next/image";
import { Button } from "../ui/button";

const VariantImages = () => {
  const { control } = useFormContext<VariantType>();

  const { fields, remove, append, move } = useFieldArray({
    control,
    name: "variantImages",
  });

  const { handleImageChange, handleFileRemove } = useImagePicker({
    fields,
    append,
    remove,
  });

  return (
    <div>
      <FormField
        control={control}
        name="color"
        render={({ field }) => (
          <FormItem>
            <FormLabel>사진 업로드</FormLabel>
            <div className="mt-4 flex w-full items-center gap-10">
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageChange}
                className="hidden"
                id="file-input"
              />
              <label htmlFor="file-input" className="cursor-pointer">
                <Camera className="w-full rounded-md border p-2" size={100} />
              </label>

              {/* 스크롤 가능한 사진 리스트 */}
              {/* <div className="scrollbar-hide flex min-w-0 gap-4 overflow-x-auto">
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
                      onClick={() => handleFileRemove(index)}
                    >
                      <XIcon size={16} />
                    </button>
                  </div>
                ))}
              </div> */}
            </div>

            {/* <FormError message={errors.picture?.message} /> */}
          </FormItem>
        )}
      />
      <div className="overflow-x-auto rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order</TableHead>
              <TableHead>FileName</TableHead>
              <TableHead>FileSize</TableHead>
              <TableHead>Image</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {fields.map((field, index) => {
              return (
                <TableRow key={field.id}>
                  <TableCell className="font-medium">{index}</TableCell>
                  <TableCell>{field.fileName}</TableCell>
                  <TableCell>
                    {(field.size / (1024 * 1024)).toFixed(2)}MB
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-center">
                      <Image
                        src={field.url}
                        alt={field.fileName}
                        className="rounded-md"
                        width={72}
                        height={48}
                      />
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant={"ghost"}
                      onClick={(e) => handleFileRemove(index)}
                      className="scale-75"
                    >
                      <Trash className="h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default VariantImages;
