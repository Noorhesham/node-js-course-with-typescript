import { CloudUploadIcon, XIcon } from "lucide-react";
import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import MiniTitle from "../defaults/MiniTitle";

const FileUpload = ({ label, name, multiple = false }: { label: string; name: string; multiple?: boolean }) => {
  const form = useFormContext();
  const [preview, setPreview] = useState(null); // State to store file preview URL
  const handleFileChange = (e: any) => {
    const files = e.target.files;
    form.setValue(name, multiple ? files : files[0]);

    if (files && files[0]) {
      const file = files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result); // Set preview URL or data
      };
      reader.readAsDataURL(file); // Read the file as a Data URL
    }
  };

  return (
    <div className="flex flex-col gap-2 items-start">
      <MiniTitle size="md" text={label} />
      <label className="px-4 py-2 cursor-pointer flex flex-col w-full">
        {form.getValues(name) && (
          <XIcon
            className=" absolute top-0 right-0"
            onClick={() => {
              setPreview(null);
              form.setValue(name, null);
            }}
          />
        )}
        <input type="file" name={name} onChange={handleFileChange} multiple={multiple} className="hidden" />
        <div className="border-2 rounded-xl px-4 flex-col border-dashed border-gray-400 w-full h-44 bg-gray-100 flex items-center justify-center text-center text-gray-500 hover:bg-gray-100">
          {preview ? ( // If a preview is available, display it
            <img src={preview} alt="Selected file preview" className="object-cover w-full h-full rounded-xl" />
          ) : (
            // Otherwise, display the cloud upload icon and text
            <>
              <CloudUploadIcon size={45} />
              <span className="text-xs text-gray-500">
                <strong>تصفح الصور </strong>
              </span>
              <p className="text-base mt-1  w-full text-muted-foreground">قم برفع صورة لا يزيد حجمها عن 5 ميجا بايت</p>
            </>
          )}
        </div>
      </label>
    </div>
  );
};

export default FileUpload;
