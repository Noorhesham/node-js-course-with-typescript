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
  const lang = cookies.get("NEXT_LOCALE");
  const isActive = pathName.replace(`/${lang}`, "") === `${link}`;

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    mounted && (
      <Link
        href={link}
        className={`flex  font-medium duration-150 cursor-pointer w-fit md:w-full rounded-lg p-1 lg:py-2 lg:px-4   items-center gap-2 self-start ${
          isActive && !iconsOnly
            ? " bg-hover  text-main2 hover:bg-gray-100 "
            : iconsOnly && isActive
            ? "bg-main2 text-gray-50 text-center mx-auto"
            : ""
        }`}
      >
        {iconsOnly ? (
          <TooltipProvider>
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
