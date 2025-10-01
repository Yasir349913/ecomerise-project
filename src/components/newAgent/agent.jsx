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
    },
    {
      id: 2,
      name: "Anomaly Detector",
      active: true,
    },
    { id: 3, name: "Custom agent" },
    {
      id: 4,
      name: "Friday conversation agent",
    },
    {
      id: 5,
      name: "Marketing Performance Agent",
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
      return { backgroundColor: "#5F44FA", color: "white" };
    } else {
      return { backgroundColor: "white", color: "#374151" };
    }
  };

  return (
    <div className="w-full h-full overflow-hidden px-8 sm:px-12 md:px-16 lg:px-20">
      <style jsx>{`
        .agent-content::-webkit-scrollbar {
          display: none;
        }
        .scrollable-area::-webkit-scrollbar {
          display: none;
        }
      `}</style>

      <div className="h-full flex flex-col">
        {/* Card - White background with internal scrolling */}
        <div
          className="flex-1 min-h-0 rounded-[25px] bg-white border border-gray-100 shadow-sm overflow-hidden"
          style={{
            boxShadow:
              "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
          }}
        >
          <div className="h-full flex flex-col">
            {/* Scrollable content area - ALL content inside */}
            <div
              className="flex-1 min-h-0 overflow-y-auto px-4 sm:px-6 scrollable-area agent-content"
              style={{
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
            >
              <div className="space-y-4 sm:space-y-5 py-4">
                {/* Avatar preview */}
                <div className="flex justify-center">
                  <div className="w-[70px] h-[70px] sm:w-[80px] sm:h-[80px] bg-gray-100 rounded-full flex items-center justify-center overflow-hidden">
                    {avatars[selectedAvatar] ? (
                      <img
                        src={avatars[selectedAvatar].image}
                        alt="Selected avatar"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src =
                            "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Crect width='80' height='80' fill='%23e5e7eb'/%3E%3Ctext x='40' y='46' text-anchor='middle' fill='%239ca3af' font-family='Arial' font-size='14'%3EIMG%3C/text%3E%3C/svg%3E";
                        }}
                      />
                    ) : (
                      <User className="w-[35px] h-[35px] sm:w-[40px] sm:h-[40px] text-gray-400" />
                    )}
                  </div>
                </div>

                {/* Name */}
                <div>
                  <label className="block font-['Plus_Jakarta_Sans',sans-serif] text-xs sm:text-sm font-bold leading-none text-[#464255] mb-2">
                    Agent Name
                  </label>
                  <input
                    type="text"
                    value={agentName}
                    onChange={(e) => setAgentName(e.target.value)}
                    placeholder="Agent Name"
                    className="w-full h-10 sm:h-12 rounded-full bg-gray-50 border border-gray-200 outline-none px-4 sm:px-5 box-border font-['Plus_Jakarta_Sans',sans-serif] text-xs sm:text-sm text-gray-700 focus:ring-2 focus:ring-[#5F44FA] focus:border-[#5F44FA] transition-all duration-200"
                  />
                </div>

                {/* Avatars */}
                <div>
                  <label className="block text-xs sm:text-sm font-bold text-[#464255] mb-2 sm:mb-3 font-['Plus_Jakarta_Sans',sans-serif]">
                    Agent Avatar
                  </label>
                  <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-7 gap-2">
                    {avatars.map((avatar) => (
                      <button
                        key={avatar.id}
                        onClick={() => setSelectedAvatar(avatar.id)}
                        className={`rounded-full overflow-hidden flex items-center justify-center cursor-pointer transition-all duration-200 box-border hover:scale-105
                          ${
                            selectedAvatar === avatar.id
                              ? "ring-2 ring-[#5F44FA] ring-offset-1 ring-offset-white"
                              : ""
                          }
                          ${avatar.bg}
                        `}
                        style={{ width: "40px", height: "40px" }}
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

                {/* Characters */}
                <div>
                  <label className="block text-xs sm:text-sm font-bold text-[#464255] mb-2 sm:mb-3 font-['Plus_Jakarta_Sans',sans-serif]">
                    Agent Character
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {characters.map((character) => (
                      <button
                        key={character.id}
                        onClick={() => setSelectedCharacter(character.name)}
                        style={getCharacterStyles(character)}
                        className="px-3 sm:px-4 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium border border-gray-200 cursor-pointer transition-all duration-200 font-['Plus_Jakarta_Sans',sans-serif] hover:scale-105 text-left"
                      >
                        {character.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Extra content to test scrolling */}
                <div>
                  <label className="block text-xs sm:text-sm font-bold text-[#464255] mb-2 font-['Plus_Jakarta_Sans',sans-serif]">
                    Additional Settings
                  </label>
                  <div className="space-y-2">
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-xs text-gray-600">
                        Agent will be created with default settings
                      </p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-xs text-gray-600">
                        You can modify these settings after creation
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions - Fixed at bottom */}
            <div className="flex-shrink-0 flex flex-col md:flex-row gap-2 sm:gap-3 p-4 sm:p-6 pt-3 border-t border-gray-100 px-8 sm:px-12">
              <button
                onClick={handleCreateAgent}
                disabled={!agentName.trim()}
                style={{
                  backgroundColor: !agentName.trim() ? "#9ca3af" : "#5F44FA",
                }}
                className="max-w-[200px] mx-auto md:mx-0 hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed text-white px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg shadow-sm font-medium text-xs sm:text-sm transition-all duration-200 font-['Plus_Jakarta_Sans',sans-serif] focus:ring-2 focus:ring-[#5F44FA] focus:ring-offset-1"
              >
                Create Agent
              </button>

              <button
                onClick={handleResetChanges}
                className="max-w-[200px] mx-auto md:mx-0 bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg shadow-sm font-medium text-xs sm:text-sm transition-all duration-200 font-['Plus_Jakarta_Sans',sans-serif] focus:ring-2 focus:ring-gray-300 focus:ring-offset-1"
              >
                Reset Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateNewAgent;
