"use client";

import React, { useState } from "react";
import Header from "@/components/common/header";
import Sidebar from "@/components/common/sideBar";
import AgentJournal from "@/components/agentJournal/agentJournal";

export default function AgentJournalPage() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <>
      <style jsx global>{`
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
          className="ml-0 md:ml-[318px] mt-[64px] md:mt-[72px] lg:mt-[80px] h-[calc(100vh-64px)] md:h-[calc(100vh-72px)] lg:h-[calc(100vh-80px)] overflow-hidden bg-white main-container"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          <AgentJournal searchQuery={searchQuery} />
        </main>
      </div>
    </>
  );
}
