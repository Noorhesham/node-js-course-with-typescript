// components/dynamic-options.tsx
"use client";

import { useFieldArray, useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Plus, Trash } from "lucide-react";
import DynamicForm from "./forms/DynamicForm";

export function DynamicOptions({ name }: { name: string }) {
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: `${name}`,
  });

  return (
    <div className="space-y-4">
      {fields.map((field, index) => (
        <div key={field.id} className="flex gap-4 items-end">
          <DynamicForm fields={[]} className="flex gap-4 flex-grow" />
          <Button type="button" variant="destructive" size="sm" onClick={() => remove(index)}>
            <Trash className="h-4 w-4" />
          </Button>
        </div>
      ))}
      <Button type="button" variant="outline" size="sm" onClick={() => append({ name: "", value: "" })}>
        <Plus className="mr-2 h-4 w-4" /> Add Option
      </Button>
    </div>
  );
}
