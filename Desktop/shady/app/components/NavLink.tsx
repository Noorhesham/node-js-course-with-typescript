import Link from "next/link";
import React from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowDownIcon } from "lucide-react";

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
  const linkStyles = "uppercase flex items-center gap-2  font-[400]   text-sm  xl:text-base  ";
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
          {text} <ArrowDownIcon />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className=" w-full rounded-lg">
          {subLinks.map((link) => (
            <DropdownMenuItem className=" uppercase   rounded-sm" key={link.text}>
              <Link
                className=" text-xs pr-20 pl-3   py-2  w-full  font-[600] text-black  uppercase"
                href={link.href || "#"}
              >
                {link.text}
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    );
};

export default NavLink;
