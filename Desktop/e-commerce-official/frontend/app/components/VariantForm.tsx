// app/products/[productId]/variants/page.tsx
"use client";

import { z } from "zod";
import { useParams, useRouter } from "next/navigation";
import { IFormField } from "@/types";
import DynamicForm from "./DynamicForm";
import { Button } from "@/components/ui/button";
import { Trash, Plus } from "lucide-react";
import { useFieldArray, useForm } from "react-hook-form";
import { fetchData } from "@/app/actions/Server";
import { useState, useTransition } from "react";
import { revalidateTags } from "@/app/actions/Revalidate";
import FormSelect from "./inputs/FormSelect";

const variantSchema = z.object({
  _id: z.string().optional(),
  options: z
    .array(
      z.object({
        name: z.string().min(1),
        value: z.string().min(1),
      })
    )
    .min(1),
  sku: z.string().min(1),
  price: z.number().min(0),
  compareAtPrice: z.number().optional(),
  inventory: z.number().min(0),
  images: z
    .array(
      z.object({
        secure_url: z.string(),
        publicId: z.string(),
      })
    )
    .min(1),
});

export default function ProductVariantPage({
  variants,
  productId,
  defaultValues,
  isNew,
}: {
  variants: any;
  productId: string;
  defaultValues?: any;
  isNew?: boolean;
}) {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(isNew || false);

  const variantFields: IFormField[] = [
    {
      name: "sku",
      label: "SKU",
      component: "input",
      validation: z.string().min(1),
    },
    {
      name: "price",
      label: "Price",
      component: "input",
      type: "number",
      validation: z.union([z.string().min(1, "Price is required"), z.number()]),
    },
    {
      name: "compareAtPrice",
      label: "Compare Price",
      component: "input",
      type: "number",
      validation: z.union([z.string().min(1, "Compare Price is required"), z.number()]).optional(),
    },
    {
      name: "inventory",
      label: "Inventory",
      component: "input",
      type: "number",
      validation: z.union([z.string().min(1, "Inventory is required"), z.number()]),
    },
    {
      name: "images",
      label: "Variant Images",
      component: "photo",
      validation: variantSchema.shape.images,
    },
    {
      name: "options",
      label: "Options",
      component: "array",
      validation: z
        .array(
          z.object({
            name: z.string().min(1),
            value: z.string().min(1),
          })
        )
        .min(1),
    },
  ];

  const handleSubmit = async (values: z.infer<typeof variantSchema>) => {
    console.log(values);
    const method = defaultValues?._id ? "PATCH" : "POST";
    const resourceName = `products`;
    const id = `${productId}/variants${defaultValues?._id ? `/${defaultValues._id}` : ""}`;
    const response = await fetchData({ resourceName, method, body: values, id });
    router.refresh();
    if (isNew) setIsEditing(false);
  };
  const [isPending, startTransition] = useTransition();
  const handleDelete = async () => {
    startTransition(async () => {
      try {
        if (!defaultValues?._id) return;
        const resourceName = `products`;
        const id = `${productId}/variants${defaultValues?._id ? `/${defaultValues._id}` : ""}`;
        const response = await fetchData({
          resourceName,
          method: "DELETE",
          id,
        });
        console.log(response);
        revalidateTags([`product/${productId}`]);
        router.refresh();
      } catch (error) {
        console.log(error);
      }
    });
  };

  return (
    <div className="w-full h-[50vh] overflow-y-scroll mx-auto p-4 border rounded-lg mb-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">{defaultValues?._id ? "Edit Variant" : "New Variant"}</h2>
        <div className="flex gap-2">
          {defaultValues?._id && (
            <Button disabled={isPending} variant="destructive" size="sm" onClick={handleDelete} className="gap-1">
              <Trash className="h-4 w-4" />
            </Button>
          )}
          {!isNew && (
            <Button disabled={isPending} variant="outline" size="sm" onClick={() => setIsEditing(!isEditing)}>
              {isEditing ? "Cancel" : "Edit"}
            </Button>
          )}
        </div>
      </div>

      {isEditing && (
        <DynamicForm
          defaultValues={defaultValues}
          onSubmit={handleSubmit}
          arrayFields={variantFields}
          submitText={defaultValues?._id ? "Update Variant" : "Add Variant"}
        >
          {(control, getValues) => {
            const { fields, append, remove } = useFieldArray({
              control,
              name: "options",
            });

            return (
              <>
                {fields.map((field, index) => {
                  const selectedNames = getValues("options")?.map((option) => option.name) || [];
                  const currentName = getValues(`options.${index}.name`);

                  const variantTypes = variants.map((v) => ({ label: v.name, value: v.name }));

                  const variantOptions =
                    variants.find((v) => v.name === currentName)?.options?.map((v) => ({ label: v, value: v })) || [];

                  return (
                    <div key={field.id} className="flex flex-col gap-4 mb-4">
                      <div className="flex gap-4 items-end">
                        <FormSelect
                          name={`options.${index}.name`}
                          control={control}
                          label="Option Type"
                          placeholder="Select option name"
                          options={variantTypes}
                        />
                        <FormSelect
                          name={`options.${index}.value`}
                          control={control}
                          label="Option Value"
                          placeholder="Select option value"
                          options={variantOptions}
                        />
                      </div>
                      <Button type="button" variant="destructive" size="sm" onClick={() => remove(index)}>
                        Remove
                      </Button>
                    </div>
                  );
                })}
                <Button type="button" variant="outline" size="sm" onClick={() => append({ name: "", value: "" })}>
                  Add Option
                </Button>
              </>
            );
          }}
        </DynamicForm>
      )}
    </div>
  );
}
