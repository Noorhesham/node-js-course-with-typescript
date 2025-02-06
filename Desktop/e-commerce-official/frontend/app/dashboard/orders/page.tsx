// app/products/page.tsx
import { DataTable } from "@/app/components/DataTable";
import Fetcher from "@/app/components/Fetcher";
import { orderColumns } from "@tanstack/react-table";

export default function ProductsPage() {
  return (
    <div className="container mx-auto py-4">
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      <Fetcher resourceName="orders" cache="force-cache" tags={["orders"]}>
        {({ data: { docs: data } }) => <DataTable columns={orderColumns} data={data} />}
      </Fetcher>
    </div>
  );
}
