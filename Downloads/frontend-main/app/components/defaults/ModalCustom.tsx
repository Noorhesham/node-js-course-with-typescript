"use client";
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
import { CircleX } from "lucide-react";

const ModalCustom = ({
  btn,
  content,
  title,
  desc,
  functionalbtn,
  span,
  cancelBtn = false,
  isOpen,
  btnText,
  isPending,
  btnStyles,
  form,
}: {
  btn: React.ReactNode;
  content: React.ReactNode;
  title?: string;
  desc?: string;
  functionalbtn?: React.ReactNode;
  span?: string;
  cancelBtn?: boolean;
  isOpen?: boolean;
  btnText?: string;
  isPending?: boolean;
  btnStyles?: boolean;
  form?: boolean;
}) => {
  const [open, setOpen] = React.useState(isOpen || false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{btn}</DialogTrigger>
      <DialogContent className="  max-w-4xl bg-white w-[95%] md:w-full overflow-y-auto max-h-[80vh]  sm:rounded-[1.8rem]">
        <DialogHeader className=" mt-10">
          {title && <DialogTitle className=" text-xl text-center text-main2">{title || ""}</DialogTitle>}
        </DialogHeader>
        {content}
        {(cancelBtn || functionalbtn || desc) && (
          <DialogFooter className=" pb-10 flex  items-center sm:flex-col">
            <div className="flex  gap-2 items-center">
              {functionalbtn && functionalbtn}
              <DialogClose className=" mx-auto flex  items-center gap-5  ">
                {cancelBtn && (
                  <Button
                    type="button"
                    className="text-xs flex-grow mr-auto self-end mx-0  hover:bg-main2 hover:text-white rounded-full flex  items-center gap-2 px-6  border border-main2 bg-white text-main2"
                  >
                    الغاء
                  </Button>
                )}
              </DialogClose>
            </div>
            {desc && (
              <h2 className=" text-xl  mx-auto text-center mt-10 gap-1 flex items-center">
                {desc} <span className=" text-main text-2xl  font-bold">{span}</span>
              </h2>
            )}
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
};
{
  /* <SubmitButton btnStyles={btnStyles} text={btnText || "Submit"} isPending={isPending || disabled} /> */
}
export default ModalCustom;
