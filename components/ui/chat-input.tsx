"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ANIME_CHARACTERS } from "@/system-prompts/anime-prompts";
import { Fiction_CHARACTERS as FICTION_CHARACTERS } from "@/system-prompts/fiction-prompts";
import { Tweet_CHARACTERS as XOG_CHARACTERS } from "@/system-prompts/x-prompts";
import { Eternals_CHARACTERS } from "@/system-prompts/eternals-prompts";
import { Elites_CHARACTERS } from "@/system-prompts/elites-prompts";
import { cn } from "@/lib/utils";
import { useTextareaResize } from "@/hooks/use-textarea-resize";
import { ArrowUpIcon } from "lucide-react";
import type React from "react";
import { createContext, useContext, useState, useRef } from "react";
import { AnimeSelect, FictionSelect, XogSelect, EthSelect, ElitesSelect, NavSelect } from "./dropdown";
import { usePathname } from 'next/navigation';

interface ChatInputContextValue {
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
  onSubmit?: (prompt: string) => void;
  loading?: boolean;
  onStop?: () => void;
  variant?: "default" | "unstyled";
  rows?: number;
  selectedCharacterId?: string | null;
  onCharacterSelect?: (id: string) => void;
  selectType?: "anime" | "fiction" | "xog" | "eternals" | "elites";
}

const ChatInputContext = createContext<ChatInputContextValue>({});

interface ChatInputProps extends Omit<ChatInputContextValue, "variant"> {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "unstyled";
  rows?: number;
  selectType?: "anime" | "fiction" | "xog" | "eternals" | "elites";
}

function ChatInput({
  children,
  className,
  variant = "default",
  value,
  onChange,
  onSubmit,
  loading,
  onStop,
  rows = 1,
  selectedCharacterId,
  onCharacterSelect,
  selectType = "anime",
}: ChatInputProps) {
  const contextValue: ChatInputContextValue = {
    value,
    onChange,
    onSubmit,
    loading,
    onStop,
    variant,
    rows,
    selectedCharacterId,
    onCharacterSelect,
    selectType,
  };

  return (
    <ChatInputContext.Provider value={contextValue}>
      <div
        className={cn(
          variant === "default" &&
            "flex flex-col items-end w-full p-2 rounded-2xl bg-transparent backdrop-blur-md border border-white/10 shadow-lg focus-within:ring-1 focus-within:ring-ring focus-within:outline-none",
          variant === "unstyled" && "flex items-start gap-2 w-full",
          className
        )}
      >

        {children}
      </div>
    </ChatInputContext.Provider>
  );
}

ChatInput.displayName = "ChatInput";

interface ChatInputTextAreaProps extends React.ComponentProps<typeof Textarea> {
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
  onSubmit?: () => void;
  variant?: "default" | "unstyled";
}

function ChatInputTextArea({
  onSubmit: onSubmitProp,
  value: valueProp,
  onChange: onChangeProp,
  className,
  variant: variantProp,
  ...props
}: ChatInputTextAreaProps) {
  const context = useContext(ChatInputContext);
  const value = valueProp ?? context.value ?? "";
  const onChange = onChangeProp ?? context.onChange;
  const onSubmit = onSubmitProp ?? context.onSubmit;
  const rows = context.rows ?? 1;

  const variant =
    variantProp ?? (context.variant === "default" ? "unstyled" : "default");

  const textareaRef = useTextareaResize(value, rows);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (!onSubmit) return;
    if (e.key === "Enter" && !e.shiftKey) {
      if (!value || value.trim().length === 0) return;
      e.preventDefault();
      onSubmit?.(value);
    }
  };

  return (
    
    <Textarea
      ref={textareaRef}
      {...props}
      value={value}
      onChange={onChange}
      onKeyDown={handleKeyDown}
      className={cn(
        "max-h-[400px] min-h-0 bg-stone-500/60 backdrop-blur-sm resize-none overflow-x-hidden",
        variant === "unstyled" &&
          "border-none focus-visible:ring-0 focus-visible:ring-offset-0 shadow-none",
        className
      )}
      rows={rows}
    />
  );
}

