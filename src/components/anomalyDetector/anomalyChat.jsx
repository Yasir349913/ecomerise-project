"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Send, MoreHorizontal, Search, Download } from "lucide-react";

const Chat = () => {
  const [message, setMessage] = useState("");
  const [faqs, setFaqs] = useState([]);
  const [messages, setMessages] = useState([
    {
      id: "b1",
      user: "Aminity",
      avatar: "/images/user-avatar.png",
      message:
        'Your ad "Spring Deals - Shoes: Clearance" is converting well but "Spring deals - Shoes: Clearance" and "Spring Deals - Shoes: Clearance" haven\'t converted in 5 days. Pause them?',
      timestamp: "just now",
      isBot: true,
    },
    {
      id: "b2",
      user: "Aminity",
      avatar: "/images/user-avatar.png",
      message:
        "Clearance & phrases, let me know if I can help with anything else.",
      timestamp: "just now",
      isBot: true,
    },
    {
      id: "a1",
      user: "You",
      avatar: "/images/user2.jpg",
      message: "You paused issues with 'Spring Deals - Shoes: Clearance'",
      timestamp: "just now",
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

  const handleSendMessage = () => {
    const text = message.trim();
    if (!text) return;

    const newUserMsg = {
      id: `u-${Date.now()}`,
      user: "You",
      avatar: "/images/user2.jpg",
      message: text,
      timestamp: "just now",
      isBot: false,
    };

    const maybeAnswer = faqMap[norm(text)];
    const botReply = {
      id: `bot-${Date.now() + 1}`,
      user: "Aminity",
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
    <section
      className="w-full"
      style={{
        // Responsive height: smaller on mobile, cap at original on desktop
        height: "clamp(380px, 65vh, 489px)",
      }}
    >
      <div
        className="overflow-hidden h-full flex flex-col"
        style={{
          borderRadius: "30px",
          border: "0.9px solid #FFFFFF",
          background: "linear-gradient(180deg, #D2DDF6 0%, #FFFFFF 100%)",
          boxShadow:
            "0 1px 0 rgba(255,255,255,0.6) inset, 0 6px 18px rgba(0,0,0,0.05)",
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-3 sm:p-4 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full overflow-hidden">
              <img
                src="/images/user-avatar.png"
                alt="Aminity"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src =
                    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' fill='%23d2ddf6'/%3E%3Ctext x='16' y='20' text-anchor='middle' fill='%23333' font-family='Arial' font-size='14'%3EA%3C/text%3E%3C/svg%3E";
                }}
              />
            </div>
            <span className="font-medium text-gray-800 text-sm sm:text-base">
              Aminity
            </span>
          </div>

          <div className="flex items-center gap-1 sm:gap-2">
            <button className="p-2 rounded-lg transition-colors hover:bg-white hover:bg-opacity-30">
              <Download className="w-4 h-4 text-gray-600" />
            </button>
            <button className="p-2 rounded-lg transition-colors hover:bg-white hover:bg-opacity-30">
              <Search className="w-4 h-4 text-gray-600" />
            </button>
            <button className="p-2 rounded-lg transition-colors hover:bg-white hover:bg-opacity-30">
              <MoreHorizontal className="w-4 h-4 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div
          className="px-3 sm:px-4 pb-4 space-y-3 sm:space-y-4 flex-1 overflow-y-auto"
          style={{
            background: "rgba(255,255,255,0.55)",
            backdropFilter: "saturate(140%)",
          }}
        >
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 ${
                msg.isBot ? "" : "justify-end text-right"
              }`}
            >
              {msg.isBot && (
                <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                  <img
                    src={msg.avatar}
                    alt={msg.user}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src =
                        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' fill='%23d2ddf6'/%3E%3Ctext x='16' y='20' text-anchor='middle' fill='%23333' font-family='Arial' font-size='14'%3EA%3C/text%3E%3C/svg%3E";
                    }}
                  />
                </div>
              )}

              <div className="flex-1 max-w-[90%] sm:max-w-[80%] md:max-w-[75%]">
                <div
                  className={`${
                    msg.isBot ? "text-left" : "text-right ml-auto"
                  }`}
                >
                  {!msg.isBot && (
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full overflow-hidden flex-shrink-0 ml-auto mb-1">
                      <img
                        src="/images/user2.jpg"
                        alt="You"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src =
                            "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' fill='%23ffffff'/%3E%3Ctext x='16' y='20' text-anchor='middle' fill='%23000' font-family='Arial' font-size='12'%3EYOU%3C/text%3E%3C/svg%3E";
                        }}
                      />
                    </div>
                  )}
                  <div
                    className={`inline-block px-3 sm:px-4 py-2 rounded-xl text-sm leading-relaxed ${
                      msg.isBot
                        ? "bg-white/70 text-gray-800"
                        : "bg-green-500 text-white"
                    }`}
                    style={
                      msg.isBot
                        ? {
                            border: "0.9px solid #FFFFFF",
                            boxShadow:
                              "0 1px 0 rgba(255,255,255,0.7) inset, 0 4px 12px rgba(0,0,0,0.04)",
                          }
                        : {}
                    }
                  >
                    {msg.message}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <div
          className="p-3 sm:p-4 flex-shrink-0 border-t"
          style={{
            backgroundColor: "transparent",
            borderColor: "rgba(255, 255, 255, 0.6)",
          }}
        >
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="flex-1 relative">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Write your message here..."
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border border-white/80 bg-white/90 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent"
              />
            </div>
            <button
              onClick={handleSendMessage}
              className="bg-blue-600 hover:bg-blue-700 text-white p-2.5 sm:p-3 rounded-lg transition-colors"
              title="Send"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Chat;
