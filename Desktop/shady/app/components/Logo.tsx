import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Logo = ({ size = "sm" }: { size?: "sm" | "lg" }) => {
  return (
    <Link href="/" className={cn(" rounded-full overflow-hidden relative", size === "sm" ? "w-12 h-12" : "w-32 h-32")}>
      <Image src={"/channels4_profile (1).jpg"} alt="logo" fill />
    </Link>
  );
};

export default Logo;
