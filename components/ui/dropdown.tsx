"use client";

import * as React from "react";
import Image from "next/image";
import { ANIME_CHARACTERS } from "@/system-prompts/anime-prompts";

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
};

export function AnimeSelect({ onSelect }: Props) {
  const [selectedCharacter, setSelectedCharacter] = React.useState<string | null>(null);

  const handleChange = (value: string) => {
    setSelectedCharacter(value);
    onSelect(value);
  };

  const selectedChar = ANIME_CHARACTERS.find(c => c.id === selectedCharacter);

  return (
    <Select onValueChange={handleChange} value={selectedCharacter ?? undefined}>
      <SelectTrigger className="w-[280px] flex items-center gap-2">
        {selectedChar ? (
          <>
            <Image
              src={selectedChar.image}
              alt={selectedChar.name}
              width={32}
              height={32}
              className="rounded-full"
            />
            <span>{selectedChar.name}</span>
          </>
        ) : (
          <SelectValue placeholder="Select an anime character" />
        )}
      </SelectTrigger>

      <SelectContent>
        <SelectGroup>
          <SelectLabel>Anime Characters</SelectLabel>
          {ANIME_CHARACTERS.map((char) => (
            <SelectItem key={char.id} value={char.id} className="flex items-center gap-2">
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
