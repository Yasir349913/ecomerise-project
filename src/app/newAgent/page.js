import React from "react";
import Header from "@/components/common/header";
import Sidebar from "@/components/common/sideBar";
import CreateNewAgent from "@/components/newAgent/agent";
import Chat from "@/components/anomalyDetector/anomalyChat";

export default function NewAgentPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Fixed Sidebar / Header */}
      <Sidebar />
      <Header />

      {/* Main Area — no left offset on mobile; from md+ it clears the sidebar. */}
      <main
        className="
          ml-0 md:ml-[318px]
          mt-20
          h-[calc(100vh-80px)]
          overflow-y-auto overflow-x-hidden
          px-3 sm:px-4 md:px-6 lg:px-8
          pt-6 pb-6
          bg-white box-border
        "
      >
        <CreateNewAgent />

        {/* Chat section below (scrolls with page) */}
        <div className="mt-8">
          <Chat />
        </div>
      </main>
    </div>
  );
}
