'use client';
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ChatInputDemo } from "@/components/input-field";
import { toast } from 'sonner';
import Image from "next/image";
import { Star } from 'lucide-react';

import {
  ChatMessage,
  ChatMessageAvatar,
  ChatMessageContent,
} from "@/components/ui/chat-message";
import { Tweet_CHARACTERS as XOG_CHARACTERS, type TweetCharacter, X_BACKGROUNDS } from "@/system-prompts/x-prompts";
import { useApiKeyNotification } from "@/hooks/use-api-key-notification";
import { GitHubStarsButton } from "@/components/animate-ui/buttons/github-stars";


export default function ChatwithKYemon() {
  const router = useRouter();
  const [messages, setMessages] = useState<{ role: "user" | "kyemon"; text: string }[]>([]);
  const [rateLimitReached, setRateLimitReached] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState<TweetCharacter>(XOG_CHARACTERS[0]);
  const [isMobile, setIsMobile] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { incrementMessageCount, hasApiKey } = useApiKeyNotification();

  // Check for mobile
  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 1024px)');
    const checkMobile = (e: MediaQueryList | MediaQueryListEvent) => {
      setIsMobile(e.matches);
      setLoaded(true);
    };
    checkMobile(mediaQuery);
    mediaQuery.addEventListener('change', checkMobile);
    return () => mediaQuery.removeEventListener('change', checkMobile);
  }, []);

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

    const userMsgCount = messages.filter((m) => m.role === "user").length;
    if (userMsgCount >= 5 && !apiKey) {
      setRateLimitReached(true);
      localStorage.setItem("chat_rate_limit_expiry", String(Date.now() + 3 * 60 * 60 * 1000));
      toast.error("Rate limit reached. Please set your Google Gemini API key to continue.", {
        action: {
          label: 'Set Key',
          onClick: () => router.push('/setkey'),
        },
      });
      return;
    }

    setMessages((m) => [...m, { role: "user", text: prompt }]);
    setIsThinking(true);

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
            description: errorData.message || 'Please try again later or set your own API key.',
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
      let hasStartedResponding = false;
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
              if (!hasStartedResponding) {
                setIsThinking(false);
                hasStartedResponding = true;
              }
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
      setIsThinking(false);
    }
  };

  return (
    <div
      className="flex flex-col h-screen text-white relative overflow-x-hidden"
    >
      <div
        className="fixed inset-0 z-[-1]"
        style={{
          backgroundColor: messages.length > 0 ? 'rgb(28, 25, 23)' : undefined
        }}
      >
        {messages.length === 0 && loaded && (
          <video
            ref={videoRef}
            key={isMobile ? 'mobile' : 'desktop'}
            autoPlay
            loop
            playsInline
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src={isMobile ? "/backgrounds/twittermobile.mp4" : "/backgrounds/twitterbg.mp4"} type="video/mp4" />
          </video>
        )}
      </div>
      <header className="w-full py-1 md:py-2 px-2 md:px-4 border-b border-gray-700/50 bg-black/20 backdrop-blur-sm">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 md:gap-1">
            <Image
              src="/image/Logo.png"
              alt="Logo"
              width={60}
              height={60}
              className="rounded md:w-[80px] md:h-[80px]"
            />
            <div className="flex flex-col">
              <h1 className="text-lg md:text-xl font-bold tracking-tight">Reimagine</h1>
              <p className="text-xs md:text-sm text-muted-foreground">
                Chatting with {selectedCharacter.name}
              </p>
            </div>
          </Link>
          <div className="hidden md:flex items-center gap-4 absolute left-1/2 transform -translate-x-1/2">
            <Link href="/chat/anime" className="text-base font-medium text-gray-300 hover:text-white transition-colors">
              Anime
            </Link>
            <Link href="/chat/fiction" className="text-base font-medium text-gray-300 hover:text-white transition-colors">
              Fiction
            </Link>
            <span className="text-base font-medium text-white">
              Twitter
            </span>
            <Link href="/chat/eternals" className="text-base font-medium text-gray-300 hover:text-white transition-colors">
              Eternals
            </Link>
            <Link href="/chat/elite" className="text-base font-medium text-gray-300 hover:text-white transition-colors">
              Elite
            </Link>
          </div>
          <div className="flex items-center gap-4 md:gap-6">
            <div className="hidden md:block">
              <GitHubStarsButton username="Arkit-k" repo="Reimagine" showStars={false} />
            </div>
            <Link
              href={selectedCharacter.author.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              <div className="flex flex-col items-end">
                <span className="text-sm font-medium">{selectedCharacter.author.name}</span>
                <span className="text-xs text-muted-foreground">Author</span>
              </div>
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-full overflow-hidden ring-2 ring-border">
                <Image
                  src={selectedCharacter.author.image}
                  alt={selectedCharacter.author.name}
                  width={32}
                  height={32}
                  className="w-full h-full object-cover md:w-[40px] md:h-[40px]"
                />
              </div>
            </Link>
          </div>
        </div>
      </header>

      {rateLimitReached && (
        <div className="mb-4 p-3 bg-red-600 text-white rounded-lg text-center">
          Rate limit reached. You can only send 5 messages per session.
        </div>
      )}

     {messages.length === 0 ? (
       <div className="flex flex-1 items-center justify-center px-4">
         <div className="w-full max-w-[600px] text-center">
           <h2 className="text-2xl md:text-5xl font-bold text-white mb-4">Chat with your favorite Twitter personality</h2>
           <ChatInputDemo
             onSubmit={handleSubmit}
             placeholder={`Talk with ${selectedCharacter.name}...`}
             isCentered
             selectedCharacterId={selectedCharacter.id}
             onCharacterSelect={(id) => setSelectedCharacter(XOG_CHARACTERS.find(c => c.id === id) || XOG_CHARACTERS[0])}
             selectType="xog"
           />
           <div className="mt-6">
             <p className="text-white text-sm mb-4">Try asking:</p>
             <div className="flex flex-wrap justify-center gap-2">
               <button
                 onClick={() => handleSubmit("What&apos;s holycow next startup idea?")}
                 className="bg-white/10 hover:bg-white/20 text-white px-3 py-2 rounded-lg text-sm transition-colors"
               >
                 What&apos;s holycow next startup idea?
               </button>
               <button
                 onClick={() => handleSubmit("What&apos;s next banger tweet?")}
                 className="bg-white/10 hover:bg-white/20 text-white px-3 py-2 rounded-lg text-sm transition-colors"
               >
                 What&apos;s next banger tweet?
               </button>
               <button
                 onClick={() => handleSubmit("Come on, C++ still better?")}
                 className="bg-white/10 hover:bg-white/20 text-white px-3 py-2 rounded-lg text-sm transition-colors"
               >
                 Come on, C++ still better?
               </button>
             </div>
           </div>
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
                    <ChatMessageAvatar imageSrc={selectedCharacter.image} name={selectedCharacter.name} />
                  ) : (
                    <ChatMessageAvatar />
                  )}
                  <ChatMessageContent content={message.text} />
                </ChatMessage>
              ))}
              {isThinking && (
                <ChatMessage
                  key="thinking"
                  id="thinking"
                  type="incoming"
                  variant="bubble"
                >
                  <ChatMessageAvatar imageSrc={selectedCharacter.image} name={selectedCharacter.name} />
                  <ChatMessageContent content={`${selectedCharacter.name} is thinking....`} />
                </ChatMessage>
              )}
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
                onCharacterSelect={(id) => setSelectedCharacter(XOG_CHARACTERS.find(c => c.id === id) || XOG_CHARACTERS[0])}
                selectType="xog"
              />
            </div>
          </div>
        </>
      )}


          </div>
  );
}