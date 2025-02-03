"use client";
import React, { useState } from "react";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format, isBefore } from "date-fns";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { MonthCalendar } from "@/components/ui/month-calendar";

const CalendarInput = ({
  control,
  name,
  label,
  disabled,
  optional,
  monthOnly = false,
  disableOldDates = false,
}: {
  control: any;
  name: string;
  label?: string;
  disabled?: boolean;
  optional?: boolean;
  monthOnly?: boolean;
  disableOldDates?: boolean;
}) => {
  const [date, setDate] = useState<Date | null>(null);
  const [open, setOpen] = useState(false);

  return (
    <FormField
      control={control}
      name={name}
      disabled={disabled}
      render={({ field }) => {
        return (
          <FormItem className={`relative w-full`}>
            <FormLabel className="duration-200 relative uppercase">
              {!optional && <span className="absolute -right-3 top-0 font-normal text-red-600">*</span>}
              {label || "Date"}
            </FormLabel>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full pl-3 flex justify-between text-left rounded-lg font-normal",
                      !field.value && "text-muted-foreground"
                    )}
                  >
                    {field.value ? (
                      monthOnly ? (
                        format(new Date(field.value), "MMMM yyyy") // Format to month/year
                      ) : (
                        format(new Date(field.value), "yyyy-MM-dd")
                      ) // Full date
                    ) : (
                      <span>SELECT</span>
                    )}
                    <CalendarIcon className="ml-auto mr-2 h-4 w-4 opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent sideOffset={-40} className="w-full z-[51] relative p-0" align="end">
                {monthOnly ? (
                  <MonthCalendar
                    className="relative w-full"
                    mode="single"
                    captionLayout="dropdown-buttons"
                    fromYear={1990}
                    toYear={new Date().getFullYear() + 3}
                    selected={field.value}
                    onSelect={(date) => {
                      if (!date) return;
                      let newDate = date;

                      if (monthOnly) {
                        // Automatically set the day to the 1st of the month
                        newDate = setDate(date, 1);
                      }

                      const formattedDate = format(date, "yyyy-MM-dd");
                      field.onChange(formattedDate);
                    }}
                    disabled={
                      (date) => disableOldDates && isBefore(date, new Date()) // Disable dates before today
                    }
                    initialFocus
                  />
                ) : (
                  <Calendar
                    className="relative w-full"
                    mode="single"
                    captionLayout="dropdown-buttons"
                    fromYear={1990}
                    toYear={new Date().getFullYear() + 50} // Allow 50 years in the future
                    selected={field.value}
                    onSelect={(date) => {
                      if (!date) return;
                      const formattedDate = format(date, "yyyy-MM-dd");
                      field.onChange(formattedDate);
                      setOpen(false);
                    }}
                    disabled={
                      (date) => disableOldDates && isBefore(date, new Date()) // Disable dates before today
                    }
                    initialFocus
                  />
                )}
              </PopoverContent>
            </Popover>
          </FormItem>
        );
      }}
    />
  );
};

export default CalendarInput;
