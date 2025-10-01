"use client";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FileText,
  Brain,
  Menu,
  X,
  Home,
  BarChart3,
  Plus,
  Settings,
  Star,
  ChevronDown,
  ChevronRight,
} from "lucide-react";

const Sidebar = () => {
  const pathname = usePathname();

  // --- Mobile drawer state ---
  const [mobileOpen, setMobileOpen] = useState(false);
  const drawerRef = useRef(null);

  // --- Expandable menu state ---
  const [expandedMenus, setExpandedMenus] = useState({
    anomalyDetector: false,
    analyticsAgent: false,
  });

  // Auto-expand based on current path
  useEffect(() => {
    if (pathname === "/anomaly-main" || pathname === "/anomaly-agent-journal") {
      setExpandedMenus((prev) => ({ ...prev, anomalyDetector: true }));
    } else if (
      pathname === "/analytics-main" ||
      pathname === "/analytics-agent-journal" ||
      pathname === "/newAgent"
    ) {
      setExpandedMenus((prev) => ({ ...prev, analyticsAgent: true }));
    }
  }, [pathname]);

  // Close drawer when route changes
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Close on Esc
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setMobileOpen(false);
    if (mobileOpen) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

  const toggleMenu = (menuKey) => {
    setExpandedMenus((prev) => ({
      ...prev,
      [menuKey]: !prev[menuKey],
    }));
  };

  const menuStructure = [
    {
      id: "anomalyDetector",
      icon: "custom",
      iconSrc: "/images/icon1.png",
      label: "Anomaly Detector",
      href: "/",
      submenus: [
        {
          icon: FileText,
          label: "Main",
          href: "/",
        },
        {
          icon: FileText,
          label: "Agent Journal",
          href: "/agentJournal",
        },
      ],
    },
    {
      id: "analyticsAgent",
      icon: "custom",
      iconSrc: "/images/icon2.png",
      label: "Analytics Agent",
      href: "/analytics",
      submenus: [
        {
          icon: FileText,
          label: "Main",
          href: "/analytics-main",
        },
        {
          icon: FileText,
          label: "Agent Journal",
          href: "/agentJournal",
        },
      ],
    },
    {
      id: "createNewAgent",
      icon: "custom",
      iconSrc: "/images/icon3.png",
      label: "Create New Agent",
      href: "/newAgent",
      submenus: [],
    },
  ];

  const bottomMenuItems = [
    { icon: Brain, label: "AI Advisor", href: "/ai-advisor" },
    {
      icon: Star,
      label: "Integrations",
      href: "/integrations",
    },
    {
      icon: Settings,
      label: "Settings",
      href: "/settings",
    },
  ];

  const isActive = (href) => {
    if (href === "/") return pathname === "/";
    return pathname === href;
  };

  const renderIcon = (item, active = false, sizeHint = "lg") => {
    const sizeClass =
      sizeHint === "sm"
        ? "w-4 h-4 md:w-4 md:h-4 mr-3 flex-shrink-0"
        : "w-5 h-5 md:w-5 md:h-5 mr-3 flex-shrink-0";

    if (item.icon && item.icon !== "custom") {
      try {
        const IconComp = item.icon;
        const colorClass = active ? "text-white" : "text-gray-600";
        return <IconComp className={`${sizeClass} ${colorClass}`} />;
      } catch (err) {
        // swallow and continue to fallback
      }
    }

    if (item.icon === "custom" && item.iconSrc) {
      const dim = sizeHint === "sm" ? 16 : 20;
      return (
        <img
          src={item.iconSrc}
          alt={`${item.label} icon`}
          width={dim}
          height={dim}
          className="mr-3 flex-shrink-0"
          style={{
            width: `${dim}px`,
            height: `${dim}px`,
            objectFit: "contain",
          }}
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
        />
      );
    }

    return <span className={`${sizeClass}`} />;
  };

  const baseClasses =
    "flex flex-col fixed z-[1000] overflow-y-auto overflow-x-hidden box-border " +
    "rounded-[30px] border border-gray-200 shadow-lg";

  const motionClasses = [
    "transition-transform duration-300 ease-out",
    "md:translate-x-0",
    mobileOpen ? "translate-x-0" : "-translate-x-[calc(100%+24px)]",
  ].join(" ");

  return (
    <>
      {/* Mobile toggle */}
      <button
        type="button"
        aria-label="Open sidebar"
        className="md:hidden fixed top-3 left-3 z-[1100] inline-flex items-center justify-center w-10 h-10 rounded-full bg-white shadow"
        onClick={() => setMobileOpen(true)}
      >
        <Menu className="w-5 h-5 text-gray-700" />
      </button>

      {/* Overlay for mobile */}
      {mobileOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/30 z-[900]"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Close button */}
      <button
        type="button"
        aria-label="Close sidebar"
        className={`md:hidden fixed top-3 left-[calc(24px+280px-40px)] z-[1100] inline-flex items-center justify-center w-10 h-10 rounded-full bg-white shadow transition-opacity ${
          mobileOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMobileOpen(false)}
      >
        <X className="w-5 h-5 text-gray-700" />
      </button>

      <aside
        ref={drawerRef}
        className={`${baseClasses} ${motionClasses} w-64 md:w-68 lg:w-72 xl:w-80 max-w-64 md:max-w-68 lg:max-w-72 xl:max-w-80 min-w-64 md:min-w-68 lg:min-w-72 xl:min-w-80`}
        style={{
          width: "280px",
          maxWidth: "280px",
          minWidth: "280px",
          height: "calc(100vh - 46px)",
          top: "23px",
          left: "24px",
          background: "white",
        }}
        role="navigation"
        aria-label="Sidebar"
      >
        {/* Logo Section */}
        <div className="px-3 md:px-4 py-3 md:py-4 flex-shrink-0 border-b border-gray-100">
          <div className="flex items-center space-x-2 md:space-x-3">
            <img
              src="/images/logo.png"
              alt="Logo"
              className="w-8 h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 rounded-lg"
            />
            <span className="text-sm md:text-base lg:text-lg font-semibold text-gray-800 font-['Plus_Jakarta_Sans',sans-serif] truncate">
              {pathname === "/" ? "ORBIEAI" : "AMPLYUP.AI"}
            </span>
          </div>
        </div>

        {/* Main Navigation */}
        <nav className="flex-1 px-3 md:px-4 py-4 min-h-0">
          <ul className="space-y-2">
            {menuStructure.map((item) => {
              const active = isActive(item.href);
              const hasSubmenus = item.submenus && item.submenus.length > 0;
              const isExpanded = expandedMenus[item.id];

              return (
                <li key={item.id}>
                  {/* Main Menu Item */}
                  <div
                    className={
                      active
                        ? "flex items-center justify-between px-3 md:px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 bg-[#5F44FA] text-white shadow-sm cursor-pointer"
                        : "flex items-center justify-between px-3 md:px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 text-gray-700 hover:bg-gray-50 hover:text-gray-900 cursor-pointer"
                    }
                    onClick={() => {
                      if (hasSubmenus) {
                        toggleMenu(item.id);
                      } else {
                        window.location.href = item.href;
                      }
                    }}
                  >
                    <div className="flex items-center flex-1 min-w-0">
                      {renderIcon(item, active, "lg")}
                      <span className="truncate text-sm font-medium font-['Plus_Jakarta_Sans',sans-serif]">
                        {item.label}
                      </span>
                    </div>
                    {hasSubmenus && (
                      <div className="ml-2 flex-shrink-0">
                        {isExpanded ? (
                          <ChevronDown
                            className={`w-4 h-4 ${
                              active ? "text-white" : "text-gray-600"
                            }`}
                          />
                        ) : (
                          <ChevronRight
                            className={`w-4 h-4 ${
                              active ? "text-white" : "text-gray-600"
                            }`}
                          />
                        )}
                      </div>
                    )}
                  </div>

                  {/* Submenus */}
                  {hasSubmenus && isExpanded && (
                    <ul className="mt-1 space-y-1">
                      {item.submenus.map((submenu, subIndex) => {
                        const subActive = isActive(submenu.href);
                        const submenuClass = subActive
                          ? "flex items-center px-3 md:px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 bg-[#5F44FA] text-white shadow-sm ml-4"
                          : "flex items-center px-6 md:px-8 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 text-gray-600 hover:bg-gray-50 hover:text-gray-900 ml-4 border-l-2 border-gray-200";

                        return (
                          <li key={subIndex}>
                            <Link href={submenu.href} className={submenuClass}>
                              {renderIcon(submenu, subActive, "sm")}
                              <span className="truncate text-sm font-medium font-['Plus_Jakarta_Sans',sans-serif]">
                                {submenu.label}
                              </span>
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Bottom Section */}
        {pathname === "/" ? (
          <nav className="px-3 md:px-4 py-4 md:py-6 flex-shrink-0 border-t border-gray-100">
            <ul className="space-y-2">
              {bottomMenuItems.map((item, index) => {
                const active = isActive(item.href);
                const linkClass = active
                  ? "flex items-center px-3 md:px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 bg-[#5F44FA] text-white shadow-sm"
                  : "flex items-center px-3 md:px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 text-gray-700 hover:bg-gray-50 hover:text-gray-900";

                return (
                  <li key={index}>
                    <Link href={item.href} className={linkClass}>
                      {renderIcon(item, active, "lg")}
                      <span className="truncate text-sm font-medium font-['Plus_Jakarta_Sans',sans-serif]">
                        {item.label}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        ) : (
          <div className="px-3 md:px-4 py-4 md:py-6 flex-shrink-0 border-t border-gray-100">
            <div className="text-center">
              <div className="text-xs md:text-sm font-semibold text-gray-900 mb-1 font-['Plus_Jakarta_Sans',sans-serif]">
                AMPLYUP.AI
              </div>
              <div className="text-[10px] md:text-xs text-gray-500 mb-1 font-['Plus_Jakarta_Sans',sans-serif]">
                © 2024. All rights reserved.
              </div>
              <div className="text-[10px] md:text-xs text-gray-500 font-['Plus_Jakarta_Sans',sans-serif]">
                Designed by <span className="text-red-500">❤</span> Designed
              </div>
            </div>
          </div>
        )}
      </aside>
    </>
  );
};

export default Sidebar;
