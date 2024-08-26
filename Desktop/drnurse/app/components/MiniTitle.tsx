import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";

const MiniTitle = ({
  text,
  size,
  color,
  className,
  boldness,
  link,
}: {
  text: string;
  size?: "lg" | "md" | "2xl" | "3xl";
  color?: string;
  className?: string;
  boldness?: "bold" | "normal";
  link?: string;
}) => {
  return (
    <div className=" flex justify-between">
      <h2
        className={cn(" ", {
          " text-3xl": size === "3xl",
          "text-2xl": size === "2xl",
          "text-lg": size === "lg",
          "text-base": size === "md",
          color: color || "text-gray-700",
          className,
          "font-semibold": boldness === "bold",
          "font-normal": boldness === "normal",
          "font-medium": !boldness,
        })}
      >
        {text}
      </h2>
      {link && (
        <Link className="flex text-gray-500 items-center text-sm gap-2" href="#">
          VIEW ALL <ArrowRight className=" h-5 w-5" />
        </Link>
      )}
    </div>
  );
};

export default MiniTitle;
