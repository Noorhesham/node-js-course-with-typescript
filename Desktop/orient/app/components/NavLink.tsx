import Link from "next/link";
import React from "react";
import { ArrowDownIcon } from "./Icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const NavLink = ({
  text,
  href,
  subLinks,
  isHome,
}: {
  text: string;
  href?: string;
  subLinks: { text: string; href?: string }[];
  isHome?: boolean;
}) => {
  const linkStyles = "uppercase flex items-center gap-2 font-[400]  text-sm tracking-wide ";
  if (!subLinks)
    return (
      <Link href={href || "/"} className={linkStyles}>
        {text}
      </Link>
    );
  else
    return (
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger className={linkStyles}>
          {text} <ArrowDownIcon color={isHome ? "white" : "#E6007E"} />
        </DropdownMenuTrigger>
        <DropdownMenuContent className=" w-full rounded-sm">
          {subLinks.map((link) => (
            <DropdownMenuItem className=" uppercase  rounded-sm" key={link.text}>
              <Link className="text-[10px] pr-10  w-full  font-[600] text-black  uppercase" href={link.href || "#"}>
                {link.text}
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    );
};

export default NavLink;
