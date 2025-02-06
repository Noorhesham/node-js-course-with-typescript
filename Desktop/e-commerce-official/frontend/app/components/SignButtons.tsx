import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const SignButtons = () => {
  return (
    <div className="flex items-center gap-5">
      <Link href={"/login"} className={buttonVariants({ variant: "default" })}>
        Sign in
      </Link>
      <Link href={"/signup"} className={buttonVariants({ variant: "ghost" })} variant={"ghost"}>
        Sign up
      </Link>
    </div>
  );
};

export default SignButtons;
