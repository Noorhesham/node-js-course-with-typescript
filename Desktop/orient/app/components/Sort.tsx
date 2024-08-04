import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowDownIcon } from "./Icons";
const Sort = ({ options }: { options: any[] }) => {
  return (
    <div className="  flex items-center gap-4">
      <h2 className=" text-base">Sort By:</h2>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger className=" bg-white py-1.5 px-3 rounded-xl  flex items-center gap-1">
          Most Popular <ArrowDownIcon color="gray" />
        </DropdownMenuTrigger>
        <DropdownMenuContent className=" w-full rounded-sm">
          {options.map((option, i) => (
            <DropdownMenuItem className=" uppercase  rounded-sm" key={i}>
              {option}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default Sort;
