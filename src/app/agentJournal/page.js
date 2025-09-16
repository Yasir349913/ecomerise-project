import React from "react";
import Header from "@/components/common/header";
import Sidebar from "@/components/common/sideBar";
import AgentJournal from "@/components/agentJournal/agentJournal";

export default function AgentJournalPage() {
  return (
    <div
      className="h-screen overflow-hidden"
      style={{ backgroundColor: "white" }}
    >
      {/* Sidebar - Fixed Left */}
      <Sidebar />

      {/* Header - Fixed Top */}
      <Header />

      {/* Main Content Area */}
      <main
        style={{
          marginLeft: "318px", // 280px (sidebar) + 14px (white space) + 24px (content start)
          marginTop: "80px",
          height: "calc(100vh - 80px)",
          overflowY: "auto",
          overflowX: "hidden",
          paddingTop: "24px",
          paddingBottom: "24px",
          paddingRight: "23px",
          backgroundColor: "white",
        }}
      >
        <AgentJournal />
      </main>
    </div>
  );
}