ChatInputTextArea.displayName = "ChatInputTextArea";

interface ChatInputSubmitProps extends React.ComponentProps<typeof Button> {
  onSubmit?: () => void;
  loading?: boolean;
  onStop?: () => void;
}

function ChatInputSubmit({
  onSubmit: onSubmitProp,
  loading: loadingProp,
  onStop: onStopProp,
  className,
  ...props
}: ChatInputSubmitProps) {
  const context = useContext(ChatInputContext);
  const loading = loadingProp ?? context.loading;
  const onStop = onStopProp ?? context.onStop;
  const onSubmit = onSubmitProp ?? context.onSubmit;
  const selectedCharacterId = context.selectedCharacterId;
  const onCharacterSelect = context.onCharacterSelect;
  const selectType = context.selectType ?? "anime";

  const getCharacters = () => {
    switch (selectType) {
      case "fiction":
        return FICTION_CHARACTERS;
      case "xog":
        return XOG_CHARACTERS;
      case "eternals":
        return Eternals_CHARACTERS;
      case "elites":
        return Elites_CHARACTERS;
      default:
        return ANIME_CHARACTERS;
    }
  };

  const characters = getCharacters();
  const selectedCharacter = characters.find(
    (c) => c.id === selectedCharacterId
  );
  const pathname = usePathname();

  if (loading && onStop) {
    return (
      <Button
        onClick={onStop}
        className={cn(
          "shrink-0 rounded-full p-1 md:p-1.5 h-fit border dark:border-zinc-600",
          className
        )}
        {...props}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="currentColor"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-label="Stop"
        >
          <title>Stop</title>
          <rect x="6" y="6" width="12" height="12" />
        </svg>
      </Button>
    );
  }

  const isDisabled = !selectedCharacter || !context.value || context.value.trim().length === 0;

  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (!isDisabled && selectedCharacter) {
      const finalPrompt = `${selectedCharacter.systemPrompt}\n${context.value}`;
      onSubmit?.(finalPrompt);
    }
  };

  return (
    <div className="flex items-center justify-between gap-1 md:gap-2 w-full">
      <div className="flex items-center gap-1 md:gap-2">
        {/* Nav dropdown for mobile */}
        <div className="md:hidden">
          <NavSelect onSelect={(path) => window.location.href = path} currentPath={pathname} />
        </div>

        {/* Character dropdown */}
        {selectType === "fiction" ? (
          <FictionSelect value={selectedCharacterId} onSelect={(id) => onCharacterSelect?.(id)} />
        ) : selectType === "xog" ? (
          <XogSelect value={selectedCharacterId} onSelect={(id) => onCharacterSelect?.(id)} />
        ) : selectType === "eternals" ? (
          <EthSelect value={selectedCharacterId} onSelect={(id) => onCharacterSelect?.(id)} />
        ) : selectType === "elites" ? (
          <ElitesSelect value={selectedCharacterId} onSelect={(id) => onCharacterSelect?.(id)} />
        ) : (
          <AnimeSelect value={selectedCharacterId} onSelect={(id) => onCharacterSelect?.(id)} />
        )}

      </div>

      {/* Submit / Arrow Button */}
      <Button
        className={cn(
          "shrink-0 rounded-full p-1 md:p-1.5 h-fit border dark:border-zinc-600",
          className
        )}
        disabled={isDisabled}
        onClick={handleSubmit}
        {...props}
      >
        <ArrowUpIcon className="h-3 w-3 md:h-4 md:w-4" />
      </Button>
    </div>
  );
}

ChatInputSubmit.displayName = "ChatInputSubmit";

export { ChatInput, ChatInputTextArea, ChatInputSubmit };
