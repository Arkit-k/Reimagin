'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowRight, ArrowLeft, Users, Sword, BookOpen, Twitter, Star } from 'lucide-react'
import { ANIME_CHARACTERS } from '@/system-prompts/anime-prompts'
import { Fiction_CHARACTERS } from '@/system-prompts/fiction-prompts'
import { Eternals_CHARACTERS } from '@/system-prompts/eternals-prompts'
import { Tweet_CHARACTERS } from '@/system-prompts/x-prompts'
import { Elites_CHARACTERS } from '@/system-prompts/elites-prompts'

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
  },
  {
    id: 'elite',
    title: 'Elite Characters',
    description: 'Engage with elite personalities from gaming, streaming, and tech worlds',
    icon: Star,
    characters: Elites_CHARACTERS,
    color: 'from-yellow-500 to-orange-500',
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
      {/* Home Button */}
      <div className="mx-auto max-w-7xl px-6 md:px-12 py-4">
        <Button variant="outline" className="text-black" asChild>
          <Link href="/">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Home
          </Link>
        </Button>
      </div>
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
                    <Card key={character.id} className="group relative overflow-hidden bg-gradient-to-br from-stone-800/80 to-stone-900/80 backdrop-blur-xl border border-stone-700/50 hover:border-stone-600/70 transition-all duration-500 hover:shadow-2xl hover:shadow-cyan-500/10 hover:-translate-y-1">
                      {/* Animated background gradient */}
                      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                      {/* Glow effect */}
                      <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-cyan-500/20 via-transparent to-purple-500/20 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500"></div>

                      <CardHeader className="text-center pb-4 relative z-10">
                        <div className="relative w-24 h-24 mx-auto mb-4 group-hover:scale-110 transition-transform duration-500">
                          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400 to-purple-400 opacity-0 group-hover:opacity-20 blur-md scale-110"></div>
                          <Image
                            src={character.image}
                            alt={character.name}
                            fill
                            className="object-cover rounded-full border-2 border-stone-600 group-hover:border-cyan-400/50 shadow-xl transition-all duration-500"
                          />
                        </div>
                        <CardTitle className="text-xl text-white font-semibold group-hover:text-cyan-100 transition-colors duration-300">{character.name}</CardTitle>
                        <CardDescription className="text-sm text-stone-300 group-hover:text-stone-200 transition-colors duration-300">
                          Created by{' '}
                          <Link
                            href={character.author.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-cyan-400 hover:text-cyan-300 transition-colors duration-300 hover:underline"
                          >
                            {character.author.name}
                          </Link>
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="relative z-10">
                        <p className="text-sm text-stone-300 text-center mb-6 leading-relaxed group-hover:text-stone-200 transition-colors duration-300">
                          {truncateText(character.systemPrompt, 6)}
                        </p>
                        <div className="space-y-3">
                          <Button
                            size="sm"
                            variant="outline"
                            className="w-full border-stone-600 text-black hover:border-cyan-400 hover:text-cyan-300 hover:bg-cyan-400/10 transition-all duration-300 backdrop-blur-sm"
                            asChild
                          >
                            <Link href={`/models/${character.id}`}>
                              Read More
                              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                            </Link>
                          </Button>
                          <Button
                            size="sm"
                            className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-white font-medium shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 group-hover:scale-105"
                            asChild
                          >
                            <Link href={`/chat/${category.id === 'twitter' ? 'twitter' : category.id === 'elite' ? 'elite' : category.id}`}>
                              Chat Now
                              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                            </Link>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="text-center mt-8">
                  <Button variant="outline" size="lg" asChild>
                    <Link href={`/chat/${category.id === 'twitter' ? 'twitter' : category.id === 'elite' ? 'elite' : category.id}`}>
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