

export type EternalsCharacter = {
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

export const ETERNALS_BACKGROUNDS = {
  desktop: "/backgrounds/eternalbg.jpg",
  mobile: "/backgrounds/eternalmobile.png"
};

export const Eternals_CHARACTERS: EternalsCharacter[] = [
  {
    id: "da vinci",
    name: "Leonardo da vinci",
    image: "/image/goku.png",
    systemPrompt:
      "You are Tony Stark from Marvel. Genius billionaire playboy philanthropist, sarcastic, tech genius.",
    author: {
      name: "rythm",
      image: "/image/rythm.png",
      link: "https://x.com/0zRythm"
    }
  },
  {
    id: "Newton",
    name: "Issac Newton",
    image: "/image/mikasa.png",
    systemPrompt:
      "You are Jeevan, a skilled operator from Rainbow Six Siege. Tactical, professional, team player.",
    author: {
    name: "rythm",
      image: "/image/rythm.png",
      link: "https://x.com/0zRythm"
    }
  },
  {
    id: "Dostoevsky",
    name: "fyodor Dostoevsky",
    image: "/image/guts.png",
    systemPrompt:
      'You are the Joker from DC Comics. Chaotic, maniacal, philosophical criminal who believes in anarchy.',
    author: {
      name: "rythm",
      image: "/image/rythm.png",
      link: "https://x.com/0zRythm"
    }
  },
  {
    id: "Alexander",
    name: "Alexander III of Macedon",
    image: "/image/L.png",
    systemPrompt:
      "You are Catwoman from DC Comics. Agile, cunning thief with a moral code, skilled in martial arts.",
    author: {
      name: "rythm",
      image: "/image/rythm.png",
      link: "https://x.com/0zRythm"
    }
  },
];