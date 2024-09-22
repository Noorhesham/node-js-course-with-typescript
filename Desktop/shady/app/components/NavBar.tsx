"use client";
import React, { useEffect, useState } from "react";
import Logo from "./Logo";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import PhoneNav from "./PhoneNav";
import { Button } from "@/components/ui/button";
import { ThemeSwitcher } from "./ThemeSwitcher";
import Image from "next/image";
import cookies from "js-cookie";
import { LogOutIcon } from "lucide-react";
import { BASE_URL, useGetEntity } from "@/lib/QueryFunctions";
import User from "./User";
const NavBar = () => {
  const [isAuth, setIsAuth] = useState(false);
  const [isScrollingDown, setIsScrollingDown] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isTopPage, setIsTopPage] = useState(true);
  const router = useRouter();
  const pathName = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY < 50) {
        setIsTopPage(true);
      } else setIsTopPage(false);
      if (window.scrollY > lastScrollY) {
        setIsScrollingDown(true);
      } else {
        setIsScrollingDown(false);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, isTopPage]);
  useEffect(() => {
    const token = cookies.get("token");
    if (token) setIsAuth(true);
    else setIsAuth(false);
  }, []);

  return (
    <header className="w-full">
      <nav
        className={`fixed inset-0 z-50 max-h-[5rem] flex flex-col gap-2 py-4 transition-all duration-300 backdrop-blur-md ${
          isTopPage ? "bg-transparent" : "bg-black/50"
        } ${isScrollingDown ? "-translate-y-[4rem]" : "translate-y-0"}`}
      >
        <MaxWidthWrapper noPadding>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-20">
              <div className="flex gap-2 items-center">
                <Logo />
                <ThemeSwitcher />
              </div>
              <div className={`z-[999] duration-150 h-full`}>
                <PhoneNav
                  navigation={[
                    { href: "/", text: "Home" },
                    { href: "/about", text: "About" },
                  ]}
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              {isAuth ? (
                <div className=" flex items-center gap-5">
                  {" "}
                  <User />
                  <Button
                    onClick={async () => {
                      await fetch(`${BASE_URL}students/logout`);
                      cookies.remove("token");
                      setIsAuth(false);
                      router.refresh();
                    }}
                    className="flex items-center gap-2 group "
                    variant={"outline"}
                  >
                    Log Out <LogOutIcon className="w-4 h-4 group-hover:rotate-180 duration-150" />
                  </Button>{" "}
                </div>
              ) : (
                <>
                  <Button className="flex gap-2 items-center px-4 lg:px-8 hover:text-gray-50 bg-violet-300 text-gray-700">
                    <Link className="flex gap-2 items-center" href="/login">
                      سجل الدخول <Image src="/295128.png" alt="login" width={20} height={20} />
                    </Link>
                  </Button>
                  <Button className="px-4 lg:px-8">
                    <Link href={"/signup"}>انشئ حسابك</Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        </MaxWidthWrapper>
      </nav>
    </header>
  );
};

export default NavBar;
