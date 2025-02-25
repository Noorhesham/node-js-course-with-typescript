import React from "react";
import { MaxWidthWrapper } from "./MaxWidthWrapper";
import Logo from "./Logo";
import { useNav } from "@/context/NavContext";

const NavBar = () => {
  const { title } = useNav();

  return (
    <MaxWidthWrapper className="flex fixed left-1/2 -translate-x-1/2 items-center gap-5  z-50 w-full mx-auto">
      <Logo />
      <span className="   bg-main  w-full h-[0.5px] left-0 bottom-0"></span>
      <h2 className="special-font  text-nowrap   text-main">{title || "Main Page"}</h2>
    </MaxWidthWrapper>
  );
};

export default NavBar;
