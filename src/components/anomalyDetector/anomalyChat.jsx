"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { flushSync } from "react-dom";
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

  const [isBotTyping, setIsBotTyping] = useState(false);
  const [typingUser, setTypingUser] = useState(null);

  // Refs for timers & scroll
  const botTypingTimerRef = useRef(null);
  const inputTypingTimerRef = useRef(null);
  const scrollRef = useRef(null);
  const lastMessageRef = useRef(null);

  // load FAQs
  useEffect(() => {
    fetch("/data/faq.json")
      .then((r) => r.json())
      .then((data) => setFaqs(Array.isArray(data) ? data : []))
      .catch(() => setFaqs([]));
  }, []);

  // scroll behavior
  useEffect(() => {
    const t = setTimeout(() => {
      if (lastMessageRef.current && scrollRef.current) {
        const container = scrollRef.current;
        const element = lastMessageRef.current;

        const elementRect = element.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();

        // place message at ~60% from top
        const offset =
          elementRect.top - containerRect.top - containerRect.height * 0.4;

        container.scrollBy({
          top: offset,
          behavior: "smooth",
        });
      }
    }, 150);
    return () => clearTimeout(t);
  }, [messages, isBotTyping]);

  // cleanup timers on unmount
  useEffect(() => {
    return () => {
      if (botTypingTimerRef.current) {
        clearTimeout(botTypingTimerRef.current);
        botTypingTimerRef.current = null;
      }
      if (inputTypingTimerRef.current) {
        clearTimeout(inputTypingTimerRef.current);
        inputTypingTimerRef.current = null;
      }
    };
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

  const filteredMessages = useMemo(() => {
    if (!searchQuery.trim()) return messages;
    const q = searchQuery.toLowerCase();
    return messages.filter((m) => m.message.toLowerCase().includes(q));
  }, [messages, searchQuery]);

  const highlightText = (text, searchQuery) => {
    if (!searchQuery.trim()) return text;
    const regex = new RegExp(`(${searchQuery})`, "gi");
    const parts = text.split(regex);
    return parts.map((part, i) =>
      part.toLowerCase() === searchQuery.toLowerCase() ? (
        <mark
          key={i}
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
      ) : (
        part
      )
    );
  };

  // typing duration in ms (2.5s by default, change to 2000 or 3000 if you want)
  const TYPING_DURATION_MS = 2500;

  const handleSendMessage = () => {
    const text = message.trim();
    if (!text) return;

    // Clear any pending input-typing timer so it won't later clear typingUser
    if (inputTypingTimerRef.current) {
      clearTimeout(inputTypingTimerRef.current);
      inputTypingTimerRef.current = null;
    }

    // Clear existing bot timer to avoid overlap
    if (botTypingTimerRef.current) {
      clearTimeout(botTypingTimerRef.current);
      botTypingTimerRef.current = null;
    }

    const newUserMsg = {
      id: `u-${Date.now()}`,
      user: "Dev",
      avatar: "/images/user2.jpg",
      message: text,
      timestamp: "just now",
      isBot: false,
    };

    // append user message quickly
    setMessages((prev) => [...prev, newUserMsg]);
    setMessage("");

    const maybeAnswer = faqMap[norm(text)];
    const replyText =
      maybeAnswer ||
      "I didn't find an exact match for that. Try rephrasing, or ask me another question.";

    // show bot typing (Ava) immediately
    setTypingUser("Ava");
    setIsBotTyping(true);

    // schedule reply after exactly TYPING_DURATION_MS
    botTypingTimerRef.current = setTimeout(() => {
      // flushSync so hiding typing and inserting reply happen together (no visual gap)
      flushSync(() => {
        const botReply = {
          id: `bot-${Date.now() + 1}`,
          user: "Ava",
          avatar: "/images/user-avatar.png",
          message: replyText,
          timestamp: "just now",
          isBot: true,
        };

        setMessages((prev) => [...prev, botReply]);
        // hide typing as part of same flush
        setIsBotTyping(false);
        setTypingUser(null);
      });

      botTypingTimerRef.current = null;
    }, TYPING_DURATION_MS);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleInputChange = (e) => {
    setMessage(e.target.value);

    // If user is typing, show "Dev is typing" and schedule a timer to hide it.
    // Defensive: clear old timer first.
    if (inputTypingTimerRef.current) {
      clearTimeout(inputTypingTimerRef.current);
      inputTypingTimerRef.current = null;
    }

    if (!isBotTyping && e.target.value.trim()) {
      // Only set "Dev" typing if bot is not currently typing
      setTypingUser("Dev");
      // Timer will clear the "Dev" indicator — but only if it's still "Dev"
      inputTypingTimerRef.current = setTimeout(() => {
        // defensive check: only clear if still "Dev" (don't clear "Ava")
        setTypingUser((current) => (current === "Dev" ? null : current));
        inputTypingTimerRef.current = null;
      }, 1200);
    } else if (!e.target.value.trim()) {
      // no input -> hide typing user unless bot is typing
      setTypingUser((current) => (current === "Dev" ? null : current));
      if (inputTypingTimerRef.current) {
        clearTimeout(inputTypingTimerRef.current);
        inputTypingTimerRef.current = null;
      }
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
        @keyframes bounce {
          0%,
          80%,
          100% {
            transform: translateY(0);
            opacity: 0.6;
          }
          40% {
            transform: translateY(-6px);
            opacity: 1;
          }
        }
      `}</style>

      <div
        className="overflow-hidden h-full flex flex-col bg-white border border-gray-100 rounded-2xl"
        style={{
          boxShadow:
            "0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)",
        }}
      >
        {/* Header */}
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
              {typingUser ? (
                <div className="flex items-center gap-1 text-xs text-green-600">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span>{typingUser} is typing</span>
                </div>
              ) : (
                <div className="text-xs text-gray-500">online</div>
              )}
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

        {/* Search badge */}
        {searchQuery.trim() && (
          <div className="mx-4 mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-800">
            {filteredMessages.length} message
            {filteredMessages.length !== 1 ? "s" : ""} found for "{searchQuery}"
          </div>
        )}

        {/* Messages */}
        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto p-4 space-y-4 chat-messages"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {filteredMessages.length === 0 && searchQuery.trim() ? (
            <div className="text-center py-12 text-gray-500 text-sm">
              No messages found for "{searchQuery}"
            </div>
          ) : (
            <>
              <div className="flex items-center justify-center my-6">
                <div className="flex-1 border-t border-gray-200" />
                <span className="px-4 text-xs text-gray-500 bg-white">
                  Today
                </span>
                <div className="flex-1 border-t border-gray-200" />
              </div>

              {filteredMessages.map((msg, idx) => {
                const isLast = idx === filteredMessages.length - 1;
                return (
                  <div
                    key={msg.id}
                    ref={isLast ? lastMessageRef : null}
                    className={`message-item flex gap-3 ${
                      msg.isBot ? "" : "justify-end"
                    }`}
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
                );
              })}

              {/* Typing indicator */}
              {isBotTyping && typingUser === "Ava" && (
                <div className="message-item flex gap-3" ref={lastMessageRef}>
                  <div className="px-4 py-3 rounded-2xl text-sm leading-relaxed bg-gray-50 text-gray-900 border border-gray-100">
                    <div
                      style={{
                        display: "flex",
                        gap: 6,
                        alignItems: "flex-end",
                      }}
                    >
                      <span
                        style={{
                          width: 6,
                          height: 6,
                          borderRadius: "50%",
                          backgroundColor: "#9CA3AF",
                          display: "inline-block",
                          animation: "bounce 1s infinite",
                          opacity: 0.6,
                        }}
                      />
                      <span
                        style={{
                          width: 6,
                          height: 6,
                          borderRadius: "50%",
                          backgroundColor: "#9CA3AF",
                          display: "inline-block",
                          animation: "bounce 1s .15s infinite",
                          opacity: 0.6,
                        }}
                      />
                      <span
                        style={{
                          width: 6,
                          height: 6,
                          borderRadius: "50%",
                          backgroundColor: "#9CA3AF",
                          display: "inline-block",
                          animation: "bounce 1s .3s infinite",
                          opacity: 0.6,
                        }}
                      />
                    </div>
                  </div>
                </div>
              )}

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

        {/* Input */}
        <div className="p-4 border-t border-gray-100 bg-white rounded-b-2xl">
          <div className="flex items-center gap-3">
            <div className="flex-1 relative">
              <input
                type="text"
                value={message}
                onChange={handleInputChange}
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
