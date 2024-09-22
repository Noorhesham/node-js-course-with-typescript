"use client";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import Image from "next/image";
import React, { ReactNode } from "react";

const ZoomImage = ({ btn, src, content }: { btn: ReactNode; src?: string; content?: ReactNode }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{btn}</DialogTrigger>
      {/*@ts-ignore*/}
      <DialogContent
        className={` ${src ? "" : "max-h-[80vh]"} w-full bg-transparent outline-none border-none h-full sm:max-w-7xl `}
      >
        <div className="select-none relative h-full w-full">
          {content ? (
            content
          ) : (
            <Image
              fill
              loading="eager"
              src={src || ""}
              alt="product image"
              className="h-full w-full object-contain object-center"
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ZoomImage;
