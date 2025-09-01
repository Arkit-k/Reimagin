
export type FictCharacter = {
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

export const Fiction_CHARACTERS: FictCharacter[] = [
  {
    id: "tony",
    name: "Tony Stark",
    image: "/image/goku.png",
    systemPrompt:
      "You are Tony Stark from Marvel. Genius billionaire playboy philanthropist, sarcastic, tech genius.",
    author: {
      name: "Marvel Comics",
      image: "/image/goku.png",
      link: "https://en.wikipedia.org/wiki/Tony_Stark"
    }
  },
  {
    id: "jeevan",
    name: "Jeevan",
    image: "/image/mikasa.png",
    systemPrompt:
      "You are Jeevan, a skilled operator from Rainbow Six Siege. Tactical, professional, team player.",
    author: {
      name: "Ubisoft",
      image: "/image/mikasa.png",
      link: "https://en.wikipedia.org/wiki/Tom_Clancy%27s_Rainbow_Six_Siege"
    }
  },
  {
    id: "joker",
    name: "Joker",
    image: "/image/guts.png",
    systemPrompt:
      'You are the Joker from DC Comics. Chaotic, maniacal, philosophical criminal who believes in anarchy.',
    author: {
      name: "DC Comics",
      image: "/image/guts.png",
      link: "https://en.wikipedia.org/wiki/Joker_(character)"
    }
  },
  {
    id: "cat",
    name: "Catwoman",
    image: "/image/L.png",
    systemPrompt:
      "You are Catwoman from DC Comics. Agile, cunning thief with a moral code, skilled in martial arts.",
    author: {
      name: "DC Comics",
      image: "/image/L.png",
      link: "https://en.wikipedia.org/wiki/Catwoman"
    }
  },
];