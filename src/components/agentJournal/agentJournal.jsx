import React from "react";
import { ChevronDown } from "lucide-react";

const AgentJournal = () => {
  // Sample data for the agent journal
  const journalEntries = [
    {
      id: 1,
      time: "Thu 17/7/2025 5:24 AM",
      agent: "Ammy",
      message:
        "Price mismatch detected for Product #2341 — Shopify: $45.00, Amazon: $39.00",
      status: "Solved",
      statusColor: "bg-green-100 text-green-800",
    },
    {
      id: 2,
      time: "Thu 17/7/2025 5:24 AM",
      agent: "Ammy",
      message:
        "Price mismatch detected for Product #2341 — Shopify: $45.00, Amazon: $39.00",
      status: "Solved",
      statusColor: "bg-green-100 text-green-800",
    },
    {
      id: 3,
      time: "Thu 17/7/2025 5:24 AM",
      agent: "Dejon",
      message:
        "Price mismatch detected for Product #2341 — Shopify: $45.00, Amazon: $39.00",
      status: "Unresolved",
      statusColor: "bg-red-100 text-red-800",
    },
    {
      id: 4,
      time: "Thu 17/7/2025 5:24 AM",
      agent: "Ammy",
      message:
        "Price mismatch detected for Product #2341 — Shopify: $45.00, Amazon: $39.00",
      status: "Hold",
      statusColor: "bg-blue-100 text-blue-800",
    },
    {
      id: 5,
      time: "Thu 17/7/2025 5:24 AM",
      agent: "Dejon",
      message:
        "Price mismatch detected for Product #2341 — Shopify: $45.00, Amazon: $39.00",
      status: "Unresolved",
      statusColor: "bg-red-100 text-red-800",
    },
  ];

  return (
    <div className="w-full pl-3.5 pr-6 pt-6 font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Agent Journal Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-none text-[#464255] mb-2">
              Agent Journal
            </h1>
            <p className="text-sm md:text-base leading-none text-[#464255]">
              Helps you to see the last issues in your store.
            </p>
          </div>
          <div className="flex items-center gap-2 bg-[#F7F7F7] px-4 py-2 rounded-full">
            <span className="text-sm text-gray-600">Recent</span>
            <ChevronDown className="w-4 h-4 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Journal Entries Table */}
      <div className="w-full rounded-xl overflow-hidden bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse min-w-[1000px]">
            {/* Table Header */}
            <thead>
              <tr className="bg-[#F5FCFC] h-16 md:h-20 lg:h-[87px]">
                <th className="px-4 md:px-6 text-left text-xs font-medium text-gray-600 uppercase tracking-wider w-[4%]">
                  <input type="checkbox" className="rounded border-gray-300" />
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

            {/* Table Body */}
            <tbody>
              {journalEntries.map((entry, index) => (
                <tr
                  key={entry.id}
                  className={`
                    ${index % 2 === 0 ? "bg-[#F7F7F7]" : "bg-white"}
                    h-16 md:h-20 lg:h-[87px]
                    ${
                      index < journalEntries.length - 1
                        ? "border-b border-gray-200"
                        : ""
                    }
                  `}
                >
                  <td className="px-4 md:px-6 whitespace-nowrap">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300"
                    />
                  </td>
                  <td className="px-4 md:px-6 whitespace-nowrap text-sm text-gray-900">
                    <span className="block md:hidden text-xs">
                      {entry.time.split(" ")[0]}
                    </span>
                    <span className="hidden md:block">{entry.time}</span>
                  </td>
                  <td className="px-4 md:px-6 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center overflow-hidden">
                        <img
                          src={
                            index === 0 || index === 1 || index === 3
                              ? "/images/user-avatar.png"
                              : "/images/user.jpg"
                          }
                          alt={entry.agent}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span className="text-sm font-medium text-gray-900">
                        {entry.agent}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 md:px-6 text-sm text-gray-900 max-w-[200px] md:max-w-[300px] lg:max-w-[400px]">
                    <div
                      className="truncate lg:whitespace-normal"
                      title={entry.message}
                    >
                      {entry.message}
                    </div>
                  </td>
                  <td className="px-4 md:px-6 whitespace-nowrap">
                    <span
                      className={`
                        inline-flex px-2 md:px-3 py-1 text-xs font-semibold rounded-full
                        ${entry.statusColor}
                      `}
                    >
                      {entry.status}
                    </span>
                  </td>
                  <td className="px-4 md:px-6 whitespace-nowrap text-right">
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 md:px-4 py-2 rounded-full text-xs md:text-sm font-medium transition-colors duration-200">
                      <span className="hidden sm:inline">Check issue</span>
                      <span className="sm:hidden">Check</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AgentJournal;
