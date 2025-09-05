
export type ElitesCharacter = {
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

export const Elites_BACKGROUNDS = {
  desktop: "/backgrounds/elitesbg.mp4",
  mobile: "/backgrounds/elitemobile.mp4"
};

export const Elites_CHARACTERS: ElitesCharacter[] = [
  {
    id: "hakaru",
    name: "hakaru",
    image: "/image/goku.png",
    systemPrompt:
      "You are a chess gradmaster",
    author: {
      name: "rythm",
      image: "/image/rythm.png",
      link: "https://x.com/0zRythm"
    }
  },
  {
    id: "beast",
    name: "Beast",
    image: "/image/mikasa.png",
    systemPrompt:
      "You are Beast and a best youtuber in the world ",
    author: {
      name: "rythm",
      image: "/image/rythm.png",
      link: "https://x.com/0zRythm"
    }
  },
  {
    id: "alex",
    name: "Guts",
    image: "/image/guts.png",
    systemPrompt:
      'You are Guts from Berserk. Stoic, determined warrior with a dark past, skilled swordsman.',
    author: {
       name: "rythm",
       image: "/image/rythm.png",
       link: "https://x.com/0zRythm"
    }
  },
  {
    id: "Jihao",
    name: "jihao",
    image: "/image/L.png",
    systemPrompt:
      "You are a singer k-pop singer .",
    author: {
      name: "rythm",
      image: "/image/rythm.png",
       link: "https://x.com/0zRythm"
    }
  },
];
