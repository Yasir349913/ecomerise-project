"use client";
import React from "react";
import { Package, Target, DollarSign } from "lucide-react";

const Cards = ({ searchQuery = "" }) => {
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
    },
  ];

  // 🔎 filter by type/title/subtitle (case-insensitive)
  const q = searchQuery.trim().toLowerCase();
  const filteredCards = q
    ? cardsData.filter(
        (c) =>
          c.type.toLowerCase().includes(q) ||
          c.title.toLowerCase().includes(q) ||
          c.subtitle.toLowerCase().includes(q)
      )
    : cardsData;

  const badgeConfig = {
    1: { soft: "rgba(46, 214, 163, 0.15)", width: 128 },
    2: { soft: "rgba(171, 84, 219, 0.15)", width: 87 },
    3: { soft: "rgba(88, 205, 255, 0.15)", width: 110 },
  };

  const getCardStyles = (card) => ({
    borderRadius: "24px",
    backgroundColor: card.bgColor,
    padding: "16px 20px",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    gap: "14px",
    minWidth: 0,
  });

  return (
    <section className="w-full">
      {/* Title */}
      <div className="mb-4 sm:mb-6">
        <h1
          style={{
            fontFamily: "Plus Jakarta Sans, sans-serif",
            fontSize: "28px",
            fontWeight: 700,
            lineHeight: "100%",
            color: "#464255",
            margin: "0 0 6px 0",
          }}
          className="sm:text-[32px]"
        >
          Anomaly Detector
        </h1>
        <p
          style={{
            fontFamily: "Plus Jakarta Sans, sans-serif",
            fontSize: "14px",
            fontWeight: 400,
            lineHeight: "100%",
            color: "#464255",
            margin: 0,
          }}
          className="sm:text-[16px]"
        >
          Helps you detect and fix issues in your store.
        </p>
      </div>

      {/* Search info badge (optional) */}
      {q && (
        <div className="mb-3 p-3 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-800">
          {filteredCards.length} result{filteredCards.length !== 1 ? "s" : ""}{" "}
          for “{searchQuery}”
        </div>
      )}

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCards.map((card) => {
          const IconComponent = card.icon;
          const badge = badgeConfig[card.id];
          return (
            <div key={card.id} style={getCardStyles(card)} className="h-full">
              {/* Top badge */}
              <div
                className="flex items-center"
                style={{
                  width: `min(70%, ${badge.width}px)`,
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
                  className="sm:text-[14px]"
                >
                  {card.title}
                </h3>
                <p
                  style={{
                    fontFamily: "Plus Jakarta Sans, sans-serif",
                    fontSize: "13px",
                    fontWeight: 600,
                    lineHeight: "22px",
                    color: "#A3A3A3",
                    margin: 0,
                  }}
                  className="sm:text-[14px] sm:leading-[26px]"
                >
                  {card.subtitle}
                </p>
              </div>

              {/* Images + Button */}
              <div className="flex items-center justify-between gap-3 flex-wrap">
                <div className="flex items-center gap-2">
                  {card.images.map((image, index) => (
                    <div
                      key={index}
                      className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg overflow-hidden bg-gray-200 flex-shrink-0"
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
                          e.currentTarget.style.display = "none";
                          const parent = e.currentTarget.parentNode;
                          parent.className = `w-9 h-9 sm:w-10 sm:h-10 rounded-lg ${
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
                  className="transition-all"
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
                    whiteSpace: "nowrap",
                    flexShrink: 0,
                  }}
                  onMouseOver={(e) => {
                    const h = { 1: "#0f46a6", 2: "#7c3aed", 3: "#2563eb" };
                    e.currentTarget.style.backgroundColor = h[card.id];
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = "#1457DC";
                  }}
                >
                  {card.buttonText}
                </button>
              </div>
            </div>
          );
        })}

        {/* Empty state */}
        {filteredCards.length === 0 && (
          <div className="col-span-1 md:col-span-2 lg:col-span-3">
            <div className="rounded-xl border border-gray-200 p-8 text-center text-gray-600">
              No cards match “{searchQuery}”.
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Cards;
