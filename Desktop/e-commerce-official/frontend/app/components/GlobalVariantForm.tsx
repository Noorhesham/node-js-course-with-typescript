"use client";
import React from "react";
import { useFieldArray } from "react-hook-form";
import { z } from "zod";
import DynamicForm from "./DynamicForm";
import { Button } from "@/components/ui/button";
import FormInput from "./inputs/FormInput";
import { fetchData } from "../actions/Server";
import { revalidateTags } from "../actions/Revalidate";

const loginArray = [
  {
    name: "name",
    validation: z.string(),
    label: "Name",
  },
  {
    name: "options",
    validation: z.array(z.string()),
    label: "Options",
    component: "array",
  },
];

const GlobalVariantForm = ({ defaultValues }: { defaultValues?: any }) => {
  const onSubmit = async (values: any) => {
    const response = await fetchData({
      resourceName: "variants",
      method: defaultValues?._id ? "PATCH" : "POST",
      body: values,
      id: defaultValues?._id || "",
    });
    console.log(response);
    revalidateTags(["variants", "variants-1"]);
    return response;
  };

  return (
    <DynamicForm
      defaultValues={defaultValues}
      className="w-full flex flex-col gap-5"
      submitText="Create Variant"
      onSubmit={onSubmit}
      arrayFields={loginArray}
    >
      {(control) => {
        const { fields, append, remove } = useFieldArray({
          control,
          name: "options",
        });

        return (
          <div className="space-y-4">
            {/* Dynamic options fields */}
            <div className="space-y-2">
              <label className="block text-sm font-medium">Options</label>
              {fields.map((field, index) => (
                <div key={field.id} className="flex gap-2 items-center">
                  <FormInput placeholder="" name={`options.${index}`} label="Value" />
                  <Button type="button" variant="destructive" size="sm" onClick={() => remove(index)}>
                    Remove
                  </Button>
                </div>
              ))}
              <Button type="button" variant="outline" onClick={() => append("")}>
                Add Option
              </Button>
            </div>
          </div>
        );
      }}
    </DynamicForm>
  );
};

export default GlobalVariantForm;
