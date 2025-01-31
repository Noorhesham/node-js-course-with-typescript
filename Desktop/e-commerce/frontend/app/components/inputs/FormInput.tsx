import React, { Suspense, useEffect, useState } from "react";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { EyeIcon, EyeOffIcon, FileIcon } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { AnimatePresence, motion } from "framer-motion";

import PhotoInput from "./PhotoInput";
import { Textarea } from "@/components/ui/textarea";
import { useFormContext } from "react-hook-form";
import Image from "next/image";
import Link from "next/link";
import { getPasswordStrength } from "@/app/helpers/utils";
import { Checkbox } from "@/components/ui/checkbox";
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
type PhoneSearchComponentType = React.ComponentType<PhoneProps>;
type CalendarComponentType = React.ComponentType<CalendarProps>;
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
  label2,
  password,
  optional = false,
  noProgress = false,
  date = false,
  disableOldDates = false,
  rate = false,
  photo = false,
  area = false,
  currency = false,
  noimg = false,
  returnFullPhone = true,
  width,
  noSwitch = false,
  check = false,
  toYear,
  monthOnly,
}: FormInputProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [PhoneSearchComponent, setPhoneSearchComponent] = useState<PhoneSearchComponentType>();
  const [CalendarComponent, setCalendarComponent] = useState<CalendarComponentType>();
  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    label: "Weak",
    color: "bg-red-500",
    text: "text-red-500",
  });
  const handlePasswordChange = (value: string) => {
    const strength = getPasswordStrength(value);
    setPasswordStrength(strength);
  };
  const form = useFormContext();
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
    console.log("Password visibility toggled", showPassword);
  };
  useEffect(() => {
    if (phone) {
      const loadPhoneSearch = async () => {
        const { default: PhoneSearch } = await import("./PhoneSearch");
        setPhoneSearchComponent(() => PhoneSearch);
      };
      loadPhoneSearch();
    }
    if (date) {
      const loadCalendar = async () => {
        const { default: CalendarInput } = await import("./CalendarInput");
        //@ts-ignore
        setCalendarComponent(() => CalendarInput);
      };
      loadCalendar();
    }
  }, [phone, date]);

  if (date && CalendarComponent)
    return (
      <Suspense>
        <div className=" relative w-full">
          <CalendarComponent
            optional={optional}
            disabled={disabled}
            monthOnly={monthOnly}
            label={label}
            name={name || ""}
            toYear={toYear}
            control={control}
            disableOldDates={disableOldDates}
          />
        </div>
      </Suspense>
    );

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
            <FormControl  className={`  ${switchToggle ? "" : "   duration-200"} `}>
              {area ? (
                <Textarea placeholder={"MESSAGE"} className="resize-none" {...field} />
              ) : phone && PhoneSearchComponent ? (
                <Suspense>
                  <PhoneSearchComponent disabled={disabled} returnFullPhone={returnFullPhone} name={name} onChange={field.onChange} />
                </Suspense>
              ) : photo ? (
                <PhotoInput noimg={noimg} value={field.value} onChange={field.onChange} />
              ) : switchToggle ? (
                <div className="flex mx-auto   mt-3 gap-2 items-center ">
                  <Label className=" uppercase md:text-sm  text-xs text-muted-foreground" htmlFor="sale">
                    {label2 || ""}
                  </Label>
                  <Switch
                    noSwitch={noSwitch}
                    disabled={disabled}
                    className=""
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                  <Label className="md:text-sm uppercase flex-grow  text-xs  text-muted-foreground" htmlFor="sale">
                    {label || ""}
                  </Label>
                </div>
              ) : check ? (
                <Checkbox
                  className=" self-center my-auto"
                  checked={field.value === 1 || field.value === true}
                  onCheckedChange={field.onChange}
                />
              ) : (
                <div className=" flex flex-col gap-2 w-full items-start">
                  {type === "file" && form.getValues(name) && !(form.getValues(name) instanceof File) && (
                    <Link
                      target="_blank"
                      href={form.getValues(name)?.file || "#"}
                      className="flex gap-2 justify-between w-full bg-white rounded-xl hover:bg-sky-100 duration-150  
                     px-4 py-2 items-center"
                    >
                      {form.getValues(name) && <p className="text-gray-800 text-sm">{form.getValues(name).title}</p>}
                      <div className=" relative w-10 h-10">
                        <Image src={form.getValues(name)?.thumbnail} alt={form.getValues(name).title} fill />
                      </div>
                    </Link>
                  )}
                  <Input disabled={disabled}
                    autoComplete={password ? "off" : "on"}
                    type={
                      type == "password" && !showPassword
                        ? "password"
                        : type === "password" && showPassword
                        ? "text"
                        : type || "text"
                    }
                    accept={type === "file" ? "image/*, application/pdf" : undefined}
                    className={`${!phone && "bg-white"} mt-auto shadow-sm w-full ${
                      password && form.getValues(name) && "pl-8"
                    } `}
                    placeholder={placeholder}
                    {...field}
                    value={type === "file" ? null : field.value}
                    onChange={(e: any) => {
                      if (password) handlePasswordChange(e.target.value);

                      let value = e.target.value;
                      if (e.target.type === "file") {
                        field.onChange(e.target.files ? e.target.files[0] : null);
                      } else {
                        field.onChange(value);
                      }
                      if (password) handlePasswordChange(value);
                    }}
                  />{" "}
                  <AnimatePresence>
                    {!noProgress && password && field.value && (
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: "100%" }}
                        exit={{ width: 0 }}
                        className=" flex w-full items-center gap-1"
                      >
                        <Progress
                          nocustomcol={true}
                          color={passwordStrength.color}
                          value={passwordStrength.score * 25}
                          className={` w-full  flex-grow `}
                        />
                        <p className={` text-${passwordStrength.text} text-sm font-medium `}>
                          {passwordStrength.label}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  {currency && (
                    <span className=" bg-gray-300 uppercase text-gray-800 p-2 rounded-lg rounded-l-none absolute right-0 top-0">
                      {form.getValues("currency")}
                    </span>
                  )}
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
