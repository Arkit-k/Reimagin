"use client";

import {
  ChatInput,
  ChatInputSubmit,
  ChatInputTextArea,
} from "@/components/ui/chat-input";
import { useState } from "react";
import { toast } from "sonner";

type ChatInputDemoProps = {
  onSubmit: (prompt: string) => void | Promise<void>;
  placeholder?: string;
  isCentered?: boolean;
  selectedCharacterId?: string | null;
  onCharacterSelect?: (id: string) => void;
  selectType?: "anime" | "fiction" | "xog" | "eternals" | "elites";
};

export function ChatInputDemo({ onSubmit, placeholder, isCentered, selectedCharacterId: propSelectedCharacterId, onCharacterSelect, selectType = "anime" }: ChatInputDemoProps) {
  const [value, setValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (!value.trim()) return;
    setIsLoading(true);
    try {
      await onSubmit(value);
      setValue("");
    } catch {
      toast("Failed to send message");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={`w-full px-2 sm:px-4 md:px-6 ${
        isCentered
          ? "flex flex-1 items-center justify-center" // center input
          : "fixed bottom-0 left-0 right-0 pb-4 bg-transparent" // bottom input
      }`}
    >
      <div className="mx-auto w-full md:w-[600px]">
        <ChatInput
          variant="default"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onSubmit={handleSubmit}
          loading={isLoading}
          onStop={() => setIsLoading(false)}
          selectedCharacterId={propSelectedCharacterId}
          onCharacterSelect={onCharacterSelect}
          selectType={selectType}
        >
          <ChatInputTextArea
            placeholder={placeholder ?? "Type a message..."}
            className="flex-1 bg-transparent px-2 py-2 text-sm text-white placeholder:text-gray-400 border-none focus-visible:ring-0 focus-visible:outline-none"
          />
          <ChatInputSubmit />
	    
        </ChatInput>
      </div>
    </div>
  );
}

