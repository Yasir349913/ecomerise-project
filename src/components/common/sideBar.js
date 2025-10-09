"use client";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  FileText,
  Brain,
  Menu,
  X,
  Settings,
  Star,
  ChevronDown,
  ChevronRight,
} from "lucide-react";

const SIDEBAR_STORAGE_KEY = "sidebar:lastOpenParent";
const SIDEBAR_SUPPRESS_KEY = "sidebar:suppressUntil";
const ACTIVE_PARENT_KEY = "sidebar:activeParentForPath";
const FRESH_LOAD_KEY = "sidebar:isFreshLoad";
const SUPPRESS_DURATION_MS = 1500;

const Sidebar = () => {
  const pathname = usePathname();
  const router = useRouter();

  // Mobile drawer state
  const [mobileOpen, setMobileOpen] = useState(false);
  const drawerRef = useRef(null);

  // Track which parent's submenu was last clicked for current path
  const [activeParentForPath, setActiveParentForPath] = useState(null);

  // Expandable menu state: start closed and initialise in an effect (avoids SSR window reads)
  const [expandedMenus, setExpandedMenus] = useState({
    anomalyDetector: false,
    analyticsAgent: false,
  });

  const menuStructure = [
    {
      id: "anomalyDetector",
      icon: "custom",
      iconSrc: "/images/icon1.png",
      label: "Anomaly Detector",
      href: "/anomaly-main",
      submenus: [
        { icon: FileText, label: "Main", href: "/" },
        { icon: FileText, label: "Agent Journal", href: "/agentJournal" },
      ],
    },
    {
      id: "analyticsAgent",
      icon: "custom",
      iconSrc: "/images/icon2.png",
      label: "Analytics Agent",
      href: "/analytics-main",
      submenus: [
        { icon: FileText, label: "Main", href: "/" },
        { icon: FileText, label: "Agent Journal", href: "/agentJournal" },
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
    { icon: Star, label: "Integrations", href: "/integrations" },
    { icon: Settings, label: "Settings", href: "/settings" },
  ];

  // Helper: persist which parent is open and set state so only that parent is open
  const persistAndOpenOnly = (menuKey) => {
    setExpandedMenus(() => {
      const next = { anomalyDetector: false, analyticsAgent: false };
      next[menuKey] = true;
      return next;
    });

    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(SIDEBAR_STORAGE_KEY, menuKey);
      } catch (e) {
        // ignore
      }
    }
  };

  // Helper: collapse all and remove persisted open
  const clearPersistedOpen = () => {
    setExpandedMenus({ anomalyDetector: false, analyticsAgent: false });

    if (typeof window !== "undefined") {
      try {
        localStorage.removeItem(SIDEBAR_STORAGE_KEY);
      } catch (e) {
        // ignore
      }
    }
  };

  // Helper: set session suppress so auto-expand effect skips for a short time
  const setSuppressForShortWhile = () => {
    if (typeof window === "undefined") return;
    try {
      const until = Date.now() + SUPPRESS_DURATION_MS;
      sessionStorage.setItem(SIDEBAR_SUPPRESS_KEY, String(until));
    } catch (e) {
      // ignore
    }
  };

  // read whether suppression is active
  const isSuppressed = () => {
    if (typeof window === "undefined") return false;
    try {
      const s = sessionStorage.getItem(SIDEBAR_SUPPRESS_KEY);
      if (!s) return false;
      const until = Number(s);
      return !Number.isNaN(until) && Date.now() < until;
    } catch (e) {
      return false;
    }
  };

  // Clear sessionStorage on page unload/refresh to ensure fresh load behavior
  useEffect(() => {
    const handleBeforeUnload = () => {
      if (typeof window !== "undefined") {
        try {
          sessionStorage.removeItem(ACTIVE_PARENT_KEY);
          sessionStorage.removeItem(FRESH_LOAD_KEY);
        } catch (e) {
          // ignore
        }
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, []);

  // Initialise expandedMenus and activeParentForPath
  // DEFAULT: Always open Anomaly Detector on fresh page load
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Check if this is a fresh page load (not in-app navigation)
    const isFreshLoad = !sessionStorage.getItem(FRESH_LOAD_KEY);

    if (isFreshLoad) {
      // Fresh page load - ALWAYS default to Anomaly Detector
      sessionStorage.setItem(FRESH_LOAD_KEY, "true");
      sessionStorage.removeItem(ACTIVE_PARENT_KEY);

      setExpandedMenus({ anomalyDetector: true, analyticsAgent: false });
      setActiveParentForPath("anomalyDetector");

      try {
        localStorage.setItem(SIDEBAR_STORAGE_KEY, "anomalyDetector");
        sessionStorage.setItem(ACTIVE_PARENT_KEY, "anomalyDetector");
      } catch (e) {}

      console.debug(
        "Sidebar:init -> Fresh page load, opened anomalyDetector (default)"
      );
      return;
    }

    // Not a fresh load - this is in-app navigation
    // restore last active parent for path from sessionStorage
    let storedActive = null;
    try {
      storedActive = sessionStorage.getItem(ACTIVE_PARENT_KEY);
      if (storedActive) setActiveParentForPath(storedActive);
    } catch (e) {
      // ignore
    }

    // If suppression is active, skip auto-open
    if (isSuppressed()) return;

    // PRIORITY 1: If user explicitly clicked a submenu in current session, maintain that parent open
    if (storedActive === "analyticsAgent") {
      setExpandedMenus({ anomalyDetector: false, analyticsAgent: true });
      try {
        localStorage.setItem(SIDEBAR_STORAGE_KEY, "analyticsAgent");
      } catch (e) {}
      console.debug(
        "Sidebar:init -> opened analyticsAgent from activeParentForPath (user clicked submenu)"
      );
      return;
    }

    if (storedActive === "anomalyDetector") {
      setExpandedMenus({ anomalyDetector: true, analyticsAgent: false });
      try {
        localStorage.setItem(SIDEBAR_STORAGE_KEY, "anomalyDetector");
      } catch (e) {}
      console.debug(
        "Sidebar:init -> opened anomalyDetector from activeParentForPath (user clicked submenu)"
      );
      return;
    }

    // PRIORITY 2: Check if we're explicitly on analytics main path
    if (pathname && pathname.startsWith("/analytics")) {
      setExpandedMenus({ anomalyDetector: false, analyticsAgent: true });
      try {
        localStorage.setItem(SIDEBAR_STORAGE_KEY, "analyticsAgent");
        sessionStorage.setItem(ACTIVE_PARENT_KEY, "analyticsAgent");
      } catch (e) {}
      setActiveParentForPath("analyticsAgent");
      console.debug(
        "Sidebar:init -> opened analyticsAgent based on pathname",
        pathname
      );
      return;
    }

    // PRIORITY 3: Check if we're on anomaly main path
    if (pathname && pathname.startsWith("/anomaly")) {
      setExpandedMenus({ anomalyDetector: true, analyticsAgent: false });
      try {
        localStorage.setItem(SIDEBAR_STORAGE_KEY, "anomalyDetector");
        sessionStorage.setItem(ACTIVE_PARENT_KEY, "anomalyDetector");
      } catch (e) {}
      setActiveParentForPath("anomalyDetector");
      console.debug(
        "Sidebar:init -> opened anomalyDetector based on pathname",
        pathname
      );
      return;
    }

    // DEFAULT: Always open Anomaly Detector for all other cases
    setExpandedMenus({ anomalyDetector: true, analyticsAgent: false });
    try {
      localStorage.setItem(SIDEBAR_STORAGE_KEY, "anomalyDetector");
      sessionStorage.setItem(ACTIVE_PARENT_KEY, "anomalyDetector");
    } catch (e) {}
    setActiveParentForPath("anomalyDetector");
    console.debug("Sidebar:init -> opened anomalyDetector (default behavior)");
  }, [pathname]);

  // Close drawer when route changes - only for mobile
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Close on Esc
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setMobileOpen(false);
    if (mobileOpen) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

  // toggle: open only one parent at a time (or close if clicking open parent)
  const toggleMenu = (menuKey) => {
    setExpandedMenus((prev) => {
      const isCurrentlyOpen = !!prev[menuKey];
      if (isCurrentlyOpen) {
        // close it
        return { ...prev, [menuKey]: false };
      } else {
        // open only this one
        const next = {};
        Object.keys(prev).forEach((k) => {
          next[k] = k === menuKey;
        });
        return next;
      }
    });

    // persist if opening
    try {
      if (typeof window !== "undefined") {
        localStorage.setItem(SIDEBAR_STORAGE_KEY, menuKey);
      }
    } catch (e) {}
  };

  // Handle submenu click - track which parent's submenu was clicked
  const handleSubmenuClick = (parentId) => {
    setActiveParentForPath(parentId);
    if (typeof window !== "undefined") {
      try {
        sessionStorage.setItem(ACTIVE_PARENT_KEY, parentId);
      } catch (e) {
        // ignore
      }
    }
    persistAndOpenOnly(parentId);
  };

  const isActive = (href) => pathname === href;

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
        // fallback
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

    return <span className={sizeClass} />;
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
        className={`${baseClasses} ${motionClasses}`}
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
              {pathname === "/anomaly-main" ? "ORBIEAI" : "AMPLYUP.AI"}
            </span>
          </div>
        </div>

        {/* Main Navigation */}
        <nav className="flex-1 px-3 md:px-4 py-4 min-h-0">
          <ul className="space-y-2">
            {menuStructure.map((item) => {
              const active = isActive(item.href);
              const hasSubmenus = item.submenus && item.submenus.length > 0;
              const isExpanded = !!expandedMenus[item.id];

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
                        clearPersistedOpen();
                        setSuppressForShortWhile();
                        router.push(item.href);
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
                        // Active only if: path matches AND this parent owns this path
                        const subActive =
                          pathname === submenu.href &&
                          activeParentForPath === item.id;

                        const submenuClass = subActive
                          ? "flex items-center px-3 md:px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 bg-[#5F44FA] text-white shadow-sm ml-4"
                          : "flex items-center px-6 md:px-8 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 text-gray-600 hover:bg-gray-50 hover:text-gray-900 ml-4";

                        return (
                          <li key={subIndex}>
                            <Link
                              href={submenu.href}
                              className={submenuClass}
                              onClick={() => handleSubmenuClick(item.id)}
                            >
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
        {pathname === "/anomaly-main" ? (
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
