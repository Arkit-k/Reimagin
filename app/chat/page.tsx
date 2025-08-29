'use client';
import React, { useState, useEffect, useRef } from "react";
import { ChatInputDemo } from "@/components/input-field";
import {
  ChatMessage,
  ChatMessageAvatar,
  ChatMessageContent,
} from "@/components/ui/chat-message";

export default function ChatwithKYemon() {
  const [messages, setMessages] = useState<
    { role: "user" | "kyemon"; text: string }[]
  >([]);
  const [rateLimitReached, setRateLimitReached] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Check localStorage for rate limit expiry
  useEffect(() => {
    const expiry = localStorage.getItem("chat_rate_limit_expiry");
    if (expiry && Date.now() < Number(expiry)) {
      setRateLimitReached(true);
    } else if (expiry) {
      setRateLimitReached(false);
      localStorage.removeItem("chat_rate_limit_expiry");
    }
  }, []);

  const handleSubmit = async (prompt: string) => {
    const userMsgCount = messages.filter((m) => m.role === "user").length;
    if (userMsgCount >= 15) {
      setRateLimitReached(true);
      const expiry = Date.now() + 3 * 60 * 60 * 1000;
      localStorage.setItem("chat_rate_limit_expiry", String(expiry));
      if (typeof window !== "undefined") {
        import("sonner").then(({ toast }) => {
          toast("Rate limit reached. You can send messages again in 3 hours.");
        });
      }
      return;
    }

    setMessages((m) => [...m, { role: "user", text: prompt }]);

    const res = await fetch("/api/chat/keymon", {
      method: "POST",
      body: JSON.stringify({ message: prompt }),
      headers: { "Content-Type": "application/json" },
    });

    const reader = res.body?.getReader();
    if (!reader) return;

    const decoder = new TextDecoder();
    let kymonText = "";
    let buffer = "";
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split(/\r?\n/);
      buffer = lines.pop() || "";
      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed.startsWith("data:")) continue;
        const jsonStr = trimmed.replace(/^data:\s*/, "");
        if (jsonStr === "[DONE]") continue;
        try {
          const event = JSON.parse(jsonStr);
          if (event.type === "text-delta" && typeof event.delta === "string") {
            kymonText += event.delta;
            setMessages((prev) => {
              const last = prev[prev.length - 1];
              if (last?.role === "kyemon") {
                return [
                  ...prev.slice(0, -1),
                  { role: "kyemon", text: kymonText },
                ];
              } else {
                return [...prev, { role: "kyemon", text: kymonText }];
              }
            });
          }
        } catch {}
      }
    }
  };

  return (
    <div className="flex flex-col h-screen bg-stone-900 text-white">
      {/* Header */}
      <header className="w-full py-4 px-4 border-b border-stone-800 bg-stone-950 flex items-center justify-between">
        <h1 className="text-xl font-bold tracking-tight">Imagine if </h1>
      </header>

      {rateLimitReached && (
        <div className="mb-4 p-3 bg-red-600 text-white rounded-lg text-center">
          Rate limit reached. You can only send 15 messages per session.
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-2 sm:px-4 md:px-6 pt-6 pb-28">
        <div className="mx-auto w-full md:w-[600px]">
        {messages.map((message, i) => (
          <ChatMessage
            key={i}
            id={String(i)}
            type={message.role === "user" ? "outgoing" : "incoming"}
            variant="bubble"
          >
              {message.role !== "user" ? (
                <ChatMessageAvatar imageSrc="/henry.png" />
              ) : (
                <ChatMessageAvatar />
              )}
            <ChatMessageContent content={message.text} />
          </ChatMessage>
        ))}
        {/* Dummy div for auto-scroll */}
        <div ref={messagesEndRef} />
      </div>

      {/* Fixed Input */}
  <div className="fixed bottom-0 left-0 right-0 px-2 sm:px-4 md:px-6 bg-stone-900 pb-4 border-none shadow-none">
        <div className="mx-auto w-full md:w-[600px]">
          <ChatInputDemo onSubmit={handleSubmit} placeholder="Talk with Kyemon..." />
        </div>
         </div>
      </div>
    </div>
  );
}
