// ... existing imports
import { fetchData } from "@/app/actions/Server";
import ProductVariantSelector from "@/app/components/ChooseVariants";
import MaxWidthWrapper from "@/app/components/defaults/MaxWidthWrapper";

const page = async ({ params }: { params: { id: string } }) => {
  const id = await params.id;
  const data = await fetchData({ resourceName: "products", id: id, cache: "no-cache" });
  const product = data.data.doc;
  /* 
product.variants = [
  { options: [{ name: "Color", value: "Red" }, { name: "Size", value: "M" }] },
  { options: [{ name: "Color", value: "Blue" }, { name: "Size", value: "L" }] },
  { options: [{ name: "Color", value: "Red" }, { name: "Size", value: "S" }] },
];
product.variants.reduce(acc,variant=>{
variant.options.forEach(option=>{
{color:{}}
if(!acc[option.name]) acc[option.name]=new Set()
acc[option.name].add(option.value)
})
})
avaialbleOptions={
}
{
[[color , new set ('red','blue')],
[size , new set ('s','m','l')]], {
color:}

[
  ["Color", new Set(["Red", "Blue"])],
  ["Size", new Set(["M", "L", "S"])]
]

}
{  Color: ["Red", "Blue"],
  Size: ["M", "L", "S"]}
size :s m l 
color : red blue 


 */
  const availableOptions = product.variants.reduce((acc, variant) => {
    variant.options.forEach((option: any) => {
      if (!acc[option.name]) acc[option.name] = new Set();
      acc[option.name].add(option.value);
    });
    return acc;
  }, {});
  // [{color:[red,green]}]
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
