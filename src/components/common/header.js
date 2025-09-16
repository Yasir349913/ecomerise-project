"use client";
import React from "react";
import { Search, Bell } from "lucide-react";

const Header = () => {
  return (
    <header
      className="bg-white px-6 py-4 flex items-center justify-between fixed top-0 z-10"
      style={{
        left: "280px", // Updated to match new sidebar width
        right: "0",
        height: "80px",
      }}
    >
      {/* Left spacer - creates 130px space after sidebar */}
      <div style={{ width: "130px" }}></div>

      {/* Search Bar */}
      <div className="flex-1 max-w-2xl">
        <div
          className="relative flex items-center"
          style={{
            width: "714px",
            height: "56.14px",
            borderRadius: "100px",
            backgroundColor: "#F7F7F7",
            padding: "1.53px 24.41px 1.53px 24.41px",
            justifyContent: "space-between",
          }}
        >
          <input
            type="text"
            placeholder="Search here"
            className="flex-1 bg-transparent border-none outline-none text-gray-700 placeholder-gray-500"
            style={{
              fontSize: "14px",
              padding: "0",
            }}
          />
          <Search className="text-gray-400 w-5 h-5 flex-shrink-0" />
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center space-x-4 ml-8">
        {/* Notification - Fully Rounded */}
        <div
          className="relative flex items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors"
          style={{
            width: "57.48px",
            height: "56.84px",
            border: "0.7px solid transparent",
            backgroundColor: "#F3F2F7",
            borderRadius: "100%", // Fully rounded
          }}
        >
          <Bell className="w-6 h-6 text-gray-600" />
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-600 rounded-full"></div>
        </div>

        {/* Profile Avatar */}
        <div
          className="overflow-hidden cursor-pointer"
          style={{
            width: "52px",
            height: "52px",
            borderRadius: "140.54px",
          }}
        >
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
