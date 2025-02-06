import { fetchData } from "@/app/actions/Server";
import ProductCreatePage from "@/app/components/forms/ProductForm";
import React from "react";

const page = async ({ params }: { params: { id: string } }) => {
  const id = await params.id;
  const product = await fetchData({ resourceName: "products", id: id, tags: [`product/${id}`] });
  const categories = await fetchData({ resourceName: "categories", tags: ["categories"] });
  return (
    <div>
      <ProductCreatePage categories={categories.data.docs} defaultValues={product.data.doc} />
    </div>
  );
};

export default page;
