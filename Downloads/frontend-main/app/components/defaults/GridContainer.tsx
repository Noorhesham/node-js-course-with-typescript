import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";
import MotionContainer from "./MotionContainer";

interface GridContainerProps {
  children: ReactNode;
  cols?: number; // Change to number for easier handling
  className?: string;
  motion?: boolean;
}

const GridContainer: React.FC<GridContainerProps> = ({ children, cols = 4, className, motion }) => {
  const gridColsClass =
    {
      1: "grid-cols-1",
      2: "grid-cols-2 gap-5",
      3: " grid-cols-1 md:grid-cols-3 gap-5",
      4: " grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5",
      5: " grid-cols-2  lg:grid-cols-5",
      6: "grid-cols-6",
      7: "grid-cols-7",
      8: " grid-cols-2 lg:grid-cols-8",
      9: "grid-cols-2 lg:grid-cols-9",
      10: "grid-cols-10",
      11: " grid-cols-4 lg:grid-cols-11",
      12: "grid-cols-12",
      13: "grid-cols-1 lg:grid-cols-13",
    }[cols] || "grid-cols-4";

  return motion ? (
    <MotionContainer className={cn(className, `grid w-full ${gridColsClass} `)}>{children}</MotionContainer>
  ) : (
    <div className={cn(className, `grid w-full ${gridColsClass} `)}>{children}</div>
  );
};

export default GridContainer;
