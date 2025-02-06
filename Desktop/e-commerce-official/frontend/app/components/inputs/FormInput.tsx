import React, { useState } from "react";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { EyeIcon, EyeOffIcon } from "lucide-react";

import { Textarea } from "@/components/ui/textarea";
import { useFormContext } from "react-hook-form";
import Image from "next/image";
import Link from "next/link";
interface FormInputProps {
  control?: any;
  name: string;
  label?: string;
  width?: string;
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
}

const FormInput = ({
  control,
  name,
  label,
  type = "text",
  icon,
  phone,
  className,
  switchToggle = false,
  desc,
  disabled,
  placeholder,

  password,
  optional = false,
  area = false,
  width,
  check = false,
}: FormInputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const form = useFormContext();
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem
          className={`${width || "w-full"} ${!check && "flex flex-col gap-3"}  my-2 !space-y-0 ${
            check && "flex items-center "
          } relative`}
        >
          {!switchToggle && label !== "" && (
            <FormLabel className={`uppercase relative w-fit ${check && "text-nowrap mt-2"}`}>
              {" "}
              {!optional && !switchToggle && label && (
                <span className={`absolute -right-3 top-0   font-normal text-red-600`}>*</span>
              )}
              {label} {icon}
            </FormLabel>
          )}
          <div className={`relative  w-full inline-flex items-center justify-center ${className}`}>
            <FormControl className={`  ${switchToggle ? "" : "   duration-200"} `}>
              {area ? (
                <Textarea placeholder={"MESSAGE"} className="resize-none" {...field} />
              ) : (
                <div className=" flex flex-col gap-2 w-full items-start">
                  <Input
                    disabled={disabled}
                    autoComplete={password ? "off" : "on"}
                    type={password && !showPassword ? "password" : password && showPassword ? "text" : type || "text"}
                    accept={type === "file" ? "image/*, application/pdf" : undefined}
                    className={`${!phone && "bg-white"} text-black mt-auto shadow-sm w-full ${
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
                className=" absolute left-2 top-1/2 -translate-y-1/2  cursor-pointer hover:text-gray-900 text-gray-800"
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
