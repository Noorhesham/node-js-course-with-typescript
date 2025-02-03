"use client";
import React from "react";
import Logo from "./Logo";
import NavItems from "./NavItems";
import Cart from "./Cart";
import User from "./User";
import SignButtons from "./SignButtons";
import MobileNav from "./MobileNav";
import MaxWidthWrapper from "./defaults/MaxWidthWrapper";
import { useGetEntity, useGetMe } from "@/utils/QueryFunctions";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "../context/AuthProvider";

const NavBar = () => {
  const { auth } = useAuth();
  const user = auth?.user;
  console.log(user);
  return (
    <nav className=" bg-white sticky z-50  top-0  inset-0 h-16">
      <header className=" relative bg-white">
        <MaxWidthWrapper>
          <div className=" border-b border-gray-200">
            <div className=" flex h-16 items-center">
              <MobileNav />
              <div className=" ml-4 flex lg:ml-0">
                <Logo />
              </div>
              <div className="hidden lg:ml-8 lg:block lg:self-stretch z-50">
                <NavItems />
              </div>
              <div className=" ml-auto flex items-center">
                <div className=" flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                  {auth.loading ? (
                    <Skeleton className=" w-8 h-8 rounded-full" />
                  ) : user ? (
                    <User user={user} />
                  ) : (
                    <SignButtons />
                  )}
                  <div className=" ml-4 flex items-center justify-center text-center ">
                    <Cart />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </MaxWidthWrapper>
      </header>
    </nav>
  );
};

export default NavBar;
