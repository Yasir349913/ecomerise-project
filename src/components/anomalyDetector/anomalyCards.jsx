"use client";
import React from "react";
import { Package, Target, DollarSign } from "lucide-react";

const Cards = () => {
  const cardsData = [
    {
      id: 1,
      type: "Inventory",
      icon: Package,
      bgColor: "#EBFFF9",
      textColor: "text-green-800",
      iconColor: "text-green-600",
      title: "3 products will be out of stock in 2 days",
      subtitle: "42 more days",
      buttonText: "Update Products",
      images: ["/images/imgs1.jpg", "/images/imgs2.jpg", "/images/imgs3.jpg"],
      height: "204px",
    },
    {
      id: 2,
      type: "Ads",
      icon: Target,
      bgColor: "#F8EAFF",
      textColor: "text-purple-800",
      iconColor: "text-purple-600",
      title: "2 underperforming ads detected in the last 7 days",
      subtitle: "15 mins ago",
      buttonText: "Check Ads",
      images: ["/images/imgs4.jpg", "/images/imgs5.jpg"],
      height: "203px",
    },
    {
      id: 3,
      type: "Pricing",
      icon: DollarSign,
      bgColor: "#E0F6FF",
      textColor: "text-blue-800",
      iconColor: "text-blue-600",
      title: "4 listings with mismatched prices across channels",
      subtitle: "1 hour ago",
      buttonText: "Check Products",
      images: ["/images/imgs6.jpg", "/images/imgs7.jpg", "/images/imgs8.png"],
      height: "203px",
    },
  ];

  // Badge widths + 15% tinted background colors
  const badgeConfig = {
    1: { soft: "rgba(46, 214, 163, 0.15)", width: 128 },
    2: { soft: "rgba(171, 84, 219, 0.15)", width: 87 },
    3: { soft: "rgba(88, 205, 255, 0.15)", width: 110 },
  };

  const getCardStyles = (card) => {
    const baseStyles = {
      height: card.height,
      borderRadius: "24px",
      backgroundColor: card.bgColor,
      padding: "16px 26px",
      position: "relative",
      display: "flex",
      flexDirection: "column",
      gap: "14px",
      flex: "1", // Equal flex grow
      minWidth: "280px", // Minimum width to maintain readability
      maxWidth: "none", // Remove max-width constraint
    };
    if (card.id === 2) baseStyles.justifyContent = "space-between";
    return baseStyles;
  };

  return (
    <div
      style={{
        width: "100%",
        paddingLeft: "0", // ✅ Removed - main layout handles this
        paddingRight: "0", // ✅ Removed - main layout handles this
        position: "relative",
      }}
    >
      <div style={{ marginBottom: "24px" }}>
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
          Anomaly Detector
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
          Helps you detect and fix issues in your store.
        </p>
      </div>

      {/* Cards container with proper spacing */}
      <div
        className="flex gap-4"
        style={{
          width: "100%",
          justifyContent: "space-between", // Equal distribution
        }}
      >
        {cardsData.map((card) => {
          const IconComponent = card.icon;
          const badge = badgeConfig[card.id];

          return (
            <div key={card.id} style={getCardStyles(card)}>
              {/* Top badge */}
              <div
                className="flex items-center"
                style={{
                  width: `${badge.width}px`,
                  height: "34px",
                  borderRadius: "14px",
                  backgroundColor: badge.soft,
                  padding: "8px 26px 8px 16px",
                  gap: "14px",
                }}
              >
                <IconComponent
                  className={`w-4 h-4 ${card.iconColor} flex-shrink-0`}
                />
                <span
                  className={`text-xs font-medium ${card.textColor} whitespace-nowrap`}
                >
                  {card.type}
                </span>
              </div>

              {/* Title + subtitle */}
              <div
                className={card.id === 2 ? "flex-1" : ""}
                style={{
                  width: "100%",
                  minHeight: "48px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "4px",
                }}
              >
                <h3
                  style={{
                    fontFamily: "Plus Jakarta Sans, sans-serif",
                    fontSize: "14px",
                    fontWeight: 700,
                    lineHeight: "120%",
                    color: "#464255",
                    margin: 0,
                  }}
                >
                  {card.title}
                </h3>
                <p
                  style={{
                    fontFamily: "Plus Jakarta Sans, sans-serif",
                    fontSize: "14px",
                    fontWeight: 600,
                    lineHeight: "26px",
                    color: "#A3A3A3",
                    margin: 0,
                  }}
                >
                  {card.subtitle}
                </p>
              </div>

              {/* Images + Button */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {card.images.map((image, index) => (
                    <div
                      key={index}
                      className="w-10 h-10 rounded-lg overflow-hidden bg-gray-200 flex-shrink-0"
                    >
                      <img
                        src={image}
                        alt={`${card.type} ${index + 1}`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const fallback = [
                            "bg-gray-300",
                            "bg-gray-400",
                            "bg-gray-500",
                          ];
                          e.target.style.display = "none";
                          const parent = e.target.parentNode;
                          parent.className = `w-10 h-10 rounded-lg ${
                            fallback[index % fallback.length]
                          } flex items-center justify-center`;
                          parent.innerHTML =
                            '<div class="w-6 h-6 bg-white rounded opacity-50"></div>';
                        }}
                      />
                    </div>
                  ))}
                </div>

                <button
                  style={{
                    minWidth: "120px",
                    height: "37px",
                    borderRadius: "83px",
                    backgroundColor: "#1457DC",
                    color: "white",
                    padding: "8px 16px",
                    border: "none",
                    fontSize: "13px",
                    fontWeight: 500,
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    whiteSpace: "nowrap",
                    flexShrink: 0,
                  }}
                  onMouseOver={(e) => {
                    const hoverColors = {
                      1: "#0f46a6",
                      2: "#7c3aed",
                      3: "#2563eb",
                    };
                    e.target.style.backgroundColor = hoverColors[card.id];
                  }}
                  onMouseOut={(e) => {
                    e.target.style.backgroundColor = "#1457DC";
                  }}
                >
                  {card.buttonText}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Cards;
