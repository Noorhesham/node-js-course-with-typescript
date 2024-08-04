import Link from "next/link";
import React from "react";
import { ArrowRight } from "./Icons";

const LinkButton = ({ href, text }: { href: string; text: string }) => {
  return (
    <div>
      <button className=" hover:shadow-sm hover:shadow-main duration-150 hover:translate-x-5 group bg-transparent flex items-center gap-2 font-semibold text-main rounded-full border-2 border-main py-3 px-6">
        <Link href={href}>{text}</Link>
        <ArrowRight />
      </button>
    </div>
  );
};

export default LinkButton;
