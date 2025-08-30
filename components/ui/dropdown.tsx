"use client";

import * as React from "react";
import Image from "next/image";
import { ANIME_CHARACTERS } from "@/system-prompts/anime-prompts";
import { Fiction_CHARACTERS as FICTION_CHARACTERS } from "@/system-prompts/fiction-prompts";
import { Tweet_CHARACTERS as XOG_CHARACTERS } from "@/system-prompts/x-prompts";

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
      <SelectTrigger className="w-[180px] flex items-center gap-2">
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
      <SelectTrigger className="w-[180px] flex items-center gap-2">
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
          <SelectValue placeholder="Select a fiction character" />
        )}
      </SelectTrigger>

      <SelectContent>
        <SelectGroup>
          <SelectLabel>Fiction Characters</SelectLabel>
          {FICTION_CHARACTERS.map((char) => (
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
      <SelectTrigger className="w-[180px] flex items-center gap-2">
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
          <SelectValue placeholder="Select an X'og character" />
        )}
      </SelectTrigger>

      <SelectContent>
        <SelectGroup>
          <SelectLabel>X og Characters</SelectLabel>
          {XOG_CHARACTERS.map((char) => (
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
