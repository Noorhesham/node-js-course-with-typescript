import React from "react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const ModalCustom = ({
  btn,
  content,
  title,
  desc,
  functionalbtn,span
}: {
  btn: React.ReactNode;
  content: React.ReactNode;
  title?: string;
  desc?: string;
  functionalbtn?: React.ReactNode;
  span?: string;
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{btn}</DialogTrigger>
      <DialogContent className=" max-w-3xl sm:rounded-2xl">
        <DialogHeader className=" mt-10">
          {title && <DialogTitle className=" text-xl text-center text-main2">{title}</DialogTitle>}
        </DialogHeader>
        {content}
        <DialogFooter className=" pb-10 flex  items-center sm:flex-col">
          <DialogClose className=" mx-auto flex items-center gap-5 mt-5">
            {functionalbtn && functionalbtn}
            <Button className="text-xs  hover:bg-main2 hover:text-white rounded-full flex  items-center gap-2 px-6  border border-main2 bg-white text-main2">
              CANCEL
            </Button>
          </DialogClose>
          {desc && (
            <h2 className=" text-xl  mx-auto text-center mt-10 gap-1 flex items-center">
              {desc} <span className=" text-main text-2xl  font-bold">{span}</span>
            </h2>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ModalCustom;
