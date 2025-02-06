"use client";
import { IFormField } from "@/types";
import React, { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z, ZodTypeAny } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInput from "./inputs/FormInput";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { PhotoInput } from "./inputs/PhotoInput";
import FormSelect from "./inputs/FormSelect";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
interface TDynamicForm {
  arrayFields: IFormField[];
  defaultValues: any;
  onSubmit: (values: any) => Promise<void>;
  submitText: string;
  className?: string;
  children?: React.ReactNode;
}

const DynamicForm = ({ arrayFields, defaultValues, onSubmit, submitText, className, children }: TDynamicForm) => {
  //[{name:email,validation:z.string().email(),age:""}]
  const { toast } = useToast();
  const [error, setError] = useState();
  let formSchema = z
    .object(
      arrayFields?.reduce((acc, field) => {
        if (field.validation) {
          acc[field.name] = field.validation;
        }
        return acc;
      }, {} as Record<string, ZodTypeAny>)
    )
    .extend(
      arrayFields.reduce((acc, fieldName) => {
        acc[fieldName] = z.any();
        return acc;
      }, {} as Record<string, ZodTypeAny>)
    );
  if (arrayFields?.some((field) => field.superRefine)) {
    formSchema = formSchema.superRefine((values, ctx) => {
      arrayFields.forEach((field) => {
        if (field.superRefine) {
          field.superRefine(values, ctx);
        }
      });
    });
  }
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const [isPending, startTransition] = useTransition();
  const handleFormSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const res = await onSubmit(values);
      console.log(res);
      if (res?.status === "success")
        toast({
          title: "Success",
          description: res?.message || "Operation successful",
        });
    } catch (err) {
      console.error("Form submission error:", err);
      setError(err?.message);
    }
  };
  return (
    <Form {...form}>
      <form
        className={className}
        onSubmit={form.handleSubmit((values) => startTransition(() => handleFormSubmit(values)))}
      >
        {arrayFields?.map((field) => {
          switch (field.component) {
            case "select":
              return (
                <FormSelect
                  key={field.name}
                  name={field.name}
                  label={field.label}
                  placeholder={field.placeholder}
                  description={field.description}
                  options={field.options || []}
                  className={field.className}
                  {...field.props}
                />
              );
            case "checkbox":

            case "array":
              return null;
            case "textarea":
              return (
                <FormInput
                  key={field.name}
                  name={field.name}
                  label={field.label}
                  area={true}
                  description={field.description}
                  className={field.className}
                  {...field.props}
                />
              );
            case "photo":
              return (
                <FormField
                  key={field.name}
                  control={form.control}
                  name={field.name}
                  render={({ field }) => (
                    <FormItem>
                      {field.label && <FormLabel>{field.label}</FormLabel>}
                      <FormControl>
                        <PhotoInput name={field.name} value={field.value} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              );

            default:
              return (
                <FormInput
                  key={field.name}
                  name={field.name}
                  label={field.label}
                  type={field.type || "text"}
                  placeholder={field.placeholder}
                  description={field.description}
                  className={field.className}
                  {...field.props}
                  password={field.password}
                />
              );
          }
        })}
        {children && children(form.control, form.getValues)}
        {error && <p className=" font-semibold text-red-500 my-3">{error}</p>}
        <Button disabled={isPending}>{submitText}</Button>
      </form>
    </Form>
  );
};

export default DynamicForm;
