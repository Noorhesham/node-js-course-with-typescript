import { fetchData } from "@/app/actions/Server";
import ProductCreatePage from "@/app/components/ProductForm";

export default async function CreateProductPage() {
  const { data: categories } = await fetchData({
    resourceName: "categories",
    tags: ["categories"],
  });

  return (
    <div className=" w-full mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Create New Product</h1>
      <ProductCreatePage categories={categories.docs} />
    </div>
  );
}
