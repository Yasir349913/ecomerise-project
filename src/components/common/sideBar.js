"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FileText, Brain, Puzzle, Settings } from "lucide-react";

const Sidebar = () => {
  const pathname = usePathname();

  const menuItems = [
    {
      icon: "custom",
      iconSrc: "/images/icon1.png",
      label: "Anomaly Detector",
      href: "/",
    },
    {
      icon: FileText,
      label: "Agent Journal",
      href: "/agentJournal",
    },
    {
      icon: "custom",
      iconSrc: "/images/icon2.png",
      label: "Analytics Agent",
      href: "/analytics",
    },
    {
      icon: "custom",
      iconSrc: "/images/icon3.png",
      label: "Create New Agent",
      href: "/newAgent",
    },
  ];

  const bottomMenuItems = [
    {
      icon: Brain,
      label: "AI Advisor",
      href: "/ai-advisor",
    },
    {
      icon: "image",
      iconSrc: "/images/stars.png",
      label: "Integrations",
      href: "/integrations",
    },
    {
      icon: "image",
      iconSrc: "/images/settings.png",
      label: "Settings",
      href: "/settings",
    },
  ];

  const isActive = (href) => {
    if (href === "/") {
      return pathname === "/" || pathname === "/anomaly-detectors";
    }
    return pathname === href;
  };

  const renderIcon = (item, active) => {
    if (item.icon === "custom" || item.icon === "image") {
      return (
        <img
          src={item.iconSrc}
          alt={`${item.label} icon`}
          className={`w-4 h-4 md:w-5 md:h-5 mr-2 md:mr-3 ${
            active ? "opacity-100" : "opacity-70"
          }`}
        />
      );
    } else if (typeof item.icon === "string" && item.icon.startsWith("/")) {
      return (
        <img
          src={item.icon}
          alt={`${item.label} icon`}
          className={`w-4 h-4 md:w-5 md:h-5 mr-2 md:mr-3 ${
            active ? "opacity-100" : "opacity-70"
          }`}
        />
      );
    } else {
      const IconComponent = item.icon;
      const iconClass = active
        ? "w-4 h-4 md:w-5 md:h-5 mr-2 md:mr-3 text-blue-700"
        : "w-4 h-4 md:w-5 md:h-5 mr-2 md:mr-3 text-gray-500";
      return <IconComponent className={iconClass} />;
    }
  };

  return (
    <aside
      className="flex flex-col fixed z-[1000] overflow-y-auto overflow-x-hidden box-border w-64 md:w-68 lg:w-72 xl:w-80 max-w-64 md:max-w-68 lg:max-w-72 xl:max-w-80 min-w-64 md:min-w-68 lg:min-w-72 xl:min-w-80 rounded-[30px] border border-white"
      style={{
        width: "280px",
        maxWidth: "280px",
        minWidth: "280px",
        height: "calc(100vh - 46px)",
        top: "23px",
        left: "24px",
        background: "linear-gradient(180deg, #D2F2F0 17%, #F4FCFB 70%)",
      }}
    >
      {/* Logo Section */}
      <div className="px-3 md:px-4 py-3 md:py-4 flex-shrink-0">
        <div className="flex items-center space-x-2 md:space-x-3">
          <img
            src="/images/logo.png"
            alt="Logo"
            className="w-8 h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 rounded-lg"
          />
          <span className="text-sm md:text-base lg:text-lg font-semibold text-[#1457DC] font-['Plus_Jakarta_Sans',sans-serif] truncate">
            {pathname === "/" ? "ORBIEAI" : "AMPLYUP.AI"}
          </span>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 px-3 md:px-4 py-2 min-h-0">
        <ul className="space-y-1.5 md:space-y-2">
          {menuItems.map((item, index) => {
            const active = isActive(item.href);
            const linkClass = active
              ? "flex items-center px-2 md:px-3 py-2 md:py-2.5 rounded-lg text-xs md:text-sm font-medium transition-colors bg-blue-50 text-blue-700"
              : "flex items-center px-2 md:px-3 py-2 md:py-2.5 rounded-lg text-xs md:text-sm font-medium transition-colors text-gray-700 hover:bg-gray-50 hover:text-gray-900";

            return (
              <li key={index}>
                <Link href={item.href} className={linkClass}>
                  {renderIcon(item, active)}
                  <span className="truncate text-xs md:text-sm">
                    {item.label}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Bottom Section */}
      {pathname === "/" ? (
        <nav className="px-3 md:px-4 py-4 md:py-6 flex-shrink-0">
          <ul className="space-y-1.5 md:space-y-2">
            {bottomMenuItems.map((item, index) => {
              const active = isActive(item.href);
              const linkClass = active
                ? "flex items-center px-2 md:px-3 py-2 md:py-2.5 rounded-lg text-xs md:text-sm font-medium transition-colors bg-blue-50 text-blue-700"
                : "flex items-center px-2 md:px-3 py-2 md:py-2.5 rounded-lg text-xs md:text-sm font-medium transition-colors text-gray-700 hover:bg-gray-50 hover:text-gray-900";

              return (
                <li key={index}>
                  <Link href={item.href} className={linkClass}>
                    {renderIcon(item, active)}
                    <span className="truncate text-xs md:text-sm">
                      {item.label}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      ) : (
        <div className="px-3 md:px-4 py-4 md:py-6 flex-shrink-0">
          <div className="text-center">
            <div className="text-xs md:text-sm font-semibold text-gray-900 mb-1">
              AMPLYUP.AI
            </div>
            <div className="text-[10px] md:text-xs text-gray-500 mb-1">
              © 2024. All rights reserved.
            </div>
            <div className="text-[10px] md:text-xs text-gray-500">
              Designed by <span className="text-red-500">❤</span> Designed
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
