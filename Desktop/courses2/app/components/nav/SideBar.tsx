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
const iconsStyles = "w-5 h-5";

const SideBar = ({ iconsOnly = false, person }: { iconsOnly?: boolean; person?: boolean }) => {
  const origin = person ? "/person" : "/dashboard";
  const navItems = [
    { link: `${origin}`, text: "OVERVIEW", icon: <House className={iconsStyles} /> },
    ...(person
      ? []
      : [{ link: `${origin}/employees`, text: "Find a Employee", icon: <Users className={iconsStyles} /> }]),
    { link: `${origin}/jobs`, text: "MY JOBS", icon: <BriefcaseBusiness className={iconsStyles} /> },
    ...(person
      ? [{ link: `${origin}/bookmarked-jobs`, text: "BOOKMARKED JOBS", icon: <BookmarkIcon className={iconsStyles} /> }]
      : [{ link: `${origin}/post-job`, text: "POST A JOB", icon: <MdAddCircle className={iconsStyles} /> }]),
    { link: `${origin}/notifications`, text: "NOTIFICATIONS", icon: <MdNotifications className={iconsStyles} /> },
    { link: `${origin}/meetings`, text: "METTINGS", icon: <CalendarClock className={iconsStyles} /> },
    { link: `${origin}/job-offers`, text: "JOB OFFER", icon: <HandCoins className={iconsStyles} /> },
    ...(person
      ? [{ link: `${origin}/my-profile`, text: "MY PROFILE", icon: <User className={iconsStyles} /> }]
      : [{ link: `${origin}/company-profile/1`, text: "COMPANY PROFILE", icon: <Users className={iconsStyles} /> }]),
    ...(person
      ? [{ link: `${origin}/points`, text: "Invoices & Subscriptions", icon: <BadgeCheck className={iconsStyles} /> }]
      : [
          {
            link: `${origin}/invoices`,
            text: "Invoices & Subscriptions",
            icon: <BadgeCheck className={iconsStyles} />,
          },
        ]),
    { link: `${origin}/settings`, text: "SETTINGS", icon: <SlidersHorizontal className={iconsStyles} /> },
    { link: "", text: "LOG-OUT", icon: <LogOutIcon className={iconsStyles} /> },
  ];
  return (
    <div
      className={`flex items-center ${
        iconsOnly ? "sticky top-0" : "lg:sticky lg:top-0"
      } lg bg-light rounded-xl h-fit pb-5 flex-col  col-span-full lg:col-span-2 gap-3`}
    >
      <h1 className="lg:px-6 py-3 mt-4 text-main2 font-semibold">{!iconsOnly ? "HOSPITAL DASHBOARD" : "HDB"}</h1>
      <ul
        style={iconsOnly ? { alignItems: "center", padding: "15px" } : {}}
        className={`text-xs :text-sm items-start ${
          !iconsOnly ? "grid grid-cols-2  w-full  text-base" : "flex flex-col"
        } md:flex md:flex-col flex-nowrap md:flex-wrap gap-5 mt-3 lg:flex-col text-gray-900 font-semibold`}
      >
        {navItems.map((item, index) => (
          <SideNav iconsOnly={iconsOnly} key={index} link={item.link} text={item.text} icon={item.icon} />
        ))}
      </ul>
    </div>
  );
};

export default SideBar;
