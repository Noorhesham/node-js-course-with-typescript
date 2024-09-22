"use client";

import { ColumnDef } from "@tanstack/react-table";

export const appointmentColumns: ColumnDef<any>[] = [
  {
    accessorKey: "appointmentDate",
    header: "Date ",
    cell: ({ row }) => <div>{row.getValue("appointmentDate")}</div>,
  },
  {
    accessorKey: "dateBooked",
    header: "date Booked",
    cell: ({ row }) => <div>{row.getValue("dateBooked")}</div>,
  },
  {
    accessorKey: "status",
    header: "status",
    cell: ({ row }) => <div>{row.getValue("status")}</div>,
  },
];
