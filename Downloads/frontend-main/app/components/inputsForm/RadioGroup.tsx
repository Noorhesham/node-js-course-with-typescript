"use client";
import { useFormContext } from "react-hook-form";
import { z } from "zod";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useTranslations } from "next-intl";
import { useState } from "react";

const FormSchema = z.object({
  type: z.enum(["all", "mentions", "none"], {
    required_error: "You need to select a notification type.",
  }),
});

export function RadioGroupForm({ options, name }: { options?: any; name: string }) {
  const form = useFormContext();
  const t = useTranslations();

  // State to manage the selected radio value
  const [selectedValue, setSelectedValue] = useState<string | undefined>(form.watch("type"));

  // Update the selected value when radio button changes
  const handleValueChange = (value: string) => {
    setSelectedValue(value);
    form.setValue("type", value); // Sync with react-hook-form
  };

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="space-y-3">
          <FormLabel>{t("recipientEmail")}</FormLabel>
          <FormControl>
            <RadioGroup onValueChange={handleValueChange} value={selectedValue} className="flex lg:flex-row flex-col items-start space-y-1">
              {options.map((option: any, i: number) => (
                <FormItem
                  key={i}
                  className={`flex py-2 px-4 rounded-xl  border border-input cursor-pointer duration-150 items-start space-x-3 space-y-0 ${
                    selectedValue === option.title ? "bg-white" : ""
                  }`}
                >
                  <FormControl>
                    <RadioGroupItem id={option.title} value={option.title} />
                  </FormControl>
                  <FormLabel htmlFor={option.title} className="flex flex-col">
                    <h2 className="font-normal">{option.title}</h2>
                    <p className=" text-muted-foreground font-normal text-sm my-2">{option.desc}</p>
                  </FormLabel>
                </FormItem>
              ))}
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
