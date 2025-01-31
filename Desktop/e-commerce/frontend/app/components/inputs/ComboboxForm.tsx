"use client";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { useFormContext } from "react-hook-form";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/frontend/lib/utils";
import { FaSpinner } from "react-icons/fa";
import Spinner from "../Spinner";

export default function ComboboxForm({
  options,
  name,
  label,
  placeholder,
  onChange,
  disabled,
  loading,
  optional,
}: {
  options: any;
  name: string;
  label?: string;
  placeholder: any;
  onChange?: any;
  disabled?: boolean;
  loading?: boolean;
  optional?: boolean;
}) {
  const form = useFormContext();

  return (
    <>
      <FormField
        defaultValue={form.getValues(name)} // Verify this is correctly passed
        control={form.control}
        name={name}
        render={({ field }) => (
          <FormItem className={`relative   flex flex-col gap-3 w-full`}>
            {label && (
              <FormLabel className="uppercase w-fit relative">
                {" "}
                {!optional && (
                  <span className={`absolute -right-5 -top-[1px]  z-10   font-normal text-red-600`}>*</span>
                )}
                {label}
              </FormLabel>
            )}
            <Popover>
              <PopoverTrigger disabled={disabled} className="w-full" asChild>
                <FormControl className="w-full">
                  <Button
                    variant="outline"
                    role="combobox"
                    style={{ width: "100%" }}
                    className={cn("w-full px-4 justify-between", !field.value && "text-muted-foreground")}
                  >
                    {field.value
                      ? options?.find((option: any) => option.value === field.value)?.label
                      : placeholder || ""}
                    {loading && <Spinner className=" absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2" />}
                    <CaretSortIcon className="h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="w-full  !z-[99999999999] min-w-[200px]">
                <Command className=" !z-[99999999999]">
                  <CommandInput placeholder="SEARCH ..." className="h-9" />
                  <CommandList className="overflow-y-scroll">
                    {options?.map((option: any) => (
                      <CommandItem
                        className="justify-between"
                        value={option.label}
                        key={option.value}
                        onSelect={() => {
                          field.onChange(option.value); // Update field value directly
                          form.setValue(name, option.value); // Ensure form updates
                          form.trigger(name); // Trigger validation if needed
                          if (onChange) onChange(option.value);
                        }}
                      >
                        {option.label}
                        <CheckIcon
                          className={cn("mr-auto h-4 w-4", option.value === field.value ? "opacity-100" : "opacity-0")}
                        />
                      </CommandItem>
                    ))}
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}
