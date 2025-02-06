"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavLink = ({ title, icon, href }: { title: string; icon: any; href: string }) => {
  const pathName = usePathname();
  return (
    <div className="flex p-2  text-sm md:text-base w-full text-left  flex-col  gap-2">
      <Link
        className={`flex w-full  hover:bg-rose-100 duration-150 py-2 px-4 rounded-xl  md:px-2 items-center  text-left  gap-2 ${
          pathName === `/${href}` ? "bg-rose-100 text-rose-700" : ""
        }`}
        href={`/${href}`}
      >
        {icon}
        <span className={`${pathName === `/${href}` ? "text-rose-900" : ""}  text-gray-700`}>{title}</span>
      </Link>
    </div>
  );
};

export default NavLink;
