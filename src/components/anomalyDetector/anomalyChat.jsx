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

    if (isSelected) {
      return {
        backgroundColor: "#10b981", // Dark green for selected
        color: "white",
      };
    }

    // Specific colors for each button based on your image
    switch (character.name) {
      case "Customer support agent":
        return {
          backgroundColor: "#f3e8ff", // Light purple
          color: "#8b5cf6", // Purple text
        };
      case "Custom agent":
        return {
          backgroundColor: "#dcfce7", // Very light green
          color: "#16a34a", // Green text
        };
      case "Friday conversation agent":
        return {
          backgroundColor: "#dcfce7", // Light green
          color: "#16a34a", // Green text
        };
      case "Marketing Performance Agent":
        return {
          backgroundColor: "#f3f4f6", // Light gray
          color: "#6b7280", // Gray text
        };
      default:
        return {
          backgroundColor: "#dcfce7",
          color: "#16a34a",
        };
    }
  };

  return (
    <div className="w-full max-w-[600px] md:max-w-[650px] lg:max-w-[700px] mx-auto px-4 md:px-0">
      {/* Header Section */}
      <div className="mb-12 text-left">
        <h1 className="font-['Plus_Jakarta_Sans',sans-serif] text-[32px] md:text-[36px] lg:text-[40px] font-bold leading-none text-[#464255] mb-4">
          Create New Agent
        </h1>
        <p className="font-['Plus_Jakarta_Sans',sans-serif] text-base md:text-lg leading-none text-[#464255] m-0">
          Helps you to create a new agent for your work
        </p>
      </div>

      {/* Main Form Container */}
      <div className="w-full max-w-[612px] md:max-w-[650px] lg:max-w-[700px] rounded-[25px] bg-[#F7F7F7] p-8 md:p-10 lg:p-12 box-border">
        {/* Center Profile Image */}
        <div className="flex justify-center mb-10">
          <div className="w-[120px] h-[120px] md:w-[130px] md:h-[130px] lg:w-[140px] lg:h-[140px] bg-gray-100 rounded-full flex items-center justify-center overflow-hidden">
            {avatars[selectedAvatar] ? (
              <img
                src={avatars[selectedAvatar].image}
                alt="Selected avatar"
                className="w-full h-full object-cover"
              />
            ) : (
              <User className="w-[60px] h-[60px] md:w-[65px] md:h-[65px] lg:w-[70px] lg:h-[70px] text-gray-400" />
            )}
          </div>
        </div>

        {/* Agent Name Section */}
        <div className="mb-8">
          <label className="block font-['Plus_Jakarta_Sans',sans-serif] text-base md:text-lg font-bold leading-none text-[#464255] mb-3">
            Agent Name
          </label>
          <input
            type="text"
            value={agentName}
            onChange={(e) => setAgentName(e.target.value)}
            placeholder="Agent Name"
            className="w-full h-14 md:h-16 rounded-full bg-white border-none outline-none px-6 md:px-7 box-border font-['Plus_Jakarta_Sans',sans-serif] text-sm md:text-base text-black focus:ring-2 focus:ring-blue-500 transition-all duration-200"
          />
        </div>

        {/* Agent Avatar Section */}
        <div className="mb-8">
          <label className="block text-base md:text-lg font-bold text-[#464255] mb-4 font-['Plus_Jakarta_Sans',sans-serif]">
            Agent Avatar
          </label>
          <div className="flex gap-3 md:gap-4 flex-wrap">
            {avatars.map((avatar) => (
              <button
                key={avatar.id}
                onClick={() => setSelectedAvatar(avatar.id)}
                className={`
                  w-[60px] h-[60px] md:w-[65px] md:h-[65px] lg:w-[70px] lg:h-[70px] 
                  rounded-full flex items-center justify-center cursor-pointer 
                  transition-all duration-200 box-border overflow-hidden hover:scale-105
                  ${
                    selectedAvatar === avatar.id
                      ? "border-[3px] border-blue-500"
                      : "border-none"
                  }
                  ${avatar.bg}
                `}
                aria-label={`Select avatar ${avatar.id}`}
              >
                <img
                  src={avatar.image}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Agent Character Section */}
        <div className="mb-10">
          <label className="block text-base md:text-lg font-bold text-[#464255] mb-4 font-['Plus_Jakarta_Sans',sans-serif]">
            Agent Character
          </label>
          {/* First row - 3 buttons */}
          <div className="flex gap-3 md:gap-4 mb-3 md:mb-4 flex-wrap">
            {characters.slice(0, 3).map((character) => (
              <button
                key={character.id}
                onClick={() => setSelectedCharacter(character.name)}
                style={getCharacterStyles(character)}
                className="px-5 md:px-6 py-3 md:py-4 rounded-full text-sm md:text-base font-medium border-none cursor-pointer transition-all duration-200 font-['Plus_Jakarta_Sans',sans-serif] hover:scale-105 flex-shrink-0"
              >
                {character.name}
              </button>
            ))}
          </div>
          {/* Second row - 2 buttons */}
          <div className="grid grid-cols-2 gap-3 md:gap-4">
            {characters.slice(3).map((character) => (
              <button
                key={character.id}
                onClick={() => setSelectedCharacter(character.name)}
                style={getCharacterStyles(character)}
                className="px-5 md:px-6 py-3 md:py-4 rounded-full text-sm md:text-base font-medium border-none cursor-pointer transition-all duration-200 font-['Plus_Jakarta_Sans',sans-serif] hover:scale-105 text-center"
              >
                {character.name}
              </button>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col md:flex-row gap-4">
          <button
            onClick={handleCreateAgent}
            className="flex-1 bg-[#2563eb] hover:bg-[#1d4ed8] text-white px-6 py-4 rounded-2xl font-semibold text-base border-none cursor-pointer transition-all duration-200 font-['Plus_Jakarta_Sans',sans-serif] focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Create Agent
          </button>
          <button
            onClick={handleResetChanges}
            className="flex-1 bg-[#f8fafc] hover:bg-[#f1f5f9] text-[#64748b] px-6 py-4 rounded-2xl font-semibold text-base border border-[#e2e8f0] cursor-pointer transition-all duration-200 font-['Plus_Jakarta_Sans',sans-serif] focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
          >
            Reset Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateNewAgent;
