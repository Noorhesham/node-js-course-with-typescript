import React, { ReactNode } from "react";
import MiniTitle from "../defaults/MiniTitle";
import { cn } from "@/lib/utils";

const FormFlexContainer = ({
  children,
  title,
  className,
}: {
  children: ReactNode;
  title?: string;
  className?: string;
}) => {
  return (
    <div className={cn(" flex flex-col gap-2", className)}>
      {title && <MiniTitle size="lg" boldness="bold" text={title} />}
      <div className="flex  lg:flex-row flex-col w-full items-center gap-2">{children}</div>
    </div>
  );
};

export default FormFlexContainer;
