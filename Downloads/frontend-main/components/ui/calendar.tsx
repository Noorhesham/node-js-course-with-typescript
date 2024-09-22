"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker, useDayPicker, useNavigation } from "react-day-picker";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { format, setMonth } from "date-fns";
import { Select, SelectContent, SelectItem, SelectTrigger } from "./select";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

// Separate Component for Month Dropdown
const MonthDropdown: React.FC = () => {
  const { goToMonth, currentMonth } = useNavigation();
  const selectItems = Array.from({ length: 12 }, (_, i) => ({
    value: i.toString(),
    label: format(setMonth(new Date(), i), "MMMM"),
  }));

  return (
    <Select
      onValueChange={(newval) => goToMonth(setMonth(currentMonth, parseInt(newval)))}
      value={currentMonth.getMonth().toString()}
    >
      <SelectTrigger>{format(currentMonth, "MMMM")}</SelectTrigger>
      <SelectContent>
        {selectItems.map((item) => (
          <SelectItem key={item.value} value={item.value}>
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

// Separate Component for Year Dropdown
const YearDropdown: React.FC = () => {
  const { goToMonth, currentMonth } = useNavigation();
  const { fromYear, toYear } = useDayPicker();
  const selectItems = React.useMemo(() => {
    if (fromYear && toYear) {
      return Array.from({ length: toYear - fromYear + 1 }, (_, i) => {
        const year = fromYear + i;
        return { label: year.toString(), value: year.toString() };
      });
    }
    return [];
  }, [fromYear, toYear]);

  return (
    <Select
      onValueChange={(newval) => goToMonth(new Date(parseInt(newval), currentMonth.getMonth()))}
      value={currentMonth.getFullYear().toString()}
    >
      <SelectTrigger className="mt-2">Years</SelectTrigger>
      <SelectContent>
        {selectItems.map((item) => (
          <SelectItem key={item.value} value={item.value}>
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

function Calendar({ className, classNames, showOutsideDays = true, ...props }: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-sm font-medium",
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell: "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
        row: "flex w-full mt-2",
        cell: "h-9 w-9 text-center text-sm p-0 relative",
        day: cn(buttonVariants({ variant: "ghost" }), "h-9 w-9 p-0 font-normal aria-selected:opacity-100"),
        ...classNames,
      }}
      components={{
        IconLeft: ({ ...props }) => <ChevronLeft className="h-4 w-4" {...props} />,
        IconRight: ({ ...props }) => <ChevronRight className="h-4 w-4" {...props} />,
        Dropdown: (props) =>
          props.name === "months" ? <MonthDropdown /> : props.name === "years" ? <YearDropdown /> : null,
      }}
      {...props}
    />
  );
}

Calendar.displayName = "Calendar";

export { Calendar };
