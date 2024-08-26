import React from "react";
import ModalCustom from "./ModalCustom";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import Link from "next/link";

const FunctionalButton = ({
  btnText,
  content,
  icon,
  link,
}: {
  btnText: string;
  content?: React.ReactNode;
  icon?: React.ReactNode;
  link?: string;
}) => {
  return link ? (
    <Button className=" flex items-cetner gap-2 bg-main2 text-gray-50 hover:bg-main2/80">
      {icon ? icon : <PlusCircle />}
      <Link href={link}>{btnText}</Link>
    </Button>
  ) : (
    <ModalCustom
      btn={
        <Button className=" flex items-cetner gap-2 bg-main2 text-gray-50 hover:bg-main2/80">
          {icon ? icon : <PlusCircle />}
          {btnText}
        </Button>
      }
      content={content}
    />
  );
};

export default FunctionalButton;
