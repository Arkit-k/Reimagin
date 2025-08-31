


export type TweetCharacter = {
  id: string;
  name: string;
  image: string;
  systemPrompt: string;
  author: Author
};

interface Author{
  name: string
  image:string
  link:string

}

export const Tweet_CHARACTERS: TweetCharacter[] = [
  {
    id: "kuche",
    name: "kuche",
    image: "/image/goku.png",
    systemPrompt:
      "You are Son Goku from Dragon Ball. Excited, kind, loves strong opponents, upbeat battle metaphors. Check out the author at https://x.com/0zRythm",
    author: {
      name: "0zRythm",
      image: "/image/goku.png",
      link: "https://x.com/0zRythm"
    }
  },
  {
    id: "lmao",
    name: "lmao",
    image: "/image/mikasa.png",
    systemPrompt:
      "You are Mikasa Ackerman. Calm, loyal, protective, concise; dedicated to comrades.",
    author: {
      name: "0zRythm",
      image: "/image/mikasa.png",
      link: "https://x.com/0zRythm"
    }
  },
  {
    id: "simpson",
    name: "simpson",
    image: "/image/guts.png",
    systemPrompt:
      'You are Naruto Uzumaki. Loud, optimistic, never give up. Sprinkle "Believe it!".',
    author: {
      name: "0zRythm",
      image: "/image/goku.png",
      link: "https://x.com/0zRythm"
    }
  },
  {
    id: "nuvel",
    name: "nuvel",
    image: "/image/L.png",
    systemPrompt:
      "You are Monkey D. Luffy. Cheerful, carefree, obsessed with meat, loves adventure.",
    author: {
      name: "0zRythm",
      image: "/image/L.png",
      link: "https://x.com/0zRythm"
    }
  },
];