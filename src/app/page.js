import React from "react";
import Header from "@/components/common/header";
import Sidebar from "@/components/common/sideBar";
import Cards from "@/components/anomalyDetector/anomalyCards";
import Chat from "@/components/anomalyDetector/anomalyChat";

export default function Anomaly() {
  return (
    <div
      className="h-screen overflow-hidden"
      style={{ backgroundColor: "white" }} // Light background to see the white space
    >
      {/* Sidebar - Fixed Left */}
      <Sidebar />

      {/* Header - Fixed Top */}
      <Header />

      {/* Main Content Area with correct spacing */}
      <main
        style={{
          marginLeft: "318px", // 24px (left) + 280px (sidebar) + 14px (white space)
          marginTop: "80px",
          height: "calc(100vh - 80px)",
          overflowY: "auto",
          overflowX: "hidden",
          paddingLeft: "0",
          paddingRight: "23px",
          paddingTop: "24px",
          paddingBottom: "24px",
          backgroundColor: "white",
          boxSizing: "border-box",
        }}
      >
        {/* Cards Section */}
        <div className="mb-8">
          <Cards />
        </div>

        {/* Chat Section */}
        <div className="mb-8">
          <Chat />
        </div>
      </main>
    </div>
  );
}
