import { CloudUploadIcon, FileIcon, ReplaceIcon, Trash2Icon } from "lucide-react"; // Import Trash2Icon for the remove button
import { useTranslations } from "next-intl";
import React, { useState, useEffect, useRef } from "react";
import { useFormContext } from "react-hook-form";
import MiniTitle from "../defaults/MiniTitle";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";

interface FileUploadProps {
  label: string;
  name: string;
  multiple?: boolean;
  noicon?: boolean;
  required?: boolean;
  mimeTypes?: string[]; // Acceptable MIME types
}

const FileUpload: React.FC<FileUploadProps> = ({
  label,
  name,
  multiple = false,
  noicon = false,
  required,
  mimeTypes = ["image/*", "application/pdf"], // Accept images and PDFs by default
}) => {
  const { setValue, getValues, formState, watch } = useFormContext();
  const [preview, setPreview] = useState<string | File | null>(null); // State to store file preview URL or icon
  const [isPdf, setIsPdf] = useState(false); // State to track if the file is a PDF
  const fileRef = useRef<HTMLInputElement>(null);
  const defaultFile = watch(name) || formState.defaultValues?.[name]; // Get default file
  const [forceRender, setForceRender] = useState(false);
  useEffect(() => {
    // If there is a default file, handle the preview
    if (defaultFile && typeof defaultFile === "object") {
      if (defaultFile.thumbnail) {
        setPreview(defaultFile.thumbnail);
      } else if (defaultFile.type === "application/pdf") {
        setIsPdf(true);
      }
    }
  }, [defaultFile]);
  useEffect(() => {}, [forceRender]);
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    const file = files ? files[0] : null;
    if (file) {
      setValue(name, multiple ? files : file, { shouldValidate: true });

      const fileType = file.type;

      if (fileType.includes("image")) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result as string); // Set preview URL for image
          setIsPdf(false); // Reset PDF state
        };
        reader.readAsDataURL(file); // Read the file as a Data URL
      } else if (fileType === "application/pdf") {
        setPreview(file); // No image preview for PDFs
        setIsPdf(true); // Set PDF state
      }
    }
  };

  const t = useTranslations();

  console.log(preview, getValues(name));

  return (
    <div className="flex flex-col gap-2 items-start">
      <div className="flex items-start gap-1 relative">
        <MiniTitle size={noicon ? "sm" : "md"} text={label} />
        {required && <span className={`  z-10   font-normal text-red-600`}>*</span>}
      </div>

      {noicon ? (
        <Input
          multiple={multiple}
          className="mt-auto shadow-sm w-full"
          type="file"
          name={name}
          accept={mimeTypes.join(", ")} // Accept both images and PDFs
          onChange={handleFileChange}
        />
      ) : (
        <div
          onClick={() => !preview && fileRef.current?.click()}
          className="px-4 py-2 cursor-pointer flex flex-col w-full"
        >
          <input
            key={forceRender ? "key" : ""}
            ref={fileRef}
            type="file"
            name={name}
            accept={mimeTypes.join(", ")} // Accept both images and PDFs
            onChange={handleFileChange}
            multiple={multiple}
            className="hidden"
          />
          <div className="border-2 rounded-xl flex-col border-dashed border-gray-400 w-full h-44 bg-gray-100 flex items-center justify-center text-center text-gray-500 hover:bg-gray-100 relative">
            {preview !== null || isPdf ? (
              <>
                {isPdf ? (
                  <div className="flex flex-col items-center">
                    <FileIcon size={40} />
                    <span className="text-xs mt-2">{(preview as any)?.name || ""}</span>
                    <span className="text-xs mt-2">{(defaultFile as any)?.title || ""}</span>
                  </div>
                ) : (
                  <Link
                    href={(defaultFile as any)?.file || ""}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative w-full h-32 aspect-square block"
                  >
                    <Image
                      fill
                      src={typeof preview === "string" ? preview : URL.createObjectURL(preview as File) || ""}
                      alt="Selected file preview"
                      className="object-contain  rounded-xl"
                    />
                  </Link>
                )}
                <span
                  onClick={(e) => {
                    e.stopPropagation();
                    fileRef.current?.click();
                  }}
                  className="absolute top-2 z-40 right-2 bg-main2 text-white rounded-full p-1 !important"
                >
                  <ReplaceIcon size={16} />
                </span>{" "}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setPreview(null);
                    setValue(name, "", { shouldValidate: true });
                    setIsPdf(false);
                    setForceRender((prev) => !prev);
                  }}
                  className="absolute top-2 right-10 bg-red-600 text-white rounded-full p-1"
                >
                  <Trash2Icon size={16} />
                </button>
              </>
            ) : (
              <div className="flex flex-col items-center">
                <CloudUploadIcon size={45} />
                <span className="text-xs text-gray-500">
                  <strong>Browse photo</strong> or drop here
                </span>
                <p className="text-[12px] mt-1 max-w-40 text-muted-foreground">{t("imageUploadDesc")}</p>
              </div>
            )}
          </div>
        </div>
      )}
      {formState.errors[name] && <p className="text-red-600 font-semibold text-xs">{formState.errors[name]?.message}</p>}
    </div>
  );
};

export default FileUpload;
