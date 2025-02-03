"use client";

import { Row } from "@tanstack/react-table";
import { IProduct } from "@/types";
import Image from "next/image";

interface StatusCellProps {
  row: Row<IProduct>;
}

export const StatusCell = ({ row }: StatusCellProps) => {
  return <span>{row.original.isActive ? "Active" : "Inactive"}</span>;
};

interface ImageCellProps {
  row: Row<IProduct>;
}

export const ImageCell = ({ row }: ImageCellProps) => {
  const firstImage = row.original.images[0]?.secure_url;

  return (
    <div className="w-16 h-16 relative">
      {firstImage ? (
        <Image src={firstImage} alt={row.original.name} fill className="object-cover rounded" />
      ) : (
        <span>No Image</span>
      )}
    </div>
  );
};
