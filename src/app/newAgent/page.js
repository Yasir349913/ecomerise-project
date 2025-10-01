"use client";

import React, { useState } from "react";
import Header from "@/components/common/header";
import Sidebar from "@/components/common/sideBar";
import CreateNewAgent from "@/components/newAgent/agent";
import Chat from "@/components/anomalyDetector/anomalyChat";

export default function NewAgentPage() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <>
      <style jsx global>{`
        /* Hide all scrollbars */
        .main-container::-webkit-scrollbar {
          display: none;
        }
        .chat-section::-webkit-scrollbar {
          display: none;
        }
        .agent-section::-webkit-scrollbar {
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
          {/* Create New Agent Section - reduced height */}
          <div className="flex-shrink-0 mb-4 h-[45%] agent-section">
            <CreateNewAgent />
          </div>

          {/* Chat Section - takes remaining space */}
          <div className="flex-1 min-h-0 chat-section">
            <Chat searchQuery={searchQuery} />
          </div>
        </main>
      </div>
    </>
  );
}
