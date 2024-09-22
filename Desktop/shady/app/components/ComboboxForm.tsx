"use client";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { useFormContext } from "react-hook-form";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

export default function ComboboxForm({
  options,
  name,
  label,
  placeholder,
  onChange,
}: {
  options: any;
  name: string;
  label: string;
  placeholder: any;
  onChange?: any;
}) {
  const form = useFormContext();
  return (
    <>
      <FormField
        control={form.control}
        name={name}
        render={({ field }) => (
          <FormItem dir="rtl" className={`flex  w-full flex-col text-right items-start  gap-2 relative`}>
            <FormLabel>{label}</FormLabel>
            <Popover>
              <PopoverTrigger className=" w-full" asChild>
                <FormControl className=" w-full">
                  <Button
                    noDiv
                    variant="outline"
                    role="combobox"
                    style={{ width: "100%" }}
                    className={cn(
                      "   placeholder:text-right w-full text-right justify-between",
                      !field.value && "text-muted-foreground"
                    )}
                  >
                    {field.value
                      ? options.find((language: any) => language.value === field.value)?.label
                      : placeholder || ""}
                    <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="w-[200px]  text-right p-0">
                <Command>
                  <CommandInput dir="rtl" placeholder=" ابحث ..." className="h-9 text-right" />
                  <CommandList>
                    <CommandEmpty>لم يتم ايجاد نتائج</CommandEmpty>
                    <CommandGroup>
                      {options?.map((option: any) => (
                        <CommandItem dir="rtl"
                          className="text-right justify-between"
                          value={option.label}
                          key={option.value}
                          onSelect={() => {
                            form.setValue(name, option.value);
                            if (onChange) onChange(option.value);
                          }}
                        >
                          {option.label}
                          <CheckIcon
                            className={cn(
                              "mr-auto h-4 w-4",
                              option.value === field.value ? "opacity-100" : "opacity-0"
                            )}
                          />
                        </CommandItem>
                      ))}
                    </CommandGroup>
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
