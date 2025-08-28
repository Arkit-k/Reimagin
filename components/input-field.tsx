"use client";

import {
	ChatInput,
	ChatInputSubmit,
	ChatInputTextArea,
} from "@/components/ui/chat-input";
import { ChatMessageArea } from "@/components/ui/chat-message-area"
import { useState } from "react";
import { toast } from "sonner";

type ChatInputDemoProps = {
  onSubmit: (prompt: string) => void | Promise<void>;
  placeholder?: string;
};


export function ChatInputDemo({ onSubmit, placeholder }: ChatInputDemoProps) {
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
				<div className="fixed bottom-0 left-0 right-0 w-full px-2 sm:px-4 md:px-6 bg-transparent pb-4">
  <div className="mx-auto w-full md:w-[600px]">
    <ChatInput
      variant="default"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onSubmit={handleSubmit}
      loading={isLoading}
      onStop={() => setIsLoading(false)}
    >
      <ChatInputTextArea
        placeholder="Type a message..."
        className="flex-1 bg-transparent px-2 py-2 text-sm text-white placeholder:text-gray-400"
      />
      <ChatInputSubmit />
    </ChatInput>
  </div>
</div>

	);
}
