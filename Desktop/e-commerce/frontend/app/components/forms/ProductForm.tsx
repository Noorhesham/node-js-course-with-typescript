"use client";

import { z } from "zod";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { IFormField } from "@/types";
import DynamicForm from "./DynamicForm";
import { fetchData } from "@/app/actions/Server";
import { revalidateTags } from "@/app/actions/Revalidate";

const productSchema = z.object({
  name: z.string().min(1, "Product name required"),
  description: z.string().min(1, "Description required"),
  category: z.string().min(1, "Category required"),
  gender: z.enum(["male", "female", "kids"]),
  basePrice: z.union([z.string().min(1, "basePrice is required"), z.number()]),
  brand: z.string().optional(),
  images: z
    .array(
      z.object({
        secure_url: z.string(),
        publicId: z.string(),
      })
    )
    .min(1, "At least one image required"),
});

export default function ProductCreatePage({
  categories,
  defaultValues,
}: {
  categories: Array<{ _id: string; name: string }>;
  defaultValues?: any;
}) {
  const router = useRouter();

  const formFields: IFormField[] = [
    {
      name: "name",
      label: "Product Name",
      component: "input",
      validation: z.string().min(1),
    },

    {
      name: "slug",
      label: "Product slug",
      component: "input",
      validation: z.string().min(1).nonempty(),
    },
    {
      name: "description",
      label: "Description",
      component: "textarea",
      validation: z.string().min(1),
    },
    {
      name: "category",
      label: "Category",
      component: "select",
      options: categories.map((c) => ({ value: c._id, label: c.name })),
      validation: z.string().min(1),
    },
    {
      name: "gender",
      label: "Gender",
      component: "select",
      options: [
        { value: "male", label: "Male" },
        { value: "female", label: "Female" },
        { value: "kids", label: "Kids" },
      ],
      validation: z.enum(["male", "female", "kids"]),
    },
    {
      name: "basePrice",
      label: "Base Price",
      component: "input",
      type: "number",
      validation: z.string().min(0),
    },
    {
      name: "brand",
      label: "Brand",
      component: "input",
      validation: z.string().optional(),
    },
    {
      name: "images",
      label: "Main Product Images",
      component: "photo",
      validation: productSchema.shape.images,
    },
  ];

  const handleSubmit = async (values: z.infer<typeof productSchema>) => {
    const data = await fetchData({
      resourceName: "products",
      method: defaultValues ? "PATCH" : "POST",
      body: values,
      id: defaultValues?._id,
    });
    if (data.data.doc._id) router.push(`/dashboard/product/${data.data.doc._id}/variants`);
    revalidateTags(["products", `product/${data.data.doc._id}`, `products-1`]);
  };
  return (
    <div className=" w-full mx-auto p-6">
      <DynamicForm
        defaultValues={defaultValues}
        onSubmit={handleSubmit}
        fields={formFields}
        submitButtonText="Create Product & Continue to Variants"
      />
    </div>
  );
}
