import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import Image from "next/image";
import React, { ReactNode, useEffect } from "react";


const ZoomImage = ({ btn, src }: { btn: ReactNode; src: string }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{btn}</DialogTrigger>
      <DialogContent className="   w-full h-full sm:max-w-7xl max-h-[80vh]">
        <div className="-z-10 select-none  relative h-full w-full">
          <Image
            fill
            loading="eager"
            src={src}
            alt="product image"
            className="-z-10 h-full w-full object-contain object-center"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ZoomImage;
