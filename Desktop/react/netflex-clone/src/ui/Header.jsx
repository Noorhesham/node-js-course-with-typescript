import {  Link, NavLink } from "react-router-dom";
import { useLogout } from "../features/authentication/useLogout";
import {  IoMdNotificationsOutline  } from "react-icons/io";
import { IoPerson } from "react-icons/io5";
import { VscSignOut } from "react-icons/vsc";
import { PiTelevisionThin } from "react-icons/pi";
import { MdRateReview } from "react-icons/md";

import DropMenu from "./DropMenu";
import Search from "../ui/search/Search";
import { useEffect, useState } from "react";
import HeaderPhone from "./HeaderPhone";
import { useSearchQuery } from "../context/useSearchQuery";

function Header() {
  const {setQuery}=useSearchQuery()
  const links = [
    { name: "Home", href: "main", },
    { name: "Tv Shows", href: "shows", },
    { name: "Movies", href: "movies", },
    { name: "Actors", href: "actors",  },
    { name: "Companies", href: "companies", },
    { name: "My List", href: "list", },
  ];
  const { isLoggingOut, logout } = useLogout();
  const [navBar,setNavBar]=useState(false);

   const handleScroll = () => {
    if(window.pageYOffset > 10) setNavBar(true);
    else setNavBar(false)
  };
  
  useEffect(() => {
   window.addEventListener('scroll', handleScroll, true);
    return () =>window.removeEventListener('scroll', handleScroll, true);
  }, []);
  return (
    <>
     <HeaderPhone onClick={()=>setQuery("")} links={links} />
    <header className={` flex  justify-between items-center py-4 px-6 bg-black lg:bg-black/10 fixed  w-full z-50 duration-300 ${navBar&&"is-sticky"}`}>
        <div>
            <img className=" w-[7.5rem]" src="logo.png" alt="" />
        </div>
      <ul className=" hidden lg:flex  gap-5 items-center flex-1  lg:ml-10 text-[.9rem] font-medium text-gray-300">
        {links.map(link=><li key={link.href}><NavLink onClick={()=>setQuery("")} className="hover:text-gray-400 transition-all duration-100" to={link.href}>{link.name}</NavLink></li>)}

      </ul>
      <div className="flex items-center gap-5 text-2xl  lg:mr-5">
        <Search/>
        <IoMdNotificationsOutline />
        <div className="flex items-center text-xl relative">
         
          <DropMenu>
            <DropMenu.Toggle id={1} /> 
            <DropMenu.Menu id={1}>
            <li  className=" hover:text-white transition-all duration-100 hover:underline"><Link to="account" className="flex items-center gap-2"><IoPerson/> Account</Link></li>
            <li className=" hover:text-white transition-all duration-100 hover:underline"><Link to="list" className="flex items-center gap-2"><PiTelevisionThin/> watch list</Link></li>
            <li className=" hover:text-white transition-all duration-100 hover:underline"><Link className="flex items-center gap-2"><MdRateReview/> my reviews</Link></li>
            <li className=" flex items-center gap-2 hover:underline hover:text-red-600
             transition-all duration-100 cursor-pointer " onClick={() => logout()}><VscSignOut/> Sign out</li>
            </DropMenu.Menu>
          </DropMenu>
        </div>
      </div>

    </header>
     </>
  );
}

export default Header;
