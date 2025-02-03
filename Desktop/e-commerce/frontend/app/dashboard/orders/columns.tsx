// components/orders/columns.ts
import { IOrder, IProduct } from "@/types";
import { ColumnDef } from "@tanstack/react-table";

export const orderColumns: ColumnDef<IOrder>[] = [
  {
    accessorKey: "user",
    header: "User",
    cell: ({ row }) => row.original.user.toString(),
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "total",
    header: "Total",
    cell: ({ row }) => `$${row.original.total.toFixed(2)}`,
  },
  {
    accessorKey: "paymentStatus",
    header: "Payment Status",
  },
  {
    accessorKey: "createdAt",
    header: "Order Date",
    cell: ({ row }) => new Date(row.original.createdAt).toLocaleDateString(),
  },
];
