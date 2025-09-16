"use client";
import React from "react";
import { Search, Bell } from "lucide-react";

const Header = () => {
  return (
    <header className="bg-white px-4 md:px-6 lg:px-8 py-3 md:py-4 flex items-center justify-between fixed top-0 z-10 h-16 md:h-18 lg:h-20 left-64 md:left-72 lg:left-80 right-0">
      {/* Left spacer - creates space after sidebar */}
      <div className="w-20 md:w-28 lg:w-32 xl:w-36"></div>

      {/* Search Bar */}
      <div className="flex-1 max-w-sm md:max-w-lg lg:max-w-2xl xl:max-w-3xl">
        <div className="relative flex items-center w-full max-w-[500px] md:max-w-[600px] lg:max-w-[714px] h-12 md:h-14 lg:h-[56px] rounded-full bg-[#F7F7F7] px-4 md:px-5 lg:px-6 justify-between">
          <input
            type="text"
            placeholder="Search here"
            className="flex-1 bg-transparent border-none outline-none text-gray-700 placeholder-gray-500 text-sm md:text-base p-0"
          />
          <Search className="text-gray-400 w-4 h-4 md:w-5 md:h-5 flex-shrink-0" />
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center space-x-3 md:space-x-4 ml-4 md:ml-6 lg:ml-8">
        {/* Notification - Fully Rounded */}
        <div className="relative flex items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors w-12 h-12 md:w-14 md:h-14 lg:w-[57px] lg:h-[57px] border border-transparent bg-[#F3F2F7] rounded-full">
          <Bell className="w-5 h-5 md:w-6 md:h-6 text-gray-600" />
          <div className="absolute -top-0.5 -right-0.5 md:-top-1 md:-right-1 w-2.5 h-2.5 md:w-3 md:h-3 bg-blue-600 rounded-full"></div>
        </div>

        {/* Profile Avatar */}
        <div className="overflow-hidden cursor-pointer w-10 h-10 md:w-12 md:h-12 lg:w-[52px] lg:h-[52px] rounded-full">
          <img
            src="/images/avatar.jpg"
            alt="Profile"
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src =
                "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='52' height='52' viewBox='0 0 52 52'%3E%3Crect width='52' height='52' fill='%23e5e7eb'/%3E%3Ctext x='26' y='30' text-anchor='middle' fill='%236b7280' font-family='Arial' font-size='16'%3EU%3C/text%3E%3C/svg%3E";
            }}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
