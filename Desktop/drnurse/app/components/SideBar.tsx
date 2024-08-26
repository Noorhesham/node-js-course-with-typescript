import React from "react";
import SideNav from "./SideNav";
import {
  BadgeCheck,
  BriefcaseBusiness,
  CalendarClock,
  HandCoins,
  House,
  LogOutIcon,
  SlidersHorizontal,
  Users,
} from "lucide-react";
import { MdAddCircle, MdNotifications } from "react-icons/md";

const navItems = [
  { link: "/dashboard", text: "OVERVIEW", icon: <House /> },
  { link: "/dashboard/employees", text: "Find a Employee", icon: <Users /> },
  { link: "/dashboard/shipping-address", text: "MY JOBS", icon: <BriefcaseBusiness /> },
  { link: "/dashboard/wishlist", text: "POST A JOB", icon: <MdAddCircle /> },
  { link: "/dashboard/settings", text: "NOTIFICATIONS", icon: <MdNotifications /> },
  { link: "/dashboard/settings", text: "METTINGS", icon: <CalendarClock /> },
  { link: "/dashboard/settings", text: "JOB OFFER", icon: <HandCoins /> },
  { link: "/dashboard/employees", text: "COMPANY PROFILE", icon: <Users /> },
  { link: "/dashboard/employees", text: "Invoices & Subscriptions", icon: <BadgeCheck /> },
  { link: "/dashboard/employees", text: "SETTINGS", icon: <SlidersHorizontal /> },
  { link: "", text: "LOG-OUT", icon: <LogOutIcon /> },
];

const SideBar = ({ iconsOnly = false }: { iconsOnly?: boolean }) => {
  return (
    <div className="flex bg-light rounded-xl h-fit pb-5 md:flex-col flex-row col-span-2 gap-3">
      <h1 className="px-6 py-3 mt-4 text-main2 font-semibold">{!iconsOnly ? "HOSPITAL DASHBOARD" : "HDB"}</h1>
      <ul
        style={iconsOnly ? { alignItems: "center" } : {}}
        className="text-xs lg:text-sm items-start flex md:flex-col flex-row flex-wrap gap-5 mt-3 lg:flex-col text-gray-900 font-semibold"
      >
        {navItems.map((item, index) => (
          <SideNav iconsOnly={iconsOnly} key={index} link={item.link} text={item.text} icon={item.icon} />
        ))}
      </ul>
    </div>
  );
};

export default SideBar;
