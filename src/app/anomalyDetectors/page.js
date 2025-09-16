import React from "react";
import Header from "@/components/common/header";
import Sidebar from "@/components/common/sideBar";
import Cards from "@/components/anomalyDetector/anomalyCards";
import Chat from "@/components/anomalyDetector/anomalyChat";

export default function anomaly() {
  return (
    <div className="h-screen overflow-hidden bg-white-50">
      {" "}
      {/* Fixed height, no scroll */}
      {/* Sidebar - Fixed Left */}
      <Sidebar />
      {/* Main Content Area - Fixed Layout */}
      <div
        style={{
          marginLeft: "327.91px",
          height: "100vh",
          overflow: "hidden", // Prevent scrolling over sidebar
          position: "fixed",
          top: "0",
          right: "0",
          width: "calc(100vw - 327.91px)", // Exact remaining width
        }}
      >
        {/* Header - Fixed Top */}
        <div style={{ height: "80px", flexShrink: 0 }}>
          <Header />
        </div>

        {/* Scrollable Content Area */}
        <div
          style={{
            height: "calc(100vh - 80px)", // Remaining height after header
            overflowY: "auto", // Only vertical scroll within this area
            overflowX: "hidden", // No horizontal scroll
          }}
        >
          {/* Page Title Section */}
          <div
            style={{
              padding: "16px 24px",
              color: "#464255",
            }}
          >
            <h1 className="text-2xl font-bold mb-2">Anomaly Detector</h1>
            <p className="text-sm">
              Helps you detect and fix issues in your store.
            </p>
          </div>

          {/* Cards Section */}
          <div className="mb-8">
            <Cards />
          </div>

          {/* Chat Section */}
          <div className="mb-8">
            <Chat />
          </div>
        </div>
      </div>
    </div>
  );
}
