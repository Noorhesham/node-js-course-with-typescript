import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React from "react";

const InputField = ({
  name,
  disabled,
  control,
  placeholder,
  type,
  text,
}: {
  name: string;
  control: any;
  disabled: boolean;
  placeholder?: string;
  type?: string;text?:string
}) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className=" relative ">
          <FormLabel className=" text-gray-400">{text?text:"Password"}</FormLabel>
          <FormControl>
            <Input
              className="py-6 px-3 rounded-lg text-black"
              disabled={disabled}
              {...field}
              placeholder={placeholder ? placeholder : "******"}
              type={type ? type : "password"}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default InputField;
