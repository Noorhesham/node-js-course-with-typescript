import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import type React from "react"; // Added import for React
import { Link } from "react-router-dom";

interface ButtonProps {
  variant?: "default" | "outline";
  size?: "default" | "lg";
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
  icon?: boolean;
  img?: boolean;
  disabled?: boolean;
  to?: string;
}

export const ButtonCustom = ({
  variant = "default",
  size = "default",
  className,
  children,
  onClick,
  icon = false,
  img,
  disabled,
  to,
}: ButtonProps) => {
  const Component = to ? Link : "button";
  return (
    <Component
      {...(to ? { to } : { onClick })}
      disabled={disabled}
      className={cn(
        "relative cursor-pointer   inline-flex items-center justify-center rounded-full text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
        {
          "bg-main hover:bg-main/90 text-blue-950": variant === "default",
          "border-2 border-main text-main hover:bg-main/10": variant === "outline",
          "h-11 px-8": size === "default",
          "h-14 px-10": size === "lg",
        },
        className
      )}
    >
      {" "}
      {img && <img className=" z-20 w-12 relative" src="/q.svg" alt="" />}
      {children}
      {icon && <ChevronRight className="ml-2 h-4 w-4" />}
    </Component>
  );
};
