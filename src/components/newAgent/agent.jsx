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

  return (
    <div style={{ width: "100%", maxWidth: "600px", margin: "0 auto" }}>
      {/* Header Section */}
      <div style={{ marginBottom: "48px", textAlign: "left" }}>
        <h1
          style={{
            fontFamily: "Plus Jakarta Sans, sans-serif",
            fontSize: "32px",
            fontWeight: 700,
            lineHeight: "100%",
            color: "#464255",
            margin: "0 0 16px 0",
          }}
        >
          Create New Agent
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
          Helps you to create a new agent for your work
        </p>
      </div>

      {/* Main Form Container */}
      <div
        style={{
          width: "100%",
          maxWidth: "612px",
          borderRadius: "25px",
          backgroundColor: "#F7F7F7",
          padding: "40px",
          boxSizing: "border-box",
        }}
      >
        {/* Center Profile Image */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "40px",
          }}
        >
          <div
            style={{
              width: "120px",
              height: "120px",
              backgroundColor: "#f3f4f6",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
            }}
          >
            {avatars[selectedAvatar] ? (
              <img
                src={avatars[selectedAvatar].image}
                alt="Selected avatar"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            ) : (
              <User
                style={{ width: "60px", height: "60px", color: "#9ca3af" }}
              />
            )}
          </div>
        </div>

        {/* Agent Name Section */}
        <div style={{ marginBottom: "32px" }}>
          <label
            style={{
              display: "block",
              fontFamily: "Plus Jakarta Sans, sans-serif",
              fontSize: "16px",
              fontWeight: 700,
              lineHeight: "100%",
              color: "#464255",
              marginBottom: "12px",
            }}
          >
            Agent Name
          </label>
          <input
            type="text"
            value={agentName}
            onChange={(e) => setAgentName(e.target.value)}
            placeholder="Agent Name"
            style={{
              width: "100%",
              height: "56px",
              borderRadius: "100px",
              backgroundColor: "#FFFFFF",
              border: "none",
              outline: "none",
              padding: "0 24px",
              boxSizing: "border-box",
              fontFamily: "Plus Jakarta Sans, sans-serif",
              fontSize: "14px",
              color: "#374151",
            }}
          />
        </div>

        {/* Agent Avatar Section */}
        <div style={{ marginBottom: "32px" }}>
          <label
            style={{
              display: "block",
              fontSize: "16px",
              fontWeight: 700,
              color: "#464255",
              marginBottom: "16px",
              fontFamily: "Plus Jakarta Sans, sans-serif",
            }}
          >
            Agent Avatar
          </label>
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            {avatars.map((avatar) => (
              <button
                key={avatar.id}
                onClick={() => setSelectedAvatar(avatar.id)}
                style={{
                  width: "60px",
                  height: "60px",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border:
                    selectedAvatar === avatar.id ? "3px solid #3b82f6" : "none",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  boxSizing: "border-box",
                  overflow: "hidden",
                }}
                className={avatar.bg}
                aria-label={`Select avatar ${avatar.id}`}
              >
                <img
                  src={avatar.image}
                  alt=""
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Agent Character Section */}
        <div style={{ marginBottom: "40px" }}>
          <label
            style={{
              display: "block",
              fontSize: "16px",
              fontWeight: 700,
              color: "#464255",
              marginBottom: "16px",
              fontFamily: "Plus Jakarta Sans, sans-serif",
            }}
          >
            Agent Character
          </label>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "12px",
              width: "100%",
              justifyContent: "flex-start",
            }}
          >
            {characters.map((character, index) => (
              <button
                key={character.id}
                onClick={() => setSelectedCharacter(character.name)}
                style={{
                  width: index < 3 ? "auto" : "calc(50% - 6px)",
                  padding: "12px 20px",
                  borderRadius: "50px",
                  fontSize: "14px",
                  fontWeight: 500,
                  border: "none",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  fontFamily: "Plus Jakarta Sans, sans-serif",
                  backgroundColor:
                    selectedCharacter === character.name
                      ? "#10b981"
                      : character.name === "Customer support agent"
                      ? "#f3e8ff"
                      : "#dcfce7",
                  color:
                    selectedCharacter === character.name
                      ? "white"
                      : character.name === "Customer support agent"
                      ? "#7c3aed"
                      : character.name === "Marketing Performance Agent"
                      ? "#6b7280"
                      : "#16a34a",
                }}
              >
                {character.name}
              </button>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: "flex", gap: "16px" }}>
          <button
            onClick={handleCreateAgent}
            style={{
              flex: 1,
              backgroundColor: "#2563eb",
              color: "white",
              padding: "16px 24px",
              borderRadius: "12px",
              fontWeight: 600,
              fontSize: "16px",
              border: "none",
              cursor: "pointer",
              transition: "background-color 0.2s ease",
              fontFamily: "Plus Jakarta Sans, sans-serif",
            }}
          >
            Create Agent
          </button>
          <button
            onClick={handleResetChanges}
            style={{
              flex: 1,
              backgroundColor: "#f3f4f6",
              color: "#374151",
              padding: "16px 24px",
              borderRadius: "12px",
              fontWeight: 600,
              fontSize: "16px",
              border: "none",
              cursor: "pointer",
              transition: "background-color 0.2s ease",
              fontFamily: "Plus Jakarta Sans, sans-serif",
            }}
          >
            Reset Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateNewAgent;
