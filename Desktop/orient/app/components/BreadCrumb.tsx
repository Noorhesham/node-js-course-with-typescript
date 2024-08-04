"use client";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { FaHome } from "react-icons/fa";
const BreadCrumb = () => {
  const router = useRouter();
  const pathName = usePathname();
  const links: any = pathName.split("/").filter((link) => !["ar", "en"].includes(link));
  console.log(links);
  return (
    <Breadcrumb className=" py-3 px-6 bg-gradient-to-r from-[#ff007b2f] via-white to-[#00a2ff3f]">
      <BreadcrumbList className=" ml-14">
        {links.map((link: any, i: number) => {
          const isLast = i === links.length - 1;
          return (
            <div className="flex items-center" key={i}>
              <BreadcrumbItem>
                {
                  <BreadcrumbLink
                    className={`${
                      global?.window?.location.pathname === `/${link}`
                        ? " text-main  hover:text-pink-400 duration-150"
                        : " text-[#191c1f86]"
                    } flex uppercase items-center gap-2`}
                    href={`/${link.href || link}`}
                  >
                    {i === 0 && <FaHome />} {link === "" ? "Home" : link.replace("-", " ") || ""}
                  </BreadcrumbLink>
                }
              </BreadcrumbItem>
              {!isLast && <BreadcrumbSeparator />}
            </div>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default BreadCrumb;
