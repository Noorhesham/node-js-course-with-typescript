"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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

  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger>حالة الحجز</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>الحجز</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>مؤجل</DropdownMenuItem>
            <DropdownMenuItem>ملغي</DropdownMenuItem>
            <DropdownMenuItem>تم </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
