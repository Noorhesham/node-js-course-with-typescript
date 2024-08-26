import React, { Suspense, useEffect, useState } from "react";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { getPasswordStrength } from "../helpers/utils";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { AnimatePresence, motion } from "framer-motion";
import Spinner from "./Spinner";

import PhotoInput from "./PhotoInput";
import { Textarea } from "@/components/ui/textarea";
import { useTranslations } from "next-intl";
import cookies from "js-cookie";
interface FormInputProps {
  control?: any;
  name: string;
  label?: string;
  type?: string;
  phone?: boolean;
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
  noProgress?: boolean;
  date?: boolean;
  rate?: boolean;
  area?: boolean;
  photo?: boolean;
}
export interface PhoneProps {
  onChange: any;
}
export interface CalendarProps {
  control: any;
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
  rate = false,
  photo = false,
  area = false,
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

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
    console.log("Password visibility toggled", showPassword);
  };
  const handlePasswordChange = (value: string) => {
    const strength = getPasswordStrength(value);
    setPasswordStrength(strength);
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
        setCalendarComponent(() => CalendarInput);
      };
      loadCalendar();
    }
  }, [phone, date]);
  const t = useTranslations();
  const local = cookies.get("NEXT_LOCALE") || "en";
  return (
    <>
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem className={`flex w-full flex-col text-left items-start  relative`}>
            {!switchToggle && label !== "" && (
              <FormLabel>
                {label} {icon}
              </FormLabel>
            )}
            <div className={`relative  w-full inline-flex items-center justify-center ${className}`}>
              {!optional && !switchToggle && (
                <span
                  className={`absolute ${
                    local === "en" ? "right-1 -top-[-13px]" : " top-1 right-1"
                  }  z-10   font-normal text-red-600`}
                >
                  *
                </span>
              )}
              <FormControl className={`  ${switchToggle ? "" : "  py-1 duration-200"} `}>
                {phone && PhoneSearchComponent ? (
                  <Suspense fallback={<Spinner />}>
                    <PhoneSearchComponent onChange={field.onChange} />
                  </Suspense>
                ) : area ? (
                  <Textarea placeholder={t("forms.message")} className="resize-none" {...field} />
                ) : photo ? (
                  <PhotoInput value={field.value} onChange={field.onChange} />
                ) : date && CalendarComponent ? (
                  <Suspense fallback={<Spinner />}>
                    <div className=" w-full">
                      <CalendarComponent control={control} />
                    </div>
                  </Suspense>
                ) : switchToggle ? (
                  <div className="flex mx-auto   mt-3 gap-2 items-center ">
                    <Label className=" md:text-sm  text-xs text-muted-foreground" htmlFor="sale">
                      {label2 || ""}
                    </Label>
                    <Switch
                      noSwitch
                      disabled={disabled}
                      id="sale"
                      className=""
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                    <Label className="md:text-sm flex-grow  text-xs  text-muted-foreground" htmlFor="sale">
                      {label || ""}
                    </Label>
                  </div>
                ) : (
                  <div className=" flex flex-col gap-2 w-full items-start">
                    <Input
                      autoComplete={password ? "off" : "on"}
                      type={
                        type == "password" && !showPassword
                          ? "password"
                          : type === "password" && showPassword
                          ? "text"
                          : type || "text"
                      }
                      className={`${!phone && "bg-white"} w-full ${password && "pl-8"} `}
                      placeholder={placeholder}
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        if (password) handlePasswordChange(e.target.value);
                      }}
                    />
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
                  </div>
                )}
              </FormControl>
              {password && field.value && (
                <span
                  className=" absolute left-2 top-[15px]  cursor-pointer hover:text-gray-900 text-gray-800"
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
    </>
  );
};

export default FormInput;
