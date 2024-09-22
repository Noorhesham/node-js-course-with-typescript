"use client";
import React from "react";
import SideNav from "./SideNav";
import {
  BadgeCheck,
  BookmarkIcon,
  BriefcaseBusiness,
  CalendarClock,
  HandCoins,
  House,
  LogOutIcon,
  SlidersHorizontal,
  User,
  Users,
} from "lucide-react";
import { MdAddCircle, MdNotifications } from "react-icons/md";
import { usePathname } from "next/navigation";
import Head1 from "../defaults/Head1";

const iconsStyles = "w-5 h-5";

const patientLinks = [
  { text: "الرئيسية", href: "/patient/dashboard", icon: <House className={iconsStyles} /> },
  { text: "الحجوزات", href: "/patient/mybooks", icon: <BookmarkIcon className={iconsStyles} /> },
  { text: "جلساتي", href: "/patient/mysessions", icon: <CalendarClock className={iconsStyles} /> },
  { text: "الإعدادات", href: "/patient/profile", icon: <SlidersHorizontal className={iconsStyles} /> },
];

const SideBar = ({ iconsOnly = false, id, doctor }: { iconsOnly?: boolean; id?: string; doctor?: boolean }) => {
  const doctorLinks = [
    { text: "الرئيسية", href: `/clinic/${id}/dashboard`, icon: <House className={iconsStyles} /> },
    { text: "حالاتي", href: `/clinic/${id}/patients`, icon: <Users className={iconsStyles} /> },
    { text: "الحجوزات", href: `/clinic/${id}/mybooks`, icon: <BookmarkIcon className={iconsStyles} /> },
    { text: "جلساتي", href: `/clinic/${id}/mysessions`, icon: <CalendarClock className={iconsStyles} /> },
    { text: "المساعدين", href: `/clinic/${id}/assistants`, icon: <User className={iconsStyles} /> },
    { text: "المواعيد المتاحة", href: `/clinic/${id}/available-dates`, icon: <BadgeCheck className={iconsStyles} /> },
    { text: "الإعدادات", href: `/clinic/${id}/profile`, icon: <SlidersHorizontal className={iconsStyles} /> },
  ];
  const pathName = usePathname();
  const navItems = pathName.includes("patient") && !doctor ? patientLinks : doctorLinks;
  return (
    <div
      className={`flex items-center ${
        iconsOnly ? "sticky top-0" : "lg:sticky lg:top-0"
      } bg-light rounded-xl h-fit pb-5 flex-col col-span-full lg:col-span-2 gap-3`}
    >
      <Head1 size="text-xl" title="Welcome Noor ! " />
      <ul
        style={iconsOnly ? { alignItems: "center", padding: "15px" } : {}}
        className={`text-xs items-start ${
          !iconsOnly ? "grid grid-cols-2 w-full text-base" : "flex flex-col"
        } md:flex md:flex-col flex-nowrap md:flex-wrap gap-5 mt-3 lg:flex-col text-gray-900 font-semibold`}
      >
        {navItems.map((item, index) => (
          <SideNav iconsOnly={iconsOnly} key={index} link={item.href} text={item.text} icon={item.icon} />
        ))}
      </ul>
    </div>
  );
};

export default SideBar;
