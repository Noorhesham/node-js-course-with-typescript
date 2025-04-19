"use client";

import { useFormContext } from "react-hook-form";
import { useCallback, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlusIcon, Trash } from "lucide-react";
function getImageData(event: ChangeEvent<HTMLInputElement>) {
  // FileList is immutable, so we need to create a new one
  const dataTransfer = new DataTransfer();

  // Add newly uploaded images
  Array.from(event.target.files!).forEach((image) => dataTransfer.items.add(image));

  const files = dataTransfer.files;
  const displayUrl = URL.createObjectURL(event.target.files![0]);

  return { files, displayUrl };
}

export const PhotoInput = ({
  name,
  single = false,
  mediaType = "image",
}: {
  name: string;
  single?: boolean;
  mediaType?: "image" | "video";
}) => {
  const { setValue } = useFormContext();
  const [preview, setPreview] = useState([]);

  return (
    <div className="space-y-4 w-full">
      <Input
        id="inputimage"
        type="file"
        multiple={single ? false : true}
        accept={mediaType === "image" ? "image/*" : "video/*"}
        onChange={(event) => {
          const { files, displayUrl } = getImageData(event);
          setPreview((prev) => [...prev, displayUrl]);
          setValue(files ? name : "", files);
        }}
        className="cursor-pointer hidden"
      />
      <label
        htmlFor="inputimage"
        className="  flex justify-center items-center  cursor-pointer rounded-2xl overflow-hidden border-dashed border-2 border-blue-500 bg-[#A6A6A64D] w-20 aspect-square"
      >
        <div className="  rounded-full bg-blue-500 p-2">
          <PlusIcon className=" w-5 h-5 text-white" />
        </div>
      </label>
      <div className="grid grid-cols-3 gap-4">
        {preview.length > 0 &&
          preview?.map((url, index) => (
            <div key={url + index} className="relative w-20 h-20 group">
              {mediaType === "image" ? (
                <img src={url} alt={`Upload ${index + 1}`} className="rounded-lg w-full object-cover aspect-square" />
              ) : (
                <video controls src={url} className="max-w-full h-full  absolute inset-0 object-cover rounded" />
              )}
              <Button
                type="button"
                variant="destructive"
                size="sm"
                className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => {
                  setPreview((prev) => prev.filter((_, i) => i !== index));
                }}
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>
          ))}
      </div>
    </div>
  );
};
