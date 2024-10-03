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
import { ChevronDown } from "lucide-react";
import { usePathname } from "next/navigation";
import { useLocale } from "next-intl";

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
  const pathName = usePathname();
  const local = useLocale();
  const linkStyles =
    "uppercase  text-gray-900 font-semibold  group flex relative items-center gap-2 text-sm  xl:text-base  ";
  console.log(pathName.replace(`/${local}`, "").trim() === "", isHome);
  const active = isHome
    ? pathName.replace(`/${local}`, "").trim() === href?.replace(`/`, "").trim()
    : pathName.replace(`/${local}`, "") === href;
  if (!subLinks)
    return (
      <Link
        href={href || "/"}
        className={`${linkStyles} ${
          active
            ? `text-primary 
       after:w-full after:h-[2px]  after:bg-blue-500 after:absolute after:-bottom-1 w-fit after:left-0`
            : ""
        }`}
      >
        {text}
      </Link>
    );
  else
    return (
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger className={linkStyles}>
          {text} <ChevronDown />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className=" w-full rounded-lg">
          {subLinks.map((link) => (
            <DropdownMenuItem className=" uppercase   rounded-sm" key={link.text}>
              <Link className=" text-xs pr-20 pl-3   py-2  w-full   font-semibold  uppercase" href={link.href || "#"}>
                {link.text}
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    );
};

export default NavLink;
