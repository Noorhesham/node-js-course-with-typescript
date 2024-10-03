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
  boldness?: "bold" | "normal" | "extraBold";
  link?: string;
}) => {
  console.log(color);
  return (
    <div className={`flex  uppercase items-center  justify-between ${color || "text-gray-800"}`}>
      <h2
        className={cn(" ", {
          " text-3xl": size === "3xl",
          "text-2xl": size === "2xl",
          " text-sm sm:text-lg": size === "lg",
          " text-xs sm:text-sm md:text-base": size === "md",
          className,
          "font-semibold": boldness === "bold",
          "font-normal": boldness === "normal",
          "font-bold": boldness === "extraBold",
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
