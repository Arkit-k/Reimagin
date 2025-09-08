"use client";

import * as React from "react";
import Image from "next/image";
import { Eternals_CHARACTERS } from "@/system-prompts/eternals-prompts";
import { ANIME_CHARACTERS } from "@/system-prompts/anime-prompts";
import { Fiction_CHARACTERS as FICTION_CHARACTERS } from "@/system-prompts/fiction-prompts";
import { Tweet_CHARACTERS as XOG_CHARACTERS } from "@/system-prompts/x-prompts";
import { Elites_CHARACTERS } from "@/system-prompts/elites-prompts";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Props = {
  onSelect: (characterId: string) => void;
  value?: string | null;
};

export function AnimeSelect({ onSelect, value }: Props) {
  const [selectedCharacter, setSelectedCharacter] = React.useState<string | null>(value || null);

  React.useEffect(() => {
    setSelectedCharacter(value || null);
  }, [value]);

  const handleChange = (value: string) => {
    setSelectedCharacter(value);
    onSelect(value);
  };

  const selectedChar = ANIME_CHARACTERS.find(c => c.id === selectedCharacter);

  return (
    <Select onValueChange={handleChange} value={selectedCharacter ?? undefined}>
      <SelectTrigger className="w-full max-w-[120px] md:max-w-[180px] md:w-[180px] flex items-center gap-1 md:gap-2">
        {selectedChar ? (
          <>
            <Image
              src={selectedChar.image}
              alt={selectedChar.name}
              width={32}
              height={32}
              className="rounded-full"
            />
            <span>{selectedChar.name.length > 7 ? selectedChar.name.substring(0, 7) + '...' : selectedChar.name}</span>
          </>
        ) : (
          <SelectValue placeholder="Select an anime character" />
        )}
      </SelectTrigger>

      <SelectContent side="top" className="bg-black/80 backdrop-blur-sm text-white border border-white/20">
        <SelectGroup>
          <SelectLabel className="text-white">Anime Characters</SelectLabel>
          {ANIME_CHARACTERS.map((char) => (
            <SelectItem key={char.id} value={char.id} className="flex items-center gap-2 bg-black/60 hover:bg-black/80">
              <Image
                src={char.image}
                alt={char.name}
                width={32}
                height={32}
                className="rounded-full"
              />
              {char.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export function FictionSelect({ onSelect, value }: Props) {
  const [selectedCharacter, setSelectedCharacter] = React.useState<string | null>(value || null);

  React.useEffect(() => {
    setSelectedCharacter(value || null);
  }, [value]);

  const handleChange = (value: string) => {
    setSelectedCharacter(value);
    onSelect(value);
  };

  const selectedChar = FICTION_CHARACTERS.find(c => c.id === selectedCharacter);

  return (
    <Select onValueChange={handleChange} value={selectedCharacter ?? undefined}>
      <SelectTrigger className="w-full max-w-[120px] md:max-w-[180px] md:w-[180px] flex items-center gap-1 md:gap-2">
        {selectedChar ? (
          <>
            <Image
              src={selectedChar.image}
              alt={selectedChar.name}
              width={24}
              height={24}
              className="rounded-full md:w-8 md:h-8"
            />
            <span>{selectedChar.name.length > 7 ? selectedChar.name.substring(0, 7) + '...' : selectedChar.name}</span>
          </>
        ) : (
          <SelectValue placeholder="Select a fiction character" />
        )}
      </SelectTrigger>

      <SelectContent side="top" className="bg-black/80 backdrop-blur-sm text-white border border-white/20">
        <SelectGroup>
          <SelectLabel className="text-white">Fiction Characters</SelectLabel>
          {FICTION_CHARACTERS.map((char) => (
            <SelectItem key={char.id} value={char.id} className="flex items-center gap-2 bg-black/60 hover:bg-black/80">
              <Image
                src={char.image}
                alt={char.name}
                width={32}
                height={32}
                className="rounded-full"
              />
              {char.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export function XogSelect({ onSelect, value }: Props) {
  const [selectedCharacter, setSelectedCharacter] = React.useState<string | null>(value || null);

  React.useEffect(() => {
    setSelectedCharacter(value || null);
  }, [value]);

  const handleChange = (value: string) => {
    setSelectedCharacter(value);
    onSelect(value);
  };

  const selectedChar = XOG_CHARACTERS.find(c => c.id === selectedCharacter);

  return (
    <Select onValueChange={handleChange} value={selectedCharacter ?? undefined}>
      <SelectTrigger className="w-full max-w-[120px] md:max-w-[180px] md:w-[180px] flex items-center gap-1 md:gap-2">
        {selectedChar ? (
          <>
            <Image
              src={selectedChar.image}
              alt={selectedChar.name}
              width={24}
              height={24}
              className="rounded-full md:w-8 md:h-8"
            />
            <span>{selectedChar.name.length > 7 ? selectedChar.name.substring(0, 7) + '...' : selectedChar.name}</span>
          </>
        ) : (
          <SelectValue placeholder="Select an X'og character" />
        )}
      </SelectTrigger>

      <SelectContent side="top" className="bg-black/80 backdrop-blur-sm text-white border border-white/20">
        <SelectGroup>
          <SelectLabel className="text-white">X og Characters</SelectLabel>
          {XOG_CHARACTERS.map((char) => (
            <SelectItem key={char.id} value={char.id} className="flex items-center gap-2 bg-black/60 hover:bg-black/80">
              <Image
                src={char.image}
                alt={char.name}
                width={32}
                height={32}
                className="rounded-full"
              />
              {char.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export function EthSelect({ onSelect, value }: Props) {
  const [selectedCharacter, setSelectedCharacter] = React.useState<string | null>(value || null);

  React.useEffect(() => {
    setSelectedCharacter(value || null);
  }, [value]);

  const handleChange = (value: string) => {
    setSelectedCharacter(value);
    onSelect(value);
  };

  const selectedChar = Eternals_CHARACTERS.find(c => c.id === selectedCharacter);

  return (
    <Select onValueChange={handleChange} value={selectedCharacter ?? undefined}>
      <SelectTrigger className="w-full max-w-[120px] md:max-w-[220px] md:w-[220px] flex items-center gap-1 md:gap-2">
        {selectedChar ? (
          <>
            <Image
              src={selectedChar.image}
              alt={selectedChar.name}
              width={24}
              height={24}
              className="rounded-full md:w-8 md:h-8"
            />
            <span>{selectedChar.name.length > 7 ? selectedChar.name.substring(0, 7) + '...' : selectedChar.name}</span>
          </>
        ) : (
          <SelectValue placeholder="Select an Eternal's character" />
        )}
      </SelectTrigger>

      <SelectContent side="top" className="w-[240px] bg-black/80 backdrop-blur-sm text-white border border-white/20">
        <SelectGroup>
          <SelectLabel className="text-white">Eternal Characters</SelectLabel>
          {Eternals_CHARACTERS.map((char) => (
            <SelectItem key={char.id} value={char.id} className="flex items-center gap-2 bg-black/60 hover:bg-black/80">
              <Image
                src={char.image}
                alt={char.name}
                width={32}
                height={32}
                className="rounded-full"
              />
              {char.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export function ElitesSelect({ onSelect, value }: Props) {
  const [selectedCharacter, setSelectedCharacter] = React.useState<string | null>(value || null);

  React.useEffect(() => {
    setSelectedCharacter(value || null);
  }, [value]);

  const handleChange = (value: string) => {
    setSelectedCharacter(value);
    onSelect(value);
  };

  const selectedChar = Elites_CHARACTERS.find(c => c.id === selectedCharacter);

  return (
    <Select onValueChange={handleChange} value={selectedCharacter ?? undefined}>
      <SelectTrigger className="w-full max-w-[120px] md:max-w-[180px] md:w-[180px] flex items-center gap-1 md:gap-2">
        {selectedChar ? (
          <>
            <Image
              src={selectedChar.image}
              alt={selectedChar.name}
              width={32}
              height={32}
              className="rounded-full"
            />
            <span>{selectedChar.name.length > 7 ? selectedChar.name.substring(0, 7) + '...' : selectedChar.name}</span>
          </>
        ) : (
          <SelectValue placeholder="Select an elite character" />
        )}
      </SelectTrigger>

      <SelectContent side="top" className="bg-black/80 backdrop-blur-sm text-white border border-white/20">
        <SelectGroup>
          <SelectLabel className="text-white">Elite Characters</SelectLabel>
          {Elites_CHARACTERS.map((char) => (
            <SelectItem key={char.id} value={char.id} className="flex items-center gap-2 bg-black/60 hover:bg-black/80">
              <Image
                src={char.image}
                alt={char.name}
                width={32}
                height={32}
                className="rounded-full"
              />
              {char.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

type NavProps = {
  onSelect: (path: string) => void;
  currentPath?: string;
};

export function NavSelect({ onSelect, currentPath }: NavProps) {
  const navOptions = [
    { label: "Anime", path: "/chat/anime" },
    { label: "Fiction", path: "/chat/fiction" },
    { label: "Twitter", path: "/chat/twitter" },
    { label: "Eternal", path: "/chat/eternals" },
    { label: "Elite", path: "/chat/elite" },
  ];

  const currentLabel = navOptions.find(opt => opt.path === currentPath)?.label || "Navigate";

  return (
    <Select onValueChange={onSelect}>
      <SelectTrigger className="w-full max-w-[100px] md:max-w-[120px] md:w-[120px] flex items-center gap-1 md:gap-2 bg-transparent md:bg-stone-800">
        <span className="text-sm text-white">{currentLabel}</span>
      </SelectTrigger>

      <SelectContent side="top" className="bg-black/80 backdrop-blur-sm text-white border border-white/20">
        <SelectGroup>
          <SelectLabel className="text-white">Navigate to</SelectLabel>
          {navOptions.map((opt) => (
            <SelectItem key={opt.path} value={opt.path} className="flex items-center gap-2 bg-black/60 hover:bg-black/80">
              {opt.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
