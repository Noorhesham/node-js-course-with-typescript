"use client";
import { ColumnDef } from "@tanstack/react-table";
import { IProduct } from "@/types";
import { ImageCell, StatusCell } from "@/app/components/cells/cells";
import { ActionsCell } from "@/components/ActionCell";
import { fetchData } from "@/app/actions/Server";

export const productColumns: ColumnDef<IProduct>[] = [
  {
    accessorKey: "images",
    header: "Image",
    cell: ({ row }) => <ImageCell row={row} />, // Use the ImageCell component
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
    cell: ({ row }) => `$${row.original.basePrice.toFixed(2)}`,
  },
  {
    accessorKey: "brand",
    header: "Brand",
  },
  {
    accessorKey: "isActive",
    header: "Status",
    cell: ({ row }) => <StatusCell row={row} />, // Use the StatusCell component
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <ActionsCell<IProduct>
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
