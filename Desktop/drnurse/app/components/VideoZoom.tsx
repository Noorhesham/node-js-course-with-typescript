import React, { ReactNode } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

const VideoZoom = ({ btn, src, content }: { btn: ReactNode; src?: string; content?: ReactNode }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{btn}</DialogTrigger>

      <DialogContent className={`  w-full bg-transparent outline-none border-none h-auto sm:max-w-7xl `}>
        <div className="select-none relative h-auto w-full">{content}</div>
      </DialogContent>
    </Dialog>
  );
};

export default VideoZoom;
