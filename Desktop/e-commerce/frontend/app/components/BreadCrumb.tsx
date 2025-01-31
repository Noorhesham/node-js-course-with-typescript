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
import MaxWidthWrapper from "./defaults/MaxWidthWrapper";
import Head1 from "./Head1";
import { cn } from "@/frontend/lib/utils";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import BackButton from "./BackButton";
const BreadCrumb = ({ linksCustom }: { linksCustom?: { href: string; text: string }[] }) => {
  const router = useRouter();
  const pathName = usePathname();
  const links: any = linksCustom || pathName.split("/").filter((link) => !["ar", "en"].includes(link));

  const current = links[links.length - 1];
  const dark =
    pathName.includes("doctor") ||
    pathName.includes("company-profile") ||
    pathName.includes("profile-settings") ||
    pathName.includes("my-profile") ||
    pathName.includes("job/") ||
    pathName.includes("applicant") ||
    pathName.includes("applications");
  return (
    <Breadcrumb className={cn(" py-3 ", dark ? "bg-main2 text-gray-50" : " bg-[#F2F5FF]")}>
      <MaxWidthWrapper
        className="flex md:flex-row flex-col gap-2 md:items-center items-start justify-between"
        noPadding
      >
        {dark ? (
          <BackButton />
        ) : (
          <Head1 alignment="left" size="sm" text={current.text || current?.replace("-", " ") || ""} />
        )}
        <BreadcrumbList className=" ">
          {links.map((link: any, index: any) => {
            const isLast = index === links.length - 1;
            return (
              <div className="flex items-center" key={index}>
                <BreadcrumbItem>
                  <Link
                    className={`${
                      global?.window?.location.pathname === `/${link}`
                        ? " text-main  hover:text-blue-400 duration-150"
                        : dark
                        ? "text-gray-50"
                        : " text-[#191c1f86]"
                    } flex uppercase items-center gap-2`}
                    href={`${link.href === "" ? "/" : link.href || link}`}
                  >
                    {index === 0 && <FaHome />}

                    {link.text
                      ? link.text.length > 10
                        ? `${link.text.slice(0, 10)}...`
                        : link.text
                      : link === ""
                      ? "HOME"
                      : link.replace("-", "  ").toLowerCase()}
                  </Link>
                </BreadcrumbItem>
                {!isLast && <BreadcrumbSeparator />}
              </div>
            );
          })}
        </BreadcrumbList>
      </MaxWidthWrapper>
    </Breadcrumb>
  );
};

export default BreadCrumb;
