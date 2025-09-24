"use client";

import React, { useState } from "react";
import Header from "@/components/common/header";
import Sidebar from "@/components/common/sideBar";
import Cards from "@/components/anomalyDetector/anomalyCards";
import Chat from "@/components/anomalyDetector/anomalyChat";

export default function Anomaly() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-white">
      <Sidebar />
      <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />

      <main
        className="
          ml-0 md:ml-[318px]
          mt-20
          h-[calc(100vh-80px)]
          overflow-y-auto overflow-x-hidden
          px-3 sm:px-4 md:px-6 lg:px-8
          pb-6 pt-6
          bg-white box-border
        "
      >
        {/* Cards now filter by the header search */}
        <div className="mb-6 sm:mb-8">
          <Cards searchQuery={searchQuery} />
        </div>

        <div className="mb-6 sm:mb-8">
          <Chat />
        </div>
      </main>
    </div>
  );
}
