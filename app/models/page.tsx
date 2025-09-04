'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowRight, Users, Sword, BookOpen, Twitter, Star } from 'lucide-react'
import { ANIME_CHARACTERS } from '@/system-prompts/anime-prompts'
import { Fiction_CHARACTERS } from '@/system-prompts/fiction-prompts'
import { Eternals_CHARACTERS } from '@/system-prompts/eternals-prompts'
import { Tweet_CHARACTERS } from '@/system-prompts/x-prompts'

const categories = [
  {
    id: 'anime',
    title: 'Anime Characters',
    description: 'Experience conversations with iconic anime characters brought to life through AI',
    icon: Sword,
    characters: ANIME_CHARACTERS,
    color: 'from-red-500 to-pink-500',
    bgColor: 'bg-stone-900'
  },
  {
    id: 'fiction',
    title: 'Fiction Heroes',
    description: 'Chat with legendary fictional characters from comics, games, and literature',
    icon: BookOpen,
    characters: Fiction_CHARACTERS,
    color: 'from-blue-500 to-purple-500',
    bgColor: 'bg-stone-900'
  },
  {
    id: 'eternals',
    title: 'Historical Figures',
    description: 'Engage with historical geniuses and legendary figures from throughout time',
    icon: Users,
    characters: Eternals_CHARACTERS,
    color: 'from-green-500 to-teal-500',
    bgColor: 'bg-stone-900'
  },
  {
    id: 'twitter',
    title: 'Social Personalities',
    description: 'Connect with unique personalities inspired by social media culture',
    icon: Twitter,
    characters: Tweet_CHARACTERS,
    color: 'from-cyan-500 to-blue-500',
    bgColor: 'bg-stone-900'
  }
]

const truncateText = (text: string, wordLimit: number = 6): string => {
  const words = text.split(' ');
  if (words.length <= wordLimit) return text;
  return words.slice(0, wordLimit).join(' ') + '...';
};

export default function ModelsPage() {
  return (
    <div className="min-h-screen bg-stone-900">
      {/* Categories Section */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <div className="space-y-20">
            {categories.map((category, categoryIndex) => (
              <div key={category.id} className={category.bgColor + " rounded-3xl p-8 md:p-12"}>
                <div className="text-center mb-12">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r ${category.color} text-white mb-6`}>
                    <category.icon className="w-8 h-8" />
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">{category.title}</h2>
                  <p className="text-lg text-white max-w-2xl mx-auto">
                    {category.description}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {category.characters.map((character, index) => (
                    <Card key={character.id} className="group hover:shadow-lg transition-all duration-300 border-0 shadow-md">
                      <CardHeader className="text-center pb-4">
                        <div className="relative w-24 h-24 mx-auto mb-4">
                          <Image
                            src={character.image}
                            alt={character.name}
                            fill
                            className="object-cover rounded-full border-4 border-background shadow-lg"
                          />
                        </div>
                        <CardTitle className="text-xl text-white">{character.name}</CardTitle>
                        <CardDescription className="text-sm text-white">
                          Created by{' '}
                          <Link
                            href={character.author.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white hover:underline"
                          >
                            {character.author.name}
                          </Link>
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-white text-center mb-4">
                          {truncateText(character.systemPrompt, 6)}
                        </p>
                        <Button
                          size="sm"
                          className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                          asChild
                        >
                          <Link href={`/chat/${category.id === 'twitter' ? 'twitter' : category.id}`}>
                            Chat with {character.name}
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </Link>
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="text-center mt-8">
                  <Button variant="outline" size="lg" asChild>
                    <Link href={`/chat/${category.id === 'twitter' ? 'twitter' : category.id}`}>
                      Explore {category.title}
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  )
}