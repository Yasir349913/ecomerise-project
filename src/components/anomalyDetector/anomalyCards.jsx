"use client";
import React from "react";
import {
  TrendingUp,
  TrendingDown,
  BarChart3,
  Target,
  AlertTriangle,
} from "lucide-react";

const Cards = () => {
  const cardsData = [
    {
      id: 1,
      title: "Blended ROAS",
      value: "5.3x",
      change: "+44%",
      changeType: "positive",
      subtitle: "vs. last quarter",
      icon: TrendingUp,
      chartData: [40, 45, 35, 50, 55, 60, 65, 70, 75, 80, 85, 90],
      chartColor: "#5F44FA",
    },
    {
      id: 2,
      title: "Blended CPA",
      value: "$27.50",
      change: "-31%",
      changeType: "positive",
      subtitle: "per customer acquisition",
      icon: Target,
      chartData: [60, 55, 65, 50, 45, 40, 35, 30, 25, 20, 15, 10],
      chartColor: "#5F44FA",
    },
    {
      id: 3,
      title: "LTV",
      value: "$187.35",
      change: "+28%",
      changeType: "positive",
      subtitle: "lifetime value",
      icon: BarChart3,
      chartData: [30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85],
      chartColor: "#5F44FA",
    },
  ];

  // Mini chart component
  const MiniChart = ({ data, color }) => {
    const max = Math.max(...data);
    const min = Math.min(...data);

    return (
      <div className="flex items-end space-x-1 h-12 w-20">
        {data.map((value, index) => {
          const height = ((value - min) / (max - min)) * 100;
          return (
            <div
              key={index}
              className="flex-1 rounded-t"
              style={{
                height: `${Math.max(height, 10)}%`,
                backgroundColor: color,
                opacity: index < data.length - 4 ? 0.4 : 1,
              }}
            />
          );
        })}
      </div>
    );
  };

  return (
    <section className="w-full">
      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cardsData.map((card) => {
          const IconComponent = card.icon;
          return (
            <div
              key={card.id}
              className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-lg transition-all duration-300 hover:border-gray-200"
            >
              {/* Card Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-sm font-medium text-gray-600">
                      {card.title}
                    </span>
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        card.changeType === "positive"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {card.change}
                    </span>
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-1">
                    {card.value}
                  </div>
                  <p className="text-sm text-gray-500">{card.subtitle}</p>
                </div>
              </div>

              {/* Mini Chart */}
              <div className="flex items-center justify-between">
                <MiniChart data={card.chartData} color={card.chartColor} />

                {/* Icon and additional info */}
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-1 text-xs text-gray-500">
                    <IconComponent className="w-4 h-4" />
                    {card.id === 1 && <span>Best Performing Ads</span>}
                    {card.id === 2 && <span>Best Performing Channels</span>}
                    {card.id === 3 && <span>Ad Waste Ranked by Source</span>}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Cards;
