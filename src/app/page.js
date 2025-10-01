"use client";
import React, { useState } from "react";
import Header from "@/components/common/header";
import Sidebar from "@/components/common/sideBar";
import Cards from "@/components/anomalyDetector/anomalyCards";
import Chat from "@/components/anomalyDetector/anomalyChat";

export default function Anomaly() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <>
      <style jsx global>{`
        /* hide page-level scrollbars entirely */
        .main-container::-webkit-scrollbar {
          display: none;
        }
        body,
        html {
          overflow: hidden;
        }
      `}</style>

      <div className="min-h-screen bg-white overflow-hidden">
        <Sidebar />
        <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />

        <main
          className={`
            ml-0 md:ml-[318px]
            /* header offsets (64/72/80 px); adjust if your Header differs */
            mt-[64px] md:mt-[72px] lg:mt-[80px]
            h-[calc(100vh-64px)] md:h-[calc(100vh-72px)] lg:h-[calc(100vh-80px)]
            overflow-hidden
            px-3 sm:px-4 md:px-6 lg:px-8
            py-4
            bg-white
            flex flex-col
            main-container
          `}
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {/* Cards Section - fixed shrink; let Cards manage its own internal overflow */}
          <div className="flex-shrink-0 mb-4">
            <Cards />
          </div>

          {/* Chat Section - fills remaining space; Chat has its own internal scroll */}
          <div className="flex-1 min-h-0">
            <Chat searchQuery={searchQuery} />
          </div>
        </main>
      </div>
    </>
  );
}
