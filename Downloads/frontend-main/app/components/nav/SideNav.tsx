"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import cookies from "js-cookie";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const SideNav = ({
  icon,
  text,
  link,
  iconsOnly,
}: {
  icon: React.ReactNode;
  text: string;
  link: string;
  iconsOnly?: boolean;
}) => {
  const [mounted, setMounted] = useState(false);
  const pathName = usePathname();

  const isActive = pathName.includes(link) || pathName === `${link}`;

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    mounted && (
      <Link
        href={link}
        className={`flex flex-1 hover:bg-blue-100 bg-hover text-base flex-grow w-full lg:py-2 lg:px-4 font-medium duration-150 cursor-pointer md:w-full rounded-lg p-1    items-center gap-2 self-start ${
          isActive && !iconsOnly
            ? "   border-l-2 rounded-l-none text-sky-500 bg-blue-100  border-main lg:py-3   "
            : iconsOnly && isActive
            ? " bg-sky-500 w-fit  text-gray-50 text-center mx-auto"
            : ""
        }`}
      >
        {iconsOnly ? (
          <TooltipProvider delayDuration={10}>
            <Tooltip>
              <TooltipTrigger asChild>
                <span className=" mx-auto">{icon}</span>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>{text}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ) : (
          <>
            {icon}
            <p>{text}</p>
          </>
        )}
      </Link>
    )
  );
};

export default SideNav;
