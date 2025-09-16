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

  // Function to get row background color based on index
  const getRowBackgroundColor = (index) => {
    // For rows 1, 3, 5 (odd rows) - index 0, 2, 4
    return index % 2 === 0 ? "#F7F7F7" : "white";
  };

  return (
    <div
      style={{
        width: "100%",
        paddingLeft: "14px", // Space from sidebar
        paddingRight: "23px", // Right padding
        paddingTop: "24px", // Top spacing (reduced from 144px)
      }}
    >
      {/* Agent Journal Header */}
      <div style={{ marginBottom: "32px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div>
            <h1
              style={{
                fontFamily: "Plus Jakarta Sans, sans-serif",
                fontSize: "32px",
                fontWeight: 700,
                lineHeight: "100%",
                color: "#464255",
                margin: "0 0 8px 0",
              }}
            >
              Agent Journal
            </h1>
            <p
              style={{
                fontFamily: "Plus Jakarta Sans, sans-serif",
                fontSize: "16px",
                fontWeight: 400,
                lineHeight: "100%",
                color: "#464255",
                margin: 0,
              }}
            >
              Helps you to see the last issues in your store.
            </p>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              backgroundColor: "#F7F7F7",
              padding: "8px 16px",
              borderRadius: "100px",
            }}
          >
            <span style={{ fontSize: "14px", color: "#6b7280" }}>Recent</span>
            <ChevronDown
              style={{ width: "16px", height: "16px", color: "#9ca3af" }}
            />
          </div>
        </div>
      </div>

      {/* Journal Entries Table */}
      <div
        style={{
          width: "100%",
          borderRadius: "12px",
          overflow: "hidden",
          backgroundColor: "white",
          boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
        }}
      >
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          {/* Table Header */}
          <thead>
            <tr style={{ backgroundColor: "#F5FCFC", height: "87px" }}>
              <th
                style={{
                  padding: "24px",
                  textAlign: "left",
                  fontSize: "12px",
                  fontWeight: 500,
                  color: "#6b7280",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  width: "4%",
                }}
              >
                <input
                  type="checkbox"
                  style={{ borderRadius: "4px", borderColor: "#d1d5db" }}
                />
              </th>
              <th
                style={{
                  padding: "24px",
                  textAlign: "left",
                  fontSize: "12px",
                  fontWeight: 500,
                  color: "#6b7280",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  width: "20%",
                }}
              >
                Time
              </th>
              <th
                style={{
                  padding: "24px",
                  textAlign: "left",
                  fontSize: "12px",
                  fontWeight: 500,
                  color: "#6b7280",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  width: "15%",
                }}
              >
                Agent
              </th>
              <th
                style={{
                  padding: "24px",
                  textAlign: "left",
                  fontSize: "12px",
                  fontWeight: 500,
                  color: "#6b7280",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  width: "40%",
                }}
              >
                Message
              </th>
              <th
                style={{
                  padding: "24px",
                  textAlign: "left",
                  fontSize: "12px",
                  fontWeight: 500,
                  color: "#6b7280",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  width: "12%",
                }}
              >
                Status
              </th>
              <th
                style={{
                  padding: "24px",
                  textAlign: "left",
                  fontSize: "12px",
                  fontWeight: 500,
                  color: "#6b7280",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  width: "9%",
                }}
              >
                Action
              </th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {journalEntries.map((entry, index) => (
              <tr
                key={entry.id}
                style={{
                  backgroundColor: getRowBackgroundColor(index),
                  height: "87px",
                  borderBottom:
                    index < journalEntries.length - 1
                      ? "1px solid #e5e7eb"
                      : "none",
                }}
              >
                <td style={{ padding: "24px", whiteSpace: "nowrap" }}>
                  <input
                    type="checkbox"
                    style={{ borderRadius: "4px", borderColor: "#d1d5db" }}
                  />
                </td>
                <td
                  style={{
                    padding: "24px",
                    whiteSpace: "nowrap",
                    fontSize: "14px",
                    color: "#111827",
                    fontFamily: "Plus Jakarta Sans, sans-serif",
                  }}
                >
                  {entry.time}
                </td>
                <td style={{ padding: "24px", whiteSpace: "nowrap" }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <div
                      style={{
                        width: "32px",
                        height: "32px",
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        overflow: "hidden",
                      }}
                    >
                      <img
                        src={
                          index === 0 || index === 1 || index === 3
                            ? "/images/user-avatar.png"
                            : "/images/user.jpg"
                        }
                        alt={entry.agent}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    </div>
                    <span
                      style={{
                        fontSize: "14px",
                        fontWeight: 500,
                        color: "#111827",
                        fontFamily: "Plus Jakarta Sans, sans-serif",
                      }}
                    >
                      {entry.agent}
                    </span>
                  </div>
                </td>
                <td
                  style={{
                    padding: "24px",
                    fontSize: "14px",
                    color: "#111827",
                    maxWidth: "400px",
                    fontFamily: "Plus Jakarta Sans, sans-serif",
                  }}
                >
                  {entry.message}
                </td>
                <td style={{ padding: "24px", whiteSpace: "nowrap" }}>
                  <span
                    style={{
                      display: "inline-flex",
                      padding: "4px 12px",
                      fontSize: "12px",
                      fontWeight: 600,
                      borderRadius: "9999px",
                      fontFamily: "Plus Jakarta Sans, sans-serif",
                    }}
                    className={entry.statusColor}
                  >
                    {entry.status}
                  </span>
                </td>
                <td
                  style={{
                    padding: "24px",
                    whiteSpace: "nowrap",
                    textAlign: "right",
                  }}
                >
                  <button
                    style={{
                      backgroundColor: "#2563eb",
                      color: "white",
                      padding: "8px 16px",
                      borderRadius: "100px",
                      fontSize: "14px",
                      fontWeight: 500,
                      border: "none",
                      cursor: "pointer",
                      fontFamily: "Plus Jakarta Sans, sans-serif",
                    }}
                    className="hover:bg-blue-700 transition-colors duration-200"
                  >
                    Check issue
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AgentJournal;
