"use client";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const SignButtons = () => {
  const pathName = usePathname();
  return (
    <>
      <Link
        className={buttonVariants({ variant: "ghost", className: " text-xs sm:text-sm" })}
        href={`/signin?redirect=${pathName}`}
      >
        Sign in
      </Link>
      <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
      <Link className={buttonVariants({ size: "sm", className: " text-xs sm:text-sm" })} href={"/signup"}>
        Create account
      </Link>
      <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
    </>
  );
};

export default SignButtons;
