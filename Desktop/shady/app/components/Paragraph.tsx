import React from "react";
import { cn } from "@/lib/utils";

interface ParagraphProps {
  text: string;
  size?: "sm" | "lg";
  className?: string;
}

const Paragraph: React.FC<ParagraphProps> = ({ text, size = "sm", className }) => {
  return (
    <p className={cn("text-muted-foreground max-w-lg lg:max-w-full leading-6", size === "lg" ? "text-lg" : "text-sm", className)}>{text}</p>
  );
};

export default Paragraph;
