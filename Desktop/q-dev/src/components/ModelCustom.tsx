"use client";
import React, { ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const ModelCustom = ({
  text,
  onClick,
  title,
  btn,
  content,
  isOpen = false,
}: {
  value?: any;
  className?: string;
  text?: string;
  onClick?: any;
  create?: boolean;
  title?: string;
  btn?: ReactNode;
  content: ReactNode;
  isOpen?: boolean;
}) => {
  const [open, setOpen] = React.useState(isOpen);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{btn}</DialogTrigger>
      <DialogContent className="sm:max-w-[525px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{text}</DialogDescription>
        </DialogHeader>
        {content}
      </DialogContent>
    </Dialog>
  );
};

export default ModelCustom;
