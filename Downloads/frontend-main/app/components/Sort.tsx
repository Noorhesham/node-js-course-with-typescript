import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
const Sort = ({ options }: { options: any[] }) => {
  return (
    <div className=" flex items-center ">
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger className=" bg-white py-1.5 px-3 rounded-xl text-sm  flex items-center gap-1">
          Most Popular <ChevronDown className="text-gray-500" />
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
