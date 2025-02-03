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
  value,
  className,
  text,
  onClick,
  create,
  title,
  btn,
  content,
  isOpen = false,
}: {
  value?: any;
  className?: string;
  text: string;
  onClick?: any;
  create?: boolean;
  title: string;
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
        <DialogFooter className="self-end flex items-center gap-3">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button
            type="button"
            variant="default"
            onClick={() => {
              onClick && onClick();
              setOpen(false);
            }}
          >
            Add Info
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ModelCustom;
