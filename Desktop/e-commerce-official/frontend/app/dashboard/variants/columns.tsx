"use client";
import { ColumnDef } from "@tanstack/react-table";
import { IVariant } from "@/types";
import ModalCustom from "@/app/components/defaults/ModalCustom";
import { Button } from "@/components/ui/button";
import GlobalVariantForm from "@/app/components/GlobalVariantForm";

export const variantColumns: ColumnDef<IVariant>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "options",
    header: "options",
    cell: ({ row }) => (
      <ModalCustom
        content={
          <ul className=" flex flex-col list-disc">
            {row.original.options.map((option) => (
              <li>{option}</li>
            ))}
          </ul>
        }
        btn={<Button>Open</Button>}
      />
    ),
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <ModalCustom
        btn={
          <div className=" w-fit flex flex-col">
            <Button variant={"ghost"}>Update</Button>
          </div>
        }
        content={<GlobalVariantForm defaultValues={row.original} />}
      />
    ),
  },
];
