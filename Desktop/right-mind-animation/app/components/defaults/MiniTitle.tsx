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
  headingClass,
  form,
  h1,
}: {
  text: string;
  size?: "sm" | "lg" | "md" | "2xl" | "3xl";
  color?: string;
  className?: string;
  boldness?: "bold" | "normal" | "extraBold";
  link?: string;
  headingClass?: string;
  form?: boolean;
  h1?: boolean;
}) => {
  return (
    <div
      className={`flex ${headingClass || ""}  uppercase items-center  ${
        form && "bg-blue-100 rounded-full py-2 px-4"
      }  justify-between ${color || "text-gray-800"}`}
    >
      {h1 ? (
        <h1
          className={cn(" ", {
            "text-sm": size === "sm",
            " text-3xl": size === "3xl",
            "text-2xl": size === "2xl",
            " text-sm sm:text-lg": size === "lg",
            " text-sm lg:text-base": size === "md",
            className,
            "font-semibold": boldness === "bold",
            "font-normal": boldness === "normal",
            "font-bold": boldness === "extraBold",
            "font-medium": !boldness,
          })}
        >
          {text}
        </h1>
      ) : (
        <h2
          className={cn(" ", {
            "text-sm": size === "sm",
            " text-3xl": size === "3xl",
            "text-2xl": size === "2xl",
            " text-sm sm:text-lg": size === "lg",
            " text-sm lg:text-base": size === "md",
            className,
            "font-semibold": boldness === "bold",
            "font-normal": boldness === "normal",
            "font-bold": boldness === "extraBold",
            "font-medium": !boldness,
          })}
        >
          {text}
        </h2>
      )}
      {link && (
        <Link className="flex text-gray-500 items-center text-sm gap-2" href={link || "/"}>
          VIEW ALL <ArrowRight className=" h-5 w-5" />
        </Link>
      )}
    </div>
  );
};

export default MiniTitle;
