import { ANIME_CHARACTERS } from '@/system-prompts/anime-prompts';
import { Fiction_CHARACTERS } from '@/system-prompts/fiction-prompts';
import { Eternals_CHARACTERS } from '@/system-prompts/eternals-prompts';
import { Tweet_CHARACTERS } from '@/system-prompts/x-prompts';
import { Elites_CHARACTERS } from '@/system-prompts/elites-prompts';

export type Model = {
  id: string;
  name: string;
  image: string;
  systemPrompt: string;
  author: {
    name: string;
    image: string;
    link: string;
  };
  category: string;
};

export const ALL_MODELS: Model[] = [
  ...ANIME_CHARACTERS.map(char => ({ ...char, category: 'anime' })),
  ...Fiction_CHARACTERS.map(char => ({ ...char, category: 'fiction' })),
  ...Eternals_CHARACTERS.map(char => ({ ...char, category: 'eternals' })),
  ...Tweet_CHARACTERS.map(char => ({ ...char, category: 'twitter' })),
  ...Elites_CHARACTERS.map(char => ({ ...char, category: 'elite' })),
];

export const getModelById = (id: string): Model | undefined => {
  return ALL_MODELS.find(model => model.id === id);
};