"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  Search,
  Bell,
  Settings,
  HelpCircle,
  User,
  CheckCheck,
  Clock,
} from "lucide-react";

/* ------------ click-outside hook (JS) ------------ */
function useOnClickOutside(ref, handler) {
  useEffect(() => {
    function listener(e) {
      if (!ref.current || ref.current.contains(e.target)) return;
      handler();
    }
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
}

/* ------------ Notifications Menu (responsive) ------------ */
function NotificationsMenu() {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useOnClickOutside(ref, () => setOpen(false));

  const [items, setItems] = useState([
    {
      id: "1",
      title: "Anomaly detected",
      description: "Traffic spike on api-gateway-eu",
      time: "2m",
      href: "/alerts/1",
      read: false,
    },
    {
      id: "2",
      title: "New message",
      description: "Ops bot posted a runbook link",
      time: "12m",
      href: "/inbox",
      read: false,
    },
    {
      id: "3",
      title: "Deployment finished",
      description: "v2.4.1 to production",
      time: "1h",
      href: "/deployments/234",
      read: true,
    },
  ]);

  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") setOpen(false);
    }
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const unreadCount = items.filter((i) => !i.read).length;
  const markAllRead = () =>
    setItems((prev) => prev.map((i) => ({ ...i, read: true })));
  const markOneRead = (id) =>
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, read: true } : i))
    );

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="menu"
        aria-expanded={open}
        className="relative flex items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors w-12 h-12 md:w-14 md:h-14 lg:w-[57px] lg:h-[57px] border border-transparent bg-[#F3F2F7] rounded-full"
      >
        <Bell className="w-5 h-5 md:w-6 md:h-6 text-gray-600" />
        {unreadCount > 0 && (
          <span className="absolute -top-0.5 -right-0.5 md:-top-1 md:-right-1 min-w-5 h-5 px-1 rounded-full bg-blue-600 text-white text-[10px] md:text-[11px] flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 mt-2 w-[360px] max-w-[calc(100vw-16px)] sm:max-w-[360px] bg-white border border-gray-100 rounded-xl shadow-lg z-50 overflow-hidden"
        >
          <div className="px-4 py-3 flex items-center justify-between border-b border-gray-100">
            <p className="text-sm font-semibold text-gray-900">Notifications</p>
            <button
              className="text-xs inline-flex items-center gap-1 text-blue-600 hover:text-blue-700"
              onClick={markAllRead}
            >
              <CheckCheck className="w-4 h-4" />
              Mark all read
            </button>
          </div>

          <div className="max-h-[70vh] overflow-y-auto">
            {items.length === 0 ? (
              <div className="px-4 py-8 text-center text-sm text-gray-500">
                No notifications
              </div>
            ) : (
              <ul className="divide-y divide-gray-100">
                {items.map((n) => {
                  const Wrapper = n.href ? Link : "button";
                  const wrapperProps = n.href
                    ? { href: n.href }
                    : { type: "button", onClick: () => {} };
                  return (
                    <li key={n.id}>
                      <Wrapper
                        {...wrapperProps}
                        className={`w-full text-left block px-4 py-3 hover:bg-gray-50 transition ${
                          n.read ? "bg-white" : "bg-blue-50/40"
                        }`}
                        onClick={() => {
                          markOneRead(n.id);
                          setOpen(false);
                        }}
                      >
                        <div className="flex items-start gap-3">
                          <span
                            className={`mt-1 w-2 h-2 rounded-full ${
                              n.read ? "bg-gray-300" : "bg-blue-600"
                            }`}
                          />
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900">
                              {n.title}
                            </p>
                            {n.description && (
                              <p className="text-xs text-gray-600 mt-0.5">
                                {n.description}
                              </p>
                            )}
                            <div className="flex items-center gap-1.5 text-[11px] text-gray-500 mt-1">
                              <Clock className="w-3 h-3" />
                              <span>{n.time}</span>
                            </div>
                          </div>
                        </div>
                      </Wrapper>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

/* ------------ Profile Menu (responsive width) ------------ */
function ProfileMenu() {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useOnClickOutside(ref, () => setOpen(false));

  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") setOpen(false);
    }
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="menu"
        aria-expanded={open}
        className="overflow-hidden focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer w-10 h-10 md:w-12 md:h-12 lg:w-[52px] lg:h-[52px] rounded-full border border-transparent"
      >
        <img
          src="/images/avatar.jpg"
          alt="Profile"
          className="w-full h-full object-cover"
          onError={(e) => {
            e.currentTarget.src =
              "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='52' height='52' viewBox='0 0 52 52'%3E%3Crect width='52' height='52' fill='%23e5e7eb'/%3E%3Ctext x='26' y='30' text-anchor='middle' fill='%236b7280' font-family='Arial' font-size='16'%3EU%3C/text%3E%3C/svg%3E";
          }}
        />
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 mt-2 w-56 max-w-[calc(100vw-16px)] sm:max-w-[14rem] bg-white border border-gray-100 rounded-xl shadow-lg z-50 overflow-hidden"
        >
          <div className="px-4 py-3 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                <User className="w-4 h-4 text-gray-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Your Name</p>
                <p className="text-xs text-gray-500">you@company.com</p>
              </div>
            </div>
          </div>

          <div className="py-1">
            <Link
              href="/profile"
              role="menuitem"
              className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
              onClick={() => setOpen(false)}
            >
              <User className="w-4 h-4" />
              Profile
            </Link>
            <Link
              href="/settings"
              role="menuitem"
              className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
              onClick={() => setOpen(false)}
            >
              <Settings className="w-4 h-4" />
              Settings
            </Link>
            <Link
              href="/support"
              role="menuitem"
              className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
              onClick={() => setOpen(false)}
            >
              <HelpCircle className="w-4 h-4" />
              Support
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

/* ------------ Header (now receives props) ------------ */
export default function Header({ searchQuery, onSearchChange }) {
  return (
    <header
      className="
        bg-white px-3 sm:px-4 md:px-6 lg:px-8
        py-2.5 md:py-4
        flex items-center justify-between
        fixed top-0 z-10 h-16 md:h-18 lg:h-20
        left-0 right-0
        md:left-72 lg:left-80
      "
    >
      {/* Left spacer (only on md+) */}
      <div className="hidden md:block w-28 lg:w-32 xl:w-36" />

      {/* Search Bar */}
      <div className="flex-1 max-w-full sm:max-w-lg lg:max-w-2xl xl:max-w-3xl">
        <div className="relative flex items-center w-full max-w-full sm:max-w-[600px] lg:max-w-[714px] h-12 md:h-14 lg:h-[56px] rounded-full bg-[#F7F7F7] px-4 md:px-5 lg:px-6">
          <input
            type="text"
            placeholder="Search here"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="flex-1 bg-transparent border-none outline-none text-gray-700 placeholder-gray-500 text-sm md:text-base p-0"
          />
          <Search className="text-gray-400 w-4 h-4 md:w-5 md:h-5 flex-shrink-0" />
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-4 ml-3 sm:ml-4 md:ml-6 lg:ml-8">
        <NotificationsMenu />
        <ProfileMenu />
      </div>
    </header>
  );
}
