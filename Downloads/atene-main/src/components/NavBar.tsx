"use client";

import { useState } from "react";
import { ChevronDown, Heart, Grid3X3, MessageSquare, ShoppingCart } from "lucide-react";
import MaxWidthWrapper from "./MaxwidthWrapper";

/**
 * Navbar component with interactive state
 * Exactly matches the provided design with RTL support for Arabic
 */
const NavbarWithState = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("جميع الفئات");

  // Sample categories
  const categories = ["جميع الفئات", "الإلكترونيات", "الملابس", "المنزل والحديقة", "الجمال والعناية الشخصية"];

  return (
    <div className="w-full shadow-sm " dir="rtl">
      {/* Main navbar */}
      <MaxWidthWrapper className="bg-white border-b border-gray-200 !py-5">
        <div className="max-w-screen-xl mx-auto flex items-center justify-between px-4">
          {/* Right section with cart and logo */}
          <div className="flex items-center gap-4">
            {/* Logo */}
            <img src="/logoblack.svg" className="  h-10" alt="logo" />
          </div>
          {/* Center search bar */}
          <div className="flex-1 max-w-2xl mx-4">
            <div className="relative flex">
              {" "}
              {/* Search input */}
              <input
                type="text"
                className="w-full border border-gray-700 rounded-md py-2 pr-3  focus:outline-none"
                placeholder="البحث"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {/* Search button */}
              <button className="absolute left-0 top-0 h-full bg-light  text-white px-4 rounded-l-md flex items-center">
                البحث
              </button>
              {/* Categories dropdown */}
              <div className="absolute left-20 top-0 h-full flex items-center">
                <div className="relative">
                  <button
                    className="flex items-center gap-1 px-3 text-gray-600 text-sm h-full"
                    onClick={() => setCategoryOpen(!categoryOpen)}
                  >
                    <span>{selectedCategory}</span>
                    <ChevronDown size={16} />
                  </button>

                  {/* Dropdown menu */}
                  {categoryOpen && (
                    <div className="absolute left-0 top-full mt-1 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                      {categories.map((category) => (
                        <button
                          key={category}
                          className="block w-full text-right px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => {
                            setSelectedCategory(category);
                            setCategoryOpen(false);
                          }}
                        >
                          {category}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          {/* Left section with profile and icons */}
          <div className="flex items-center gap-5">
            {/* Profile circle */}
            {/* Navigation icons */}
            <div className="flex items-center gap-5 text-gray-500">
              <button className="hover:text-gray-700">
                <MessageSquare size={20} />
                <span className="sr-only">الرسائل</span>
              </button>
              <button className="hover:text-gray-700">
                <Heart size={20} />
                <span className="sr-only">المفضلة</span>
              </button>
              <button className="hover:text-gray-700">
                <Grid3X3 size={20} />
                <span className="sr-only">الفئات</span>
              </button>
            </div>{" "}
            <div className="w-10 h-10 rounded-full bg-[#6c7a89] flex items-center justify-center">
              <span className="sr-only">الملف الشخصي</span>
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default NavbarWithState;
