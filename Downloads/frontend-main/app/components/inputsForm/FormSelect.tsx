import { useFormContext } from "react-hook-form";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { InputProps } from "../forms/CustomForm";

const FormSelect = ({ name, label, placeholder, description, id, options, selected, className }: InputProps) => {
  const form = useFormContext();
  const selectedValue = form.watch(name);

  // Filter out the selected value from the options
  const filteredOptions = options?.filter((p) => !selected?.includes(p._id));

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => {
        const selected = options?.find((p) => p._id === form.getValues(name)?._id || p._id === selectedValue);
        return (
          <FormItem className={`${className || ""}  w-full `} id={id || ""}>
            <FormLabel className=" uppercase">{label}</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger dir="rtl" className="  text-right shadow-sm">
                  <SelectValue placeholder={placeholder || "SELECT"}>{selected && selected.label}</SelectValue>
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {filteredOptions &&
                  filteredOptions.map((option, i) => (
                    <SelectItem key={i + `${option.label} ${option.value}`} value={option._id || option.value || option}>
                      {option.label || option.name || option}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
            <FormDescription>{description}</FormDescription>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};

export default FormSelect;
