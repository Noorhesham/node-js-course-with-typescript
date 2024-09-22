"use client";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";

export const patientColumns: ColumnDef<any>[] = [
  {
    accessorKey: "photo",
    header: "Photo",
    cell: ({ row }) => (
      <Image src={row.getValue("photo")} alt={row.getValue("name")} width={50} height={50} className="rounded-full" />
    ),
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => <div>{row.getValue("name")}</div>,
  },
  {
    accessorKey: "id",
    header: "Patient ID",
    cell: ({ row }) => <div>{row.getValue("id")}</div>,
  },
];
