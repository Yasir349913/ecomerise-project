"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Send, MoreHorizontal, Search, Download } from "lucide-react";

const Chat = ({ searchQuery = "" }) => {
  const [message, setMessage] = useState("");
  const [faqs, setFaqs] = useState([]);
  const [messages, setMessages] = useState([
    {
      id: "b1",
      user: "Ava",
      avatar: "/images/user-avatar.png",
      message:
        "Great! Would you like to hear more about my capabilities or would you prefer to start the onboarding process immediately?",
      timestamp: "21 min ago",
      isBot: true,
    },
    {
      id: "b2",
      user: "Ava",
      avatar: "/images/user-avatar.png",
      message:
        "Great! Would you like to hear more about my capabilities or would you prefer to start the onboarding process immediately?",
      timestamp: "21 min ago",
      isBot: true,
    },
    {
      id: "a1",
      user: "Dev",
      avatar: "/images/user2.jpg",
      message: "Nope, I am good. Let's start with on boarding immediately!",
      timestamp: "20 min ago",
      isBot: false,
    },
  ]);

  useEffect(() => {
    fetch("/data/faq.json")
      .then((r) => r.json())
      .then((data) => setFaqs(Array.isArray(data) ? data : []))
      .catch(() => setFaqs([]));
  }, []);

  const norm = (s) =>
    String(s || "")
      .toLowerCase()
      .replace(/[^\w\s]/g, "")
      .trim();

  const faqMap = useMemo(() => {
    const map = {};
    faqs.forEach((item) => {
      map[norm(item.q)] = item.a;
    });
    return map;
  }, [faqs]);

  // Filter messages based on search query
  const filteredMessages = useMemo(() => {
    if (!searchQuery.trim()) {
      return messages;
    }

    const query = searchQuery.toLowerCase();
    return messages.filter((msg) => msg.message.toLowerCase().includes(query));
  }, [messages, searchQuery]);

  // Function to highlight search text in message
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

  const handleSendMessage = () => {
    const text = message.trim();
    if (!text) return;

    const newUserMsg = {
      id: `u-${Date.now()}`,
      user: "Dev",
      avatar: "/images/user2.jpg",
      message: text,
      timestamp: "just now",
      isBot: false,
    };

    const maybeAnswer = faqMap[norm(text)];
    const botReply = {
      id: `bot-${Date.now() + 1}`,
      user: "Ava",
      avatar: "/images/user-avatar.png",
      message:
        maybeAnswer ||
        "I didn't find an exact match for that. Try rephrasing, or ask me another question.",
      timestamp: "just now",
      isBot: true,
    };

    setMessages((prev) => [...prev, newUserMsg, botReply]);
    setMessage("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <section className="w-full h-full">
      <style jsx>{`
        .chat-messages::-webkit-scrollbar {
          display: none;
        }
        .main-container::-webkit-scrollbar {
          display: none;
        }
      `}</style>
      <div
        className="overflow-hidden h-full flex flex-col bg-white border border-gray-100 rounded-2xl"
        style={{
          boxShadow:
            "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        }}
      >
        {/* Chat Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-white rounded-t-2xl">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-white shadow-sm">
              <img
                src="/images/user-avatar.png"
                alt="Ava"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src =
                    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' fill='%235F44FA'/%3E%3Ctext x='16' y='20' text-anchor='middle' fill='white' font-family='Arial' font-size='14'%3EA%3C/text%3E%3C/svg%3E";
                }}
              />
            </div>
            <div>
              <span className="font-semibold text-gray-900">Ava</span>
              <div className="flex items-center gap-1 text-xs text-green-600">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>is typing</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button className="p-2 rounded-lg transition-colors hover:bg-gray-50">
              <Download className="w-4 h-4 text-gray-600" />
            </button>
            <button className="p-2 rounded-lg transition-colors hover:bg-gray-50">
              <Search className="w-4 h-4 text-gray-600" />
            </button>
            <button className="p-2 rounded-lg transition-colors hover:bg-gray-50">
              <MoreHorizontal className="w-4 h-4 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Search Info Badge */}
        {searchQuery.trim() && (
          <div className="mx-4 mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-800">
            {filteredMessages.length} message
            {filteredMessages.length !== 1 ? "s" : ""} found for "{searchQuery}"
          </div>
        )}

        {/* Messages Area */}
        <div
          className="flex-1 overflow-y-auto p-4 space-y-4 chat-messages"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {filteredMessages.length === 0 && searchQuery.trim() ? (
            <div className="text-center py-12 text-gray-500 text-sm">
              No messages found for "{searchQuery}"
            </div>
          ) : (
            <>
              {/* Today divider */}
              <div className="flex items-center justify-center my-6">
                <div className="flex-1 border-t border-gray-200"></div>
                <span className="px-4 text-xs text-gray-500 bg-white">
                  Today
                </span>
                <div className="flex-1 border-t border-gray-200"></div>
              </div>

              {filteredMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-3 ${msg.isBot ? "" : "justify-end"}`}
                >
                  {msg.isBot && (
                    <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-white shadow-sm flex-shrink-0">
                      <img
                        src={msg.avatar}
                        alt={msg.user}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src =
                            "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' fill='%235F44FA'/%3E%3Ctext x='16' y='20' text-anchor='middle' fill='white' font-family='Arial' font-size='14'%3EA%3C/text%3E%3C/svg%3E";
                        }}
                      />
                    </div>
                  )}

                  <div
                    className={`max-w-[80%] ${
                      msg.isBot ? "" : "flex flex-col items-end"
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      {msg.isBot && (
                        <span className="text-sm font-medium text-gray-900">
                          {msg.user}
                        </span>
                      )}
                      <span className="text-xs text-gray-500">
                        {msg.timestamp}
                      </span>
                      {!msg.isBot && (
                        <span className="text-sm font-medium text-gray-900">
                          {msg.user}
                        </span>
                      )}
                      {!msg.isBot && (
                        <div className="w-6 h-6 rounded-full overflow-hidden border-2 border-white shadow-sm">
                          <img
                            src="/images/user2.jpg"
                            alt="Dev"
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.currentTarget.src =
                                "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Crect width='24' height='24' fill='%235F44FA'/%3E%3Ctext x='12' y='15' text-anchor='middle' fill='white' font-family='Arial' font-size='10'%3ED%3C/text%3E%3C/svg%3E";
                            }}
                          />
                        </div>
                      )}
                    </div>

                    <div
                      className={`px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                        msg.isBot
                          ? "bg-gray-50 text-gray-900 border border-gray-100"
                          : "bg-gradient-to-r from-purple-500 to-blue-500 text-white"
                      }`}
                      style={
                        !msg.isBot
                          ? {
                              background:
                                "linear-gradient(135deg, #5F44FA 0%, #7C3AED 100%)",
                            }
                          : {}
                      }
                    >
                      {highlightText(msg.message, searchQuery)}
                    </div>
                  </div>
                </div>
              ))}

              {/* Suggested responses */}
              <div className="flex gap-2 mt-4">
                <span className="text-xs text-gray-500 py-2">
                  Suggested Response:
                </span>
                <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs hover:bg-gray-200 transition-colors">
                  Yes
                </button>
                <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs hover:bg-gray-200 transition-colors">
                  No
                </button>
              </div>
            </>
          )}
        </div>

        {/* Message Input */}
        <div className="p-4 border-t border-gray-100 bg-white rounded-b-2xl">
          <div className="flex items-center gap-3">
            <div className="flex-1 relative">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type here..."
                className="w-full px-4 py-3 pr-12 border border-gray-200 rounded-2xl bg-white text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              />
            </div>
            <button
              onClick={handleSendMessage}
              className="p-3 rounded-2xl text-white transition-all hover:scale-105"
              style={{
                background: "linear-gradient(135deg, #5F44FA 0%, #7C3AED 100%)",
              }}
              title="Send"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
          <p className="text-xs text-gray-400 mt-2 text-center">
            Press Shift + Enter to start a new line
          </p>
        </div>
      </div>
    </section>
  );
};

export default Chat;
