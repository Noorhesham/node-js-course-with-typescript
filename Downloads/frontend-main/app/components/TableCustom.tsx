"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { GrMultiple } from "react-icons/gr";

import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FaEdit, FaRegComment, FaTrash } from "react-icons/fa";
import ModalCustom from "./defaults/ModalCustom";

import Link from "next/link";
import { MdCreateNewFolder } from "react-icons/md";

export function TableCustom({
  data,
  columns,
  autoResponders,
  head,
  inputOnly,
  create,
}: {
  data: any;
  columns: ColumnDef<any>[];
  autoResponders?: boolean;
  head?: React.ReactNode;
  inputOnly?: boolean;
  create?: boolean;
}) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });
  const selected = table.getSelectedRowModel().flatRows;
  return (
    <div className="w-full">
      <div className="flex lg:flex-row flex-col justify-between items-start gap-4 lg:items-center py-4">
        {!head && !autoResponders && inputOnly && !create && (
          <Input
            placeholder="Filter emails..."
            value={(table.getColumn("account")?.getFilterValue() as string) ?? ""}
            onChange={(event) => table.getColumn("account")?.setFilterValue(event.target.value)}
            className="max-w-sm ml-auto"
          />
        )}
        {!head && !inputOnly && !create && (
          <>
            <div className=" flex items-center gap-3">
              {!autoResponders && (
                <Input
                  placeholder="Filter emails..."
                  value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
                  onChange={(event) => table.getColumn("email")?.setFilterValue(event.target.value)}
                  className="max-w-sm"
                />
              )}
        
            </div>
          </>
        )}

      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of {table.getFilteredRowModel().rows.length} row(s)
          selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
