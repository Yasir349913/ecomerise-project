"use client";

import React, { useState } from "react";
import { User } from "lucide-react";

const CreateNewAgent = () => {
  const [agentName, setAgentName] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState(0);
  const [selectedCharacter, setSelectedCharacter] =
    useState("Anomaly Detector");

  const avatars = [
    { id: 0, bg: "bg-blue-500", image: "/images/user-avatar.png" },
    { id: 1, bg: "bg-blue-400", image: "/images/user.jpg" },
    { id: 2, bg: "bg-blue-600", image: "/images/user-avatar.png" },
    { id: 3, bg: "bg-gray-400", image: "/images/user.jpg" },
    { id: 4, bg: "bg-blue-500", image: "/images/user-avatar.png" },
    { id: 5, bg: "bg-gray-500", image: "/images/user.jpg" },
    { id: 6, bg: "bg-blue-600", image: "/images/user-avatar.png" },
  ];

  const characters = [
    {
      id: 1,
      name: "Customer support agent",
      color: "bg-purple-100 text-purple-700",
    },
    {
      id: 2,
      name: "Anomaly Detector",
      color: "bg-green-100 text-green-700",
      active: true,
    },
    { id: 3, name: "Custom agent", color: "bg-green-100 text-green-700" },
    {
      id: 4,
      name: "Friday conversation agent",
      color: "bg-green-100 text-green-700",
    },
    {
      id: 5,
      name: "Marketing Performance Agent",
      color: "bg-gray-100 text-gray-700",
    },
  ];

  const handleCreateAgent = () => {
    console.log("Creating agent:", {
      agentName,
      selectedAvatar,
      selectedCharacter,
    });
  };

  const handleResetChanges = () => {
    setAgentName("");
    setSelectedAvatar(0);
    setSelectedCharacter("Anomaly Detector");
  };

  const getCharacterStyles = (character) => {
    const isSelected = selectedCharacter === character.name;
    const isCustomerSupport = character.name === "Customer support agent";
    const isMarketing = character.name === "Marketing Performance Agent";

    let bgColor, textColor;
    if (isSelected) {
      bgColor = "#10b981"; // teal-500
      textColor = "white";
    } else if (isCustomerSupport) {
      bgColor = "#f3e8ff"; // purple-100
      textColor = "#7c3aed"; // purple-600
    } else if (isMarketing) {
      bgColor = "#dcfce7"; // green-100
      textColor = "#6b7280"; // gray-500/600
    } else {
      bgColor = "#dcfce7"; // green-100
      textColor = "#16a34a"; // green-600
    }
    return { backgroundColor: bgColor, color: textColor };
  };

  return (
    <div className="w-full mx-auto px-4 sm:px-6 md:px-0 max-w-[600px] md:max-w-[650px] lg:max-w-[700px]">
      {/* Header */}
      <div className="mb-8 sm:mb-10 text-left">
        <h1 className="font-['Plus_Jakarta_Sans',sans-serif] text-[28px] sm:text-[32px] md:text-[36px] lg:text-[40px] font-bold leading-none text-[#464255] mb-3 sm:mb-4">
          Create New Agent
        </h1>
        <p className="font-['Plus_Jakarta_Sans',sans-serif] text-sm sm:text-base md:text-lg leading-none text-[#464255] m-0">
          Helps you to create a new agent for your work
        </p>
      </div>

      {/* Card */}
      <div className="w-full rounded-[25px] bg-[#F7F7F7] p-6 sm:p-8 md:p-10 lg:p-12 box-border">
        {/* Avatar preview */}
        <div className="flex justify-center mb-8 sm:mb-10">
          <div className="w-[110px] h-[110px] sm:w-[120px] sm:h-[120px] md:w-[130px] md:h-[130px] lg:w-[140px] lg:h-[140px] bg-gray-100 rounded-full flex items-center justify-center overflow-hidden">
            {avatars[selectedAvatar] ? (
              <img
                src={avatars[selectedAvatar].image}
                alt="Selected avatar"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src =
                    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140' viewBox='0 0 140 140'%3E%3Crect width='140' height='140' fill='%23e5e7eb'/%3E%3Ctext x='70' y='78' text-anchor='middle' fill='%239ca3af' font-family='Arial' font-size='22'%3EIMG%3C/text%3E%3C/svg%3E";
                }}
              />
            ) : (
              <User className="w-[56px] h-[56px] sm:w-[60px] sm:h-[60px] md:w-[65px] md:h-[65px] lg:w-[70px] lg:h-[70px] text-gray-400" />
            )}
          </div>
        </div>

        {/* Name */}
        <div className="mb-6 sm:mb-8">
          <label className="block font-['Plus_Jakarta_Sans',sans-serif] text-sm sm:text-base md:text-lg font-bold leading-none text-[#464255] mb-2.5 sm:mb-3">
            Agent Name
          </label>
          <input
            type="text"
            value={agentName}
            onChange={(e) => setAgentName(e.target.value)}
            placeholder="Agent Name"
            className="w-full h-12 sm:h-14 md:h-16 rounded-full bg-white border-none outline-none px-5 sm:px-6 md:px-7 box-border font-['Plus_Jakarta_Sans',sans-serif] text-sm md:text-base text-gray-700 focus:ring-2 focus:ring-blue-500 transition-all duration-200"
          />
        </div>

        {/* Avatars (responsive grid) */}
        <div className="mb-6 sm:mb-8">
          <label className="block text-sm sm:text-base md:text-lg font-bold text-[#464255] mb-3.5 sm:mb-4 font-['Plus_Jakarta_Sans',sans-serif]">
            Agent Avatar
          </label>
          <div className="grid grid-cols-4 xs:grid-cols-5 sm:grid-cols-6 md:grid-cols-7 gap-3 sm:gap-4">
            {avatars.map((avatar) => (
              <button
                key={avatar.id}
                onClick={() => setSelectedAvatar(avatar.id)}
                className={`rounded-full overflow-hidden flex items-center justify-center cursor-pointer transition-all duration-200 box-border hover:scale-105
                  ${
                    selectedAvatar === avatar.id
                      ? "ring-2 ring-blue-500 ring-offset-2 ring-offset-[#F7F7F7]"
                      : ""
                  }
                  ${avatar.bg}
                `}
                style={{ width: "64px", height: "64px" }}
                aria-label={`Select avatar ${avatar.id}`}
              >
                <img
                  src={avatar.image}
                  alt=""
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Characters (responsive pills) */}
        <div className="mb-8 sm:mb-10">
          <label className="block text-sm sm:text-base md:text-lg font-bold text-[#464255] mb-3.5 sm:mb-4 font-['Plus_Jakarta_Sans',sans-serif]">
            Agent Character
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
            {characters.map((character) => (
              <button
                key={character.id}
                onClick={() => setSelectedCharacter(character.name)}
                style={getCharacterStyles(character)}
                className="px-4 sm:px-5 md:px-6 py-2.5 sm:py-3 md:py-4 rounded-full text-sm md:text-base font-medium border-none cursor-pointer transition-all duration-200 font-['Plus_Jakarta_Sans',sans-serif] hover:scale-105"
              >
                {character.name}
              </button>
            ))}
          </div>
        </div>

        {/* Actions — slimmer buttons */}
        <div className="flex flex-col md:flex-row gap-3 sm:gap-4">
          <button
            onClick={handleCreateAgent}
            disabled={!agentName.trim()}
            className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed
                       text-white px-4 sm:px-5 md:px-5
                       py-2.5 sm:py-3 md:py-3.5
                       rounded-lg shadow-sm
                       font-medium text-sm md:text-base
                       transition-all duration-200 font-['Plus_Jakarta_Sans',sans-serif]
                       focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
          >
            Create Agent
          </button>

          <button
            onClick={handleResetChanges}
            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700
                       px-4 sm:px-5 md:px-5
                       py-2.5 sm:py-3 md:py-3.5
                       rounded-lg shadow-sm
                       font-medium text-sm md:text-base
                       transition-all duration-200 font-['Plus_Jakarta_Sans',sans-serif]
                       focus:ring-2 focus:ring-gray-300 focus:ring-offset-1"
          >
            Reset Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateNewAgent;
