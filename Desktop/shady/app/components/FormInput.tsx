import React, { Suspense, useEffect, useState } from "react";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { AnimatePresence, motion } from "framer-motion";

import { Textarea } from "@/components/ui/textarea";
import Spinner from "./Spinner";

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
  const [isFocused, setIsFocused] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
    console.log("Password visibility toggled", showPassword);
  };
  const handlePasswordChange = (value: string) => {
    // const strength = getPasswordStrength(value);
    // setPasswordStrength(strength);
  };
  useEffect(() => {
    if (phone) {
      const loadPhoneSearch = async () => {
        const { default: PhoneSearch } = await import("./PhoneSearch");
        setPhoneSearchComponent(() => PhoneSearch);
      };
      loadPhoneSearch();
    }
  }, [phone, date]);
  const inputVariants = {
    hidden: {
      opacity: 0,
      y: 100,
    },
    reveal: {
      opacity: 1,
      y: 0,
    },
  };
  return (
    <motion.div className="w-full" variants={inputVariants}>
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem className={`flex  w-full flex-col text-right  items-end  relative`}>
            {!switchToggle && (
              <FormLabel
                className={`absolute z-10 transition-transform duration-300 ease-in-out ${
                  isFocused || field.value
                    ? "top-0  text-seven-light transform right-0 -translate-y-5"
                    : "right-5 top-[33%]"
                }  ml-auto  text-sm flex items-center gap-2`}
              >
                {label} {icon}
              </FormLabel>
            )}{" "}
            <div className={`relative  inline-flex  w-full items-center justify-center ${className}`}>
              <FormControl className={` `}>
                {phone && PhoneSearchComponent ? (
                  <Suspense fallback={<Spinner />}>
                    <PhoneSearchComponent onChange={field.onChange} />
                  </Suspense>
                ) : area ? (
                  <Textarea placeholder={placeholder} className="resize-none" {...field} />
                ) : (
                  <div className={`  flex flex-col gap-2 w-full `}>
                    <Input
                      disabled={disabled}
                      {...field}
                      type={password && !showPassword ? "password" : "text"} // Toggle input type based on password prop and showPassword state
                      className={`w-full ${password ? " pr-8" : "pl-5"}`}
                      onFocus={() => setIsFocused((s) => (s = true))}
                      value={field.value}
                      onBlur={() => {
                        if (!field.value) {
                          setIsFocused(false);
                        }
                      }}
                      onChange={(e) => {
                        field.onChange(e.target.value);
                        setIsFocused((s) => (s = true));
                      }}
                    />
                  </div>
                )}
              </FormControl>{" "}
              {password && field.value && (
                <span className=" absolute right-2  cursor-pointer" onClick={togglePasswordVisibility}>
                  {showPassword ? <EyeIcon className="w-4 h-4" /> : <EyeOffIcon className="w-4 h-4" />}
                </span>
              )}
            </div>
            {desc && <FormDescription className=" text-sm text-muted-foreground">{desc}</FormDescription>}
            <FormMessage className=" text-sm dark:text-red-500" />
          </FormItem>
        )}
      />
    </motion.div>
  );
};

export default FormInput;
