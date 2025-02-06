import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ReactNode } from "react";
const ModalCustom = ({ content, btn }: { content: ReactNode; btn: ReactNode }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{btn}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">{content}</DialogContent>
    </Dialog>
  );
};

export default ModalCustom;
