"use client";

import { FormField, FormItem, FormLabel } from "@/components/ui/form";
import useImagePicker from "@/hooks/useImagePicker";
import { useFieldArray, useFormContext } from "react-hook-form";

const ProfileImage = () => {
  const { control } = useFormContext<any>();
  const { fields, remove, append } = useFieldArray({
    control,
    name: "profileImageUris",
  });

  const { handleFileRemove, handleImageChange } = useImagePicker({
    initialImages: [],
    isProfile: true,
    append,
    remove,
    fields,
  });

  console.log("필드: ", fields);

  return (
    <div>
      <FormField
        control={control}
        name="color"
        render={({ field }) => (
          <FormItem>
            <FormLabel>사진 업로드</FormLabel>
            <article className="mb-8 flex gap-4">
              {/* {userData?.data.imageUri ? (
            <div className="relative size-24 rounded-full">
              <Image src={userData?.data.imageUri} alt="pic" fill />
            </div>
          ) : (
            <NoUserImage />
          )} */}

              <div className="flex flex-col justify-center gap-2">
                {/* <div className="flex gap-2">
              <h2 className="text-xl font-bold">이름</h2>
              <span className="text-xs text-gray-500">
                {userData?.data.name}
              </span>
            </div> */}
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
                    // onClick={()=>handleFileRemove()}
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
      {/* <div className="overflow-x-auto rounded-md">
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
      </div> */}
    </div>
  );
};

export default ProfileImage;
