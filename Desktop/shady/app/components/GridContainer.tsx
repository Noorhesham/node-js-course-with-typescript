import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

interface GridContainerProps {
  children: ReactNode;
  cols?: number; // Change to number for easier handling
  className?: string;
}

const GridContainer: React.FC<GridContainerProps> = ({ children, cols = 4, className }) => {
  const gridColsClass =
    {
      1: "grid-cols-1",
      2: "grid-cols-2",
      3: " grid-cols-1 md:grid-cols-3",
      4: " grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
      5: "grid-cols-5",
      6: "grid-cols-6",
    }[cols] || "grid-cols-4";

  return <div className={cn(className, `grid w-full ${gridColsClass} gap-5`)}>{children}</div>;
};

export default GridContainer;
