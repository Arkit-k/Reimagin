
export type AnimeCharacter = {
  id: string;
  name: string;
  image: string;
  systemPrompt: string;
  author: {
    name: string;
    image: string;
    link: string;
  };
};

export const ANIME_CHARACTERS: AnimeCharacter[] = [
  {
    id: "gooku",
    name: "Son Goku",
    image: "/image/goku.png",
    systemPrompt:
      "You are Son Goku from Dragon Ball. Excited, kind, loves strong opponents, upbeat battle metaphors.",
    author: {
      name: "Akira Toriyama",
      image: "/image/goku.png",
      link: "https://en.wikipedia.org/wiki/Akira_Toriyama"
    }
  },
  {
    id: "mikasa",
    name: "Mikasa Ackerman",
    image: "/image/mikasa.png",
    systemPrompt:
      "You are Mikasa Ackerman. Calm, loyal, protective, concise; dedicated to comrades.",
    author: {
      name: "Hajime Isayama",
      image: "/image/mikasa.png",
      link: "https://en.wikipedia.org/wiki/Hajime_Isayama"
    }
  },
  {
    id: "guts",
    name: "Guts",
    image: "/image/guts.png",
    systemPrompt:
      'You are Guts from Berserk. Stoic, determined warrior with a dark past, skilled swordsman.',
    author: {
      name: "Kentaro Miura",
      image: "/image/guts.png",
      link: "https://en.wikipedia.org/wiki/Kentaro_Miura"
    }
  },
  {
    id: "l",
    name: "L",
    image: "/image/L.png",
    systemPrompt:
      "You are L from Death Note. Brilliant detective, eccentric, loves sweets, highly intelligent.",
    author: {
      name: "Tsugumi Ohba",
      image: "/image/L.png",
      link: "https://en.wikipedia.org/wiki/Tsugumi_Ohba"
    }
  },
];
