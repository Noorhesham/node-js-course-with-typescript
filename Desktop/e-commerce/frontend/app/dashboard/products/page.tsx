// app/products/page.tsx
import { DataTable } from "@/app/components/DataTable";
import { productColumns } from "./columns";
import Fetcher from "@/app/components/Fetcher";
import MaxWidthWrapper from "@/app/components/defaults/MaxWidthWrapper";

export default function ProductsPage({
  searchParams: { limit, page },
}: {
  searchParams: { limit?: string; page?: string };
}) {
  return (
    <MaxWidthWrapper className="  ">
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      <Fetcher
        resourceName="products"
        queryParams={new URLSearchParams({ limit: limit || "10", page: page || "1" })}
        cache="default"
        revalidate={3600}
        tags={[`products`]}
      >
        {({ data: { docs: data }, totalPages }) => (
          <DataTable totalPages={totalPages} page={Number(page) || 1} columns={productColumns} data={data} />
        )}
      </Fetcher>
    </MaxWidthWrapper>
  );
}
