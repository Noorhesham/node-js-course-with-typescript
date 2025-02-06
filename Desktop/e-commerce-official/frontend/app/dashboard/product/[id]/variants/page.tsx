// app/products/[productId]/variants/page.tsx
import { fetchData } from "@/app/actions/Server";
import GridContainer from "@/app/components/defaults/GridContainer";
import MaxWidthWrapper from "@/app/components/defaults/MaxWidthWrapper";
import ProductVariantPage from "@/app/components/VariantForm";
import React from "react";

const Page = async ({ params }: { params: { id: string } }) => {
  const id = await params.id;
  const variants = await fetchData({
    resourceName: "variants",
    tags: ["variants"],
  });
  const product = await fetchData({
    resourceName: "products",
    id,
    tags: [`product/${id}`],
  });
  const variantsProduct = product.data.doc.variants;
  console.log(variants.data.docs);
  return (
    <MaxWidthWrapper>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Product Variants</h1>
      </div>

      <GridContainer cols={2} className="gap-5 w-full">
        {variantsProduct.map((variant: any) => (
          <ProductVariantPage key={variant._id} defaultValues={variant} productId={id} variants={variants.data.docs} />
        ))}
        {/* Add empty form for new variant */}
        <ProductVariantPage key="new-variant" productId={id} variants={variants.data.docs} isNew={true} />
      </GridContainer>
    </MaxWidthWrapper>
  );
};

export default Page;
