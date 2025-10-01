"use client";
import React, { useState } from "react";
import { ChevronDown, X, Linkedin, Twitter } from "lucide-react";

export default function AgentJournal({ searchQuery = "" }) {
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedEntries, setSelectedEntries] = useState([]);
  const [localSearchQuery, setLocalSearchQuery] = useState("");

  const journalEntries = [
    {
      id: 1,
      time: "Thu 17/7/2025 5:24 AM",
      agent: "Sarah Mitchell",
      email: "sarah.mitchell@techworld.com",
      company: "TechWorld",
      location: "New York, United States",
      message:
        "Price mismatch detected for Product #2341 — Shopify: $45.00, Amazon: $39.00",
      status: "Solved",
      statusColor: "bg-green-100 text-green-800",
      avatar: "/images/user-avatar.png",
      interests: ["E-commerce", "AI", "Data Analytics"],
      insights: ["Price Optimization", "Market Research"],
      about:
        "Looking for automated pricing solutions and inventory management tools",
      companyInfo: {
        headcount: "500+",
        fundingStage: "Series B",
        revenue: "$50-100M",
        website: "techworld.com",
      },
      techStack: ["React", "Node.js", "MongoDB"],
    },
    {
      id: 2,
      time: "Thu 17/7/2025 5:20 AM",
      agent: "Marcus Rodriguez",
      email: "marcus.rodriguez@innovate.net",
      company: "Innovate Solutions",
      location: "San Francisco, United States",
      message:
        "Inventory sync failed for Product #1847 — Stock levels inconsistent across platforms",
      status: "Solved",
      statusColor: "bg-green-100 text-green-800",
      avatar: "/images/user-avatar.png",
      interests: ["Automation", "SaaS", "Integration"],
      insights: ["System Integration", "API Management"],
      about: "Specializing in cross-platform inventory management systems",
      companyInfo: {
        headcount: "100-250",
        fundingStage: "Series A",
        revenue: "$10-50M",
        website: "innovate.net",
      },
      techStack: ["Python", "Django", "PostgreSQL"],
    },
    {
      id: 3,
      time: "Thu 17/7/2025 5:18 AM",
      agent: "Emily Chen",
      email: "emily.chen@globaltech.co",
      company: "GlobalTech",
      location: "London, United Kingdom",
      message:
        "Product description mismatch detected for Product #3021 — Content differs between channels",
      status: "Unresolved",
      statusColor: "bg-red-100 text-red-800",
      avatar: "/images/user.jpg",
      interests: ["Content Management", "AI", "Automation"],
      insights: ["Content Optimization", "Multi-channel"],
      about: "Expert in content synchronization across multiple sales channels",
      companyInfo: {
        headcount: "1000+",
        fundingStage: "Series C",
        revenue: "$100M+",
        website: "globaltech.co",
      },
      techStack: ["Vue.js", "Laravel", "MySQL"],
    },
    {
      id: 4,
      time: "Thu 17/7/2025 5:15 AM",
      agent: "David Thompson",
      email: "david.thompson@retailplus.com",
      company: "RetailPlus",
      location: "Toronto, Canada",
      message:
        "Order processing delay detected — Multiple orders stuck in pending status",
      status: "Hold",
      statusColor: "bg-yellow-100 text-yellow-800",
      avatar: "/images/user-avatar.png",
      interests: ["Order Management", "Logistics", "Automation"],
      insights: ["Process Optimization", "Workflow"],
      about:
        "Focused on streamlining order processing and fulfillment workflows",
      companyInfo: {
        headcount: "250+",
        fundingStage: "Series A",
        revenue: "$25-75M",
        website: "retailplus.com",
      },
      techStack: ["Angular", "Spring Boot", "Oracle"],
    },
    {
      id: 5,
      time: "Thu 17/7/2025 5:12 AM",
      agent: "Lisa Wang",
      email: "lisa.wang@nextgen.co",
      company: "NextGen Commerce",
      location: "Singapore",
      message:
        "Payment gateway timeout for Product #5673 — Customer unable to complete purchase",
      status: "Unresolved",
      statusColor: "bg-red-100 text-red-800",
      avatar: "/images/user.jpg",
      interests: ["Payment Systems", "FinTech", "Security"],
      insights: ["Payment Processing", "Security"],
      about:
        "Specializing in secure payment processing and fraud prevention systems",
      companyInfo: {
        headcount: "150+",
        fundingStage: "Seed",
        revenue: "$5-15M",
        website: "nextgen.co",
      },
      techStack: ["React", "Express", "Redis"],
    },
  ];

  const handleCheckClick = (entry) => {
    setSelectedAgent(entry);
    setIsPopupOpen(true);
  };

  const handleCheckboxChange = (entryId, isChecked) => {
    if (isChecked) {
      const entry = journalEntries.find((e) => e.id === entryId);
      if (entry) {
        setSelectedAgent(entry);
        setIsPopupOpen(true);
        setSelectedEntries((prev) => [
          ...prev.filter((e) => e.id !== entryId),
          entry,
        ]);
      }
    } else {
      setSelectedEntries((prev) => prev.filter((e) => e.id !== entryId));
    }
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setSelectedAgent(null);
  };

  const currentSearchQuery = searchQuery || localSearchQuery;

  const filteredEntries = journalEntries.filter((entry) => {
    if (!currentSearchQuery.trim()) return true;
    const query = currentSearchQuery.toLowerCase();
    return (
      entry.agent.toLowerCase().includes(query) ||
      entry.company.toLowerCase().includes(query) ||
      entry.message.toLowerCase().includes(query) ||
      entry.status.toLowerCase().includes(query) ||
      entry.email.toLowerCase().includes(query) ||
      entry.location.toLowerCase().includes(query)
    );
  });

  const highlightText = (text, searchQuery) => {
    if (!searchQuery.trim()) {
      return text;
    }

    const regex = new RegExp(`(${searchQuery})`, "gi");
    const parts = text.split(regex);

    return parts.map((part, index) => {
      if (part.toLowerCase() === searchQuery.toLowerCase()) {
        return (
          <mark
            key={index}
            style={{
              backgroundColor: "#5F44FA",
              color: "white",
              padding: "2px 4px",
              borderRadius: "3px",
              fontWeight: "500",
            }}
          >
            {part}
          </mark>
        );
      }
      return part;
    });
  };

  const getTechStackIcon = (tech) => {
    const iconMap = {
      React: "⚛️",
      "Vue.js": "🟢",
      Angular: "🔺",
      "Node.js": "🟢",
      Python: "🐍",
      Django: "🎸",
      Laravel: "🔶",
      "Spring Boot": "🍃",
      Express: "🚀",
      MongoDB: "🍃",
      PostgreSQL: "🐘",
      MySQL: "🐬",
      Oracle: "🔴",
      Redis: "❤️",
    };
    return iconMap[tech] || "⚡";
  };

  return (
    <div className="w-full h-full flex flex-col px-3.5 md:pl-3.5 md:pr-6 pt-6 font-['Plus_Jakarta_Sans',sans-serif] bg-white overflow-hidden">
      {/* Header - Fixed */}
      <div className="flex-shrink-0 mb-6 md:mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-[22px] sm:text-2xl md:text-3xl lg:text-4xl font-bold leading-none text-gray-900 mb-2">
              Agent Journal
            </h1>
            <p className="text-xs sm:text-sm md:text-base leading-none text-gray-600">
              Helps you to see the last issues in your store.
            </p>
          </div>
          <div className="flex items-center gap-2 bg-white border border-gray-200 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full">
            <span className="text-xs sm:text-sm text-gray-600">Recent</span>
            <ChevronDown className="w-4 h-4 text-gray-400" />
          </div>
        </div>

        {/* Local Search Bar (mobile only when no header prop) */}
        {!searchQuery && (
          <div className="md:hidden mb-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search agents, companies, issues..."
                value={localSearchQuery}
                onChange={(e) => setLocalSearchQuery(e.target.value)}
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-full text-sm outline-none focus:ring-2 focus:border-transparent"
              />
            </div>
          </div>
        )}

        {/* Search Results Info */}
        {currentSearchQuery && (
          <div className="mb-4 p-3 bg-purple-50 rounded-lg border border-purple-200">
            <p className="text-sm" style={{ color: "#5F44FA" }}>
              {filteredEntries.length} result
              {filteredEntries.length !== 1 ? "s" : ""} found for "
              {currentSearchQuery}"
              {filteredEntries.length === 0 && (
                <span className="block mt-1" style={{ color: "#5F44FA" }}>
                  Try searching for agent names, companies, or issue
                  descriptions.
                </span>
              )}
            </p>
          </div>
        )}
      </div>

      {/* ------- Mobile: Card list - Scrollable Area ------- */}
      <div
        className="md:hidden flex-1 overflow-y-auto"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        <style jsx>{`
          .mobile-cards::-webkit-scrollbar {
            display: none;
          }
        `}</style>
        <ul className="mobile-cards space-y-3 pb-4">
          {filteredEntries.map((entry) => (
            <li
              key={`m-${entry.id}`}
              className="rounded-xl bg-white border border-gray-200 shadow-sm p-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="text-[13px] text-gray-700">{entry.time}</div>
                <span
                  className={`inline-flex px-2 py-1 text-[11px] font-semibold rounded-full ${entry.statusColor}`}
                >
                  {entry.status}
                </span>
              </div>

              <div className="flex items-center gap-2 mt-3">
                <div className="w-8 h-8 rounded-full overflow-hidden">
                  <img
                    src={entry.avatar}
                    alt={entry.agent}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-sm font-medium text-gray-900">
                  {highlightText(entry.agent, currentSearchQuery)}
                </span>
              </div>

              <p className="text-sm text-gray-900 mt-2">
                {highlightText(entry.message, currentSearchQuery)}
              </p>

              <div className="mt-3 flex justify-end">
                <button
                  onClick={() => handleCheckClick(entry)}
                  className="text-white px-4 py-2 rounded-full text-xs font-medium transition-colors duration-200"
                  style={{ backgroundColor: "#5F44FA" }}
                  onMouseOver={(e) =>
                    (e.target.style.backgroundColor = "#4C38D1")
                  }
                  onMouseOut={(e) =>
                    (e.target.style.backgroundColor = "#5F44FA")
                  }
                >
                  Check
                </button>
              </div>
            </li>
          ))}

          {filteredEntries.length === 0 && currentSearchQuery && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-2">
                <svg
                  className="w-12 h-12 mx-auto"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <p className="text-gray-500 text-sm">
                No agents found matching your search.
              </p>
            </div>
          )}
        </ul>
      </div>

      {/* ------- Desktop: Table - Scrollable Area ------- */}
      <div className="hidden md:block flex-1 rounded-xl overflow-hidden bg-white shadow-sm border border-gray-200">
        <div className="h-full flex flex-col">
          {/* Table Header - Fixed */}
          <div className="flex-shrink-0">
            <table className="w-full border-collapse min-w-[1000px]">
              <thead>
                <tr className="bg-gray-50 h-16 md:h-20 lg:h-[87px]">
                  <th className="px-4 md:px-6 text-left text-xs font-medium text-gray-600 uppercase tracking-wider w-[4%]">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300"
                      style={{ accentColor: "#5F44FA" }}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedEntries(filteredEntries);
                        } else {
                          setSelectedEntries([]);
                        }
                      }}
                      checked={
                        filteredEntries.length > 0 &&
                        selectedEntries.length === filteredEntries.length
                      }
                    />
                  </th>
                  <th className="px-4 md:px-6 text-left text-xs font-medium text-gray-600 uppercase tracking-wider w-[20%] lg:w-[18%]">
                    Time
                  </th>
                  <th className="px-4 md:px-6 text-left text-xs font-medium text-gray-600 uppercase tracking-wider w-[15%]">
                    Agent
                  </th>
                  <th className="px-4 md:px-6 text-left text-xs font-medium text-gray-600 uppercase tracking-wider w-[40%] lg:w-[42%]">
                    Message
                  </th>
                  <th className="px-4 md:px-6 text-left text-xs font-medium text-gray-600 uppercase tracking-wider w-[12%]">
                    Status
                  </th>
                  <th className="px-4 md:px-6 text-left text-xs font-medium text-gray-600 uppercase tracking-wider w-[9%]">
                    Action
                  </th>
                </tr>
              </thead>
            </table>
          </div>

          {/* Table Body - Scrollable */}
          <div
            className="flex-1 overflow-y-auto"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            <style jsx>{`
              .table-body::-webkit-scrollbar {
                display: none;
              }
            `}</style>
            <table className="w-full border-collapse min-w-[1000px] table-body">
              <tbody className="bg-white">
                {filteredEntries.map((entry, index) => (
                  <tr
                    key={entry.id}
                    className={`${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    } h-16 md:h-20 lg:h-[87px] hover:bg-purple-50 transition-colors ${
                      index < filteredEntries.length - 1
                        ? "border-b border-gray-200"
                        : ""
                    }`}
                  >
                    <td className="px-4 md:px-6 whitespace-nowrap w-[4%]">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300"
                        style={{ accentColor: "#5F44FA" }}
                        checked={selectedEntries.some((e) => e.id === entry.id)}
                        onChange={(e) =>
                          handleCheckboxChange(entry.id, e.target.checked)
                        }
                      />
                    </td>
                    <td className="px-4 md:px-6 whitespace-nowrap text-sm text-gray-900 w-[20%] lg:w-[18%]">
                      {entry.time}
                    </td>
                    <td className="px-4 md:px-6 whitespace-nowrap w-[15%]">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center overflow-hidden">
                          <img
                            src={entry.avatar}
                            alt={entry.agent}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <span className="text-sm font-medium text-gray-900">
                          {highlightText(entry.agent, currentSearchQuery)}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 md:px-6 text-sm text-gray-900 w-[40%] lg:w-[42%]">
                      <div
                        className="truncate lg:whitespace-normal"
                        title={entry.message}
                      >
                        {highlightText(entry.message, currentSearchQuery)}
                      </div>
                    </td>
                    <td className="px-4 md:px-6 whitespace-nowrap w-[12%]">
                      <span
                        className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${entry.statusColor}`}
                      >
                        {entry.status}
                      </span>
                    </td>
                    <td className="px-4 md:px-6 whitespace-nowrap text-right w-[9%]">
                      <button
                        onClick={() => handleCheckClick(entry)}
                        className="text-white px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200"
                        style={{ backgroundColor: "#5F44FA" }}
                        onMouseOver={(e) =>
                          (e.target.style.backgroundColor = "#4C38D1")
                        }
                        onMouseOut={(e) =>
                          (e.target.style.backgroundColor = "#5F44FA")
                        }
                      >
                        Check issue
                      </button>
                    </td>
                  </tr>
                ))}

                {filteredEntries.length === 0 && (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-6 py-10 text-center text-sm text-gray-500"
                    >
                      No agents found matching your search.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ------- Popup Modal ------- */}
      {isPopupOpen && selectedAgent && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50 p-4"
          style={{ backgroundColor: "rgba(255, 255, 255, 0.8)" }}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto border-2 border-gray-200"
            style={{
              marginLeft: "auto",
              marginRight: "20px",
              marginTop: "20px",
            }}
          >
            {/* Close button */}
            <div className="flex justify-end p-4 pb-0">
              <button
                onClick={closePopup}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Profile Header */}
            <div className="px-6 pb-4">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                  <img
                    src={selectedAgent.avatar}
                    alt={selectedAgent.agent}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h2 className="text-xl font-bold text-gray-900 truncate">
                      {selectedAgent.agent}
                    </h2>
                    <div className="flex gap-1">
                      <Linkedin className="w-4 h-4 text-blue-600" />
                      <Twitter className="w-4 h-4 text-blue-400" />
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">
                    CTO at {selectedAgent.company}
                  </p>
                  <p className="text-sm mb-2" style={{ color: "#5F44FA" }}>
                    {selectedAgent.email}
                  </p>
                  <p className="text-sm text-gray-500 flex items-center gap-1">
                    <span>📍</span> {selectedAgent.location}
                  </p>
                </div>
              </div>
            </div>

            {/* About Section */}
            <div className="px-6 py-4 border-t border-gray-100">
              <h3 className="font-semibold text-gray-900 mb-3">
                About {selectedAgent.agent.split(" ")[0]}
              </h3>

              <div className="space-y-3">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span
                      className="text-xs font-medium text-white px-2 py-1 rounded"
                      style={{ backgroundColor: "#5F44FA" }}
                    >
                      Interests
                    </span>
                    {selectedAgent.interests.map((interest, idx) => (
                      <span
                        key={idx}
                        className="text-xs bg-gray-100 px-2 py-1 rounded"
                      >
                        {interest}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className="text-xs font-medium text-white px-2 py-1 rounded"
                      style={{ backgroundColor: "#5F44FA" }}
                    >
                      Insights
                    </span>
                    {selectedAgent.insights.map((insight, idx) => (
                      <span
                        key={idx}
                        className="text-xs bg-gray-100 px-2 py-1 rounded"
                      >
                        {insight}
                      </span>
                    ))}
                  </div>
                </div>

                <p className="text-sm text-gray-700">{selectedAgent.about}</p>
              </div>
            </div>

            {/* Company Info */}
            <div className="px-6 py-4 border-t border-gray-100">
              <h3 className="font-semibold text-gray-900 mb-3">
                About {selectedAgent.company}
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p
                    className="text-xs font-medium"
                    style={{ color: "#5F44FA" }}
                  >
                    Headcount
                  </p>
                  <p className="text-sm font-semibold">
                    {selectedAgent.companyInfo.headcount}
                  </p>
                </div>
                <div>
                  <p
                    className="text-xs font-medium"
                    style={{ color: "#5F44FA" }}
                  >
                    Funding Stage
                  </p>
                  <p className="text-sm font-semibold">
                    {selectedAgent.companyInfo.fundingStage}
                  </p>
                </div>
                <div>
                  <p
                    className="text-xs font-medium"
                    style={{ color: "#5F44FA" }}
                  >
                    Revenue
                  </p>
                  <p className="text-sm font-semibold">
                    {selectedAgent.companyInfo.revenue}
                  </p>
                </div>
                <div>
                  <p
                    className="text-xs font-medium"
                    style={{ color: "#5F44FA" }}
                  >
                    Website
                  </p>
                  <p
                    className="text-sm font-semibold"
                    style={{ color: "#5F44FA" }}
                  >
                    {selectedAgent.companyInfo.website}
                  </p>
                </div>
              </div>
            </div>

            {/* Tech Stack */}
            <div className="px-6 py-4 border-t border-gray-100">
              <h3 className="font-semibold text-gray-900 mb-3">Tech Stack</h3>
              <div className="flex flex-wrap gap-2">
                {selectedAgent.techStack.map((tech, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-1 bg-gray-50 px-3 py-2 rounded-lg"
                  >
                    <span className="text-sm">{getTechStackIcon(tech)}</span>
                    <span className="text-sm font-medium">{tech}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Current Issue */}
            <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 rounded-b-2xl">
              <h3 className="font-semibold text-gray-900 mb-2">
                Current Issue
              </h3>
              <p className="text-sm text-gray-700 mb-3">
                {selectedAgent.message}
              </p>
              <div className="flex items-center justify-between">
                <span
                  className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${selectedAgent.statusColor}`}
                >
                  {selectedAgent.status}
                </span>
                <span className="text-xs text-gray-500">
                  {selectedAgent.time}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
