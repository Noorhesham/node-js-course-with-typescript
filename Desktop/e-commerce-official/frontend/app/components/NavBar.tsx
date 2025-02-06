"use client";
import React from "react";
import NavItems from "./NavItems";

import MobileNav from "./MobileNav";
import MaxWidthWrapper from "./defaults/MaxWidthWrapper";
import { Skeleton } from "@/components/ui/skeleton";
import Logo from "./Logo";
import SignButtons from "./SignButtons";
import { useAuth } from "../context/AuthProvider";
import User from "./User";

const NavBar = () => {
  const { auth } = useAuth();
  const user = auth?.user;
  return (
    <nav className=" sticky bg-black z-50  top-0  inset-0 h-16">
      <header className=" pt-2 relative">
        <MaxWidthWrapper noPadding>
          <div className=" border-b border-gray-200">
            <div className=" flex  items-center">
              <MobileNav />
              <div className=" ml-4 flex lg:ml-0">
                <Logo />
              </div>
              <div className="hidden lg:ml-8 lg:block lg:self-stretch z-50">
                <NavItems />
              </div>
              <div className=" ml-auto">
                {auth?.loading ? (
                  <Skeleton className=" w-6 h-6 rounded-full" />
                ) : user ? (
                  <User user={user} />
                ) : (
                  <div className=" ml-auto flex items-center">
                    <SignButtons />
                  </div>
                )}
              </div>
            </div>
          </div>
        </MaxWidthWrapper>
      </header>
    </nav>
  );
};

export default NavBar;
