// ... existing imports
import { fetchData } from "@/app/actions/Server";
import ProductVariantSelector from "@/app/components/ChooseVariants";
import MaxWidthWrapper from "@/app/components/defaults/MaxWidthWrapper";

const page = async ({ params }: { params: { id: string } }) => {
  // ... existing data fetching
  const id = await params.id;
  const data = await fetchData({ resourceName: "products", id: id, cache: "no-cache" });
  const product = data.data.doc;
  // Process available options
  const availableOptions = product.variants.reduce((acc, variant) => {
    variant.options.forEach((option: any) => {
      if (!acc[option.name]) acc[option.name] = new Set();
      acc[option.name].add(option.value);
    });
    return acc;
  }, {});

  const availableOptionsArray = Object.entries(availableOptions).reduce((acc, [key, values]) => {
    acc[key] = Array.from(values);
    return acc;
  }, {});
  console.log(product.variants);
  return (
    <MaxWidthWrapper>
      <div className="">
        <ProductVariantSelector
          variants={product.variants}
          availableOptions={availableOptionsArray}
          product={product}
        />
      </div>
    </MaxWidthWrapper>
  );
};
export default page;
