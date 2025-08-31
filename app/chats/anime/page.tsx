'use client';
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ChatInputDemo } from "@/components/input-field";
import { toast } from 'sonner';

import {
  ChatMessage,
  ChatMessageAvatar,
  ChatMessageContent,
} from "@/components/ui/chat-message";
import { ANIME_CHARACTERS, type AnimeCharacter } from "@/system-prompts/anime-prompts";
import { useApiKeyNotification } from "@/hooks/use-api-key-notification";


export default function ChatwithKYemon() {
  const router = useRouter();
  const [messages, setMessages] = useState<{ role: "user" | "kyemon"; text: string }[]>([]);
  const [rateLimitReached, setRateLimitReached] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState<AnimeCharacter>(ANIME_CHARACTERS[0]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { incrementMessageCount, hasApiKey } = useApiKeyNotification();

  // Auto scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Rate limit
  useEffect(() => {
    const expiry = localStorage.getItem("chat_rate_limit_expiry");
    const apiKey = localStorage.getItem('geminiApiKey');
    if (expiry && Date.now() < Number(expiry) && !apiKey) setRateLimitReached(true);
    else if (expiry) {
      setRateLimitReached(false);
      localStorage.removeItem("chat_rate_limit_expiry");
    }
  }, []);

  // Clear chat when character changes
  useEffect(() => {
    setMessages([]);
  }, [selectedCharacter.id]);

  const handleSubmit = async (prompt: string) => {
    if (!selectedCharacter) return; // ensure a character is selected

    const apiKey = localStorage.getItem('geminiApiKey');

    // API Key validation
    if (!apiKey) {
      toast.error('Please set your Google Gemini API key first.', {
        description: 'Click the "Set Key" button to configure your API key.',
        action: {
          label: 'Set Key',
          onClick: () => router.push('/setkey'),
        },
      });
      return;
    }

    // Validate API key format
    if (!/^AIza[0-9A-Za-z-_]{35}$/.test(apiKey)) {
      toast.error('Invalid API key format.', {
        description: 'Please check your Google Gemini API key.',
        action: {
          label: 'Update Key',
          onClick: () => router.push('/setkey'),
        },
      });
      return;
    }

    const userMsgCount = messages.filter((m) => m.role === "user").length;
    if (userMsgCount >= 5 && !apiKey) {
      setRateLimitReached(true);
      localStorage.setItem("chat_rate_limit_expiry", String(Date.now() + 3 * 60 * 60 * 1000));
      toast.error("Rate limit reached. You can send messages again in 3 hours.");
      return;
    }

    setMessages((m) => [...m, { role: "user", text: prompt }]);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: prompt,
          systemPrompt: selectedCharacter.systemPrompt,
          apiKey: apiKey,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        if (res.status === 401) {
          toast.error('API key authentication failed.', {
            description: 'Please check your Google Gemini API key.',
            action: {
              label: 'Update Key',
              onClick: () => router.push('/setkey'),
            },
          });
        } else if (res.status === 429) {
          toast.error('Rate limit exceeded.', {
            description: 'Please try again later.',
          });
        } else {
          toast.error('Failed to send message.', {
            description: errorData.message || 'Please try again.',
          });
        }
        // Remove the user message if API call failed
        setMessages((prev) => prev.slice(0, -1));
        return;
      }

      // Increment message count after successful API call
      incrementMessageCount();

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
                  return [...prev.slice(0, -1), { role: "kyemon", text: kymonText }];
                } else {
                  return [...prev, { role: "kyemon", text: kymonText }];
                }
              });
            }
          } catch {}
        }
      }
    } catch (error) {
      console.error('Chat submission error:', error);
      toast.error('Failed to send message.', {
        description: 'Please check your connection and try again.',
      });
      // Remove the user message if there was an error
      setMessages((prev) => prev.slice(0, -1));
    }
  };

  return (
    <div className="flex flex-col h-screen bg-stone-900 text-white">
      <header className="w-full py-4 px-4 border-b border-stone-800 bg-stone-950 flex items-center justify-between">
        <Button onClick={() => router.push('/setkey')} variant="outline">Set Key</Button>
        <h1 className="text-xl font-bold tracking-tight">Imagine if</h1>
      </header>

      {rateLimitReached && (
        <div className="mb-4 p-3 bg-red-600 text-white rounded-lg text-center">
          Rate limit reached. You can only send 5 messages per session.
        </div>
      )}

     {messages.length === 0 ? (
       <div className="flex flex-1 items-center justify-center px-4">
         <div className="w-full max-w-[600px] text-center">
           <h2 className="text-2xl font-bold text-white mb-4">Chat with your favorite anime character</h2>
           <ChatInputDemo
             onSubmit={handleSubmit}
             placeholder={`Talk with ${selectedCharacter.name}...`}
             isCentered
             selectedCharacterId={selectedCharacter.id}
             onCharacterSelect={(id) => setSelectedCharacter(ANIME_CHARACTERS.find(c => c.id === id) || ANIME_CHARACTERS[0])}
             selectType="anime"
           />
         </div>
       </div>
      ) : (
        <>
          {/* Messages area */}
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
                    <ChatMessageAvatar imageSrc={selectedCharacter.image} />
                  ) : (
                    <ChatMessageAvatar />
                  )}
                  <ChatMessageContent content={message.text} />
                </ChatMessage>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Input fixed at bottom */}
          <div className="fixed bottom-0 left-0 right-0 px-2 sm:px-4 md:px-6 bg-stone-900 pb-4 border-none shadow-none">
            <div className="mx-auto w-full md:w-[600px]">
              <ChatInputDemo
                onSubmit={handleSubmit}
                placeholder={`Talk with ${selectedCharacter.name}...`}
                selectedCharacterId={selectedCharacter.id}
                onCharacterSelect={(id) => setSelectedCharacter(ANIME_CHARACTERS.find(c => c.id === id) || ANIME_CHARACTERS[0])}
                selectType="anime"
              />
            </div>
          </div>
        </>
      )}
                        
          </div>
  );
}
