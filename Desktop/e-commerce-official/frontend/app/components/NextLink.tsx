import { buttonVariants } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";

const NextLink = ({ href, text, className }: { href: string; text?: string; className?: string }) => {
  return (
    <Link
      className={`${buttonVariants({ variant: "outline" })} ${className || ""} hover:text-rose-500 flex items-center`}
      href={href}
    >
      {text || "Next step"} <ArrowRight className="arrow1" />
    </Link>
  );
};

export default NextLink;
