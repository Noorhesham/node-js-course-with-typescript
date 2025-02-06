"use client";
import { ColumnDef } from "@tanstack/react-table";
import { IProduct } from "@/types";
import { fetchData } from "@/app/actions/Server";
import Image from "next/image";
import { ActionsCell } from "@/app/components/ActionCell";

export const productColumns: ColumnDef<IProduct>[] = [
  {
    accessorKey: "images",
    header: "Image",
    cell: ({ row }) => (
      <div className=" w-16 h-16 relative rounded-2xl overflow-hidden">
        <Image src={row.original.images[0].secure_url} className=" object-cover" alt={row.original.name} fill />
      </div>
    ),
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "slug",
    header: "Slug",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "basePrice",
    header: "Price",
    cell: ({ row }) => `$${+row.original.price?.toFixed(2)}`,
  },
  {
    accessorKey: "brand",
    header: "Brand",
  },
  {
    accessorKey: "isActive",
    header: "Status",
    cell: ({ row }) => <p> {row.original.isActive ? "Active" : "Inactive"}</p>, // Use the StatusCell component
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <ActionsCell
        entityType="product"
        entityId={row.original._id}
        editPath={`/dashboard/product/${row.original._id}/edit`}
        variantPath={`/dashboard/product/${row.original._id}/variants`}
        onDelete={async (id) => {
          // Implement your delete logic here
          const res = await fetchData({
            resourceName: "products",
            method: "DELETE",
            id,
          });
          return res;
        }}
      />
    ),
  },
];
