import React, { useState } from "react";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { EyeIcon, EyeOffIcon } from "lucide-react";

import { useFormContext } from "react-hook-form";

import RichText from "./RichText";
import { PhotoInput } from "./PhotoInput";
import { Textarea } from "../ui/textarea";
import Starrating from "../reviews/Rate";
interface FormInputProps {
  control?: any;
  name: string;
  label?: string;
  width?: string;
  mediaType?: "image" | "video";
  toYear?: number;
  type?: string;
  phone?: boolean;
  check?: boolean;
  className?: string;
  description?: string;
  price?: boolean;
  select?: boolean;
  register?: any;
  switchToggle?: boolean;
  desc?: string;
  disabled?: boolean;
  placeholder?: string;
  label2?: string;
  icon?: any;
  password?: boolean;
  optional?: boolean;
  returnFullPhone?: boolean;
  noProgress?: boolean;
  date?: boolean;
  rate?: boolean;
  area?: boolean;
  photo?: boolean;
  noimg?: boolean;
  disableOldDates?: boolean;
  monthOnly?: boolean;
  noSwitch?: boolean;
  currency?: boolean;
  single?: boolean;
}

export interface PhoneProps {
  onChange: any;
  returnFullPhone?: boolean;
  name: string;
}
export interface CalendarProps {
  control: any;
  name: string;
  label?: string;
}
const FormInput = ({
  control,
  name,
  label,
  type = "text",
  icon,
  phone,
  single,
  className,
  switchToggle = false,
  desc,
  disabled,
  placeholder,
  label2,
  password,
  optional = false,
  date = false,
  photo = false,
  area = false,
  width,
  check = false,
  mediaType,
  rate,
}: FormInputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const form = useFormContext();
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
    console.log("Password visibility toggled", showPassword);
  };

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem
          className={`${width || "w-full"} ${!check && "flex flex-col gap-3"} my-2 !space-y-0 ${
            check && "flex items-center "
          } relative`}
        >
          {!switchToggle && label !== "" && (
            <FormLabel className={`uppercase relative w-fit ${check && "text-nowrap mt-2"}`}>
              {" "}
              {!optional && !date && !switchToggle && label && (
                <span className={`absolute -right-3 top-0   font-normal text-red-600`}>*</span>
              )}
              {label} {icon}
            </FormLabel>
          )}
          <div className={`relative  w-full inline-flex items-center justify-center ${className}`}>
            <FormControl className={`  ${switchToggle ? "" : "   duration-200"} `}>
              {area ? (
                <Textarea className=" bg-white !w-full  rounded-3xl" {...field} />
              ) : photo ? (
                <div className=" w-fit ml-auto">
                  {" "}
                  <PhotoInput single={single} mediaType={mediaType} name={field.name} />
                </div>
              ) : switchToggle ? (
                <div className="flex mx-auto   mt-3 gap-2 items-center ">
                  <Label className=" uppercase md:text-sm  text-xs text-muted-foreground" htmlFor="sale">
                    {label2 || ""}
                  </Label>
                  <Switch disabled={disabled} className="" checked={field.value} onCheckedChange={field.onChange} />
                  <Label className="md:text-sm uppercase flex-grow  text-xs  text-muted-foreground" htmlFor="sale">
                    {label || ""}
                  </Label>
                </div>
              ) : rate ? (
                <div className=" ml-auto">
                  <Label>تقييمك</Label>
                  <Starrating OnSetRating={field.onChange} MaxRating={5} />
                </div>
              ) : (
                <div className=" flex flex-col gap-2 w-full items-start">
                  {type === "file" && form.getValues(name) && !(form.getValues(name) instanceof File) && (
                    <a
                      target="_blank"
                      href={form.getValues(name)?.file || "#"}
                      className="flex gap-2 justify-between w-full  rounded-xl hover:bg-sky-100 duration-150  
                     px-4 py-2 items-center"
                    >
                      {form.getValues(name) && <p className="text-gray-800 text-sm">{form.getValues(name).title}</p>}
                      <div className=" relative w-10 h-10">
                        <img src={form.getValues(name)?.thumbnail} alt={form.getValues(name).title} />
                      </div>
                    </a>
                  )}
                  <Input
                    disabled={disabled}
                    autoComplete={password ? "off" : "on"}
                    type={
                      type == "password" && !showPassword
                        ? "password"
                        : type === "password" && showPassword
                        ? "text"
                        : type || "text"
                    }
                    accept={type === "file" ? "image/*, application/pdf" : undefined}
                    className={`${!phone && ""} bg-white  rounded-3xl  mt-auto shadow-sm w-full ${
                      password && form.getValues(name) && "pl-8"
                    } `}
                    placeholder={placeholder}
                    {...field}
                    value={type === "file" ? null : field.value}
                    onChange={(e: any) => {
                      let value = e.target.value;
                      if (e.target.type === "file") {
                        field.onChange(e.target.files ? e.target.files[0] : null);
                      } else {
                        field.onChange(value);
                      }
                    }}
                  />{" "}
                </div>
              )}
            </FormControl>
            {password && field.value && (
              <span
                className=" absolute left-2 top-[13px]  cursor-pointer hover:text-gray-900 text-gray-800"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <EyeIcon className="w-4 h-4" /> : <EyeOffIcon className="w-4 h-4" />}
              </span>
            )}
          </div>
          {desc && <FormDescription className=" text-sm text-muted-foreground">{desc}</FormDescription>}
          <FormMessage className=" text-sm dark:text-red-500" />
        </FormItem>
      )}
    />
  );
};

export default FormInput;
